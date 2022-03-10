import { Express, Router, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { Logger } from 'winston'
import routes from './routes'
import Container from './configs/ioc'
import AuthenticationMiddleware from './middlewares/authentication'
import cors from 'cors'

import { UsersController } from './controllers/users'
import { GroupController } from './controllers/group'
import { DistrictController } from './controllers/district'
import { ReportController } from './controllers/report'
import { RequestController } from './controllers/request'

export class Server {
  private app: Express
  private port: number
  private logType: string
  private logger: Logger
  private usersController: UsersController
  private groupController: GroupController
  private districtController: DistrictController
  private reportController: ReportController
  private requestController: RequestController

  constructor({
    app,
    port,
    nodeEnv,
    logger,
    usersController,
    groupController,
    districtController,
    reportController,
    requestController,
  }: Container) {
    this.app = app
    this.port = port
    this.logType =
      nodeEnv === 'dev' ? 'dev' : ':method :url :status :response-time'
    this.logger = logger
    this.usersController = usersController
    this.groupController = groupController
    this.districtController = districtController
    this.reportController = reportController
    this.requestController = requestController
  }

  private async init(): Promise<void> {
    this.setupExpress()
    await this.setupRoutes()
  }

  private setupExpress(): void {
    this.app.use(
      morgan(this.logType, {
        stream: {
          write: (message: any) => {
            this.logger.info(message)
          },
        },
      })
    )
    this.app.use(bodyParser.json({ type: '*/*', limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    // this.app.use(AuthenticationMiddleware(this.logType))
    if (this.logType === 'dev') this.app.use(cors())
  }

  private async setupRoutes(): Promise<void> {
    const router = await routes({
      usersController: this.usersController,
      groupController: this.groupController,
      districtController: this.districtController,
      reportController: this.reportController,
      requestController: this.requestController,
    })

    this.app.use(router)

    this.app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      console.error(err.stack)
      res.status(500).send('Internal server error.')
    })
  }

  public getApp(): Express {
    return this.app
  }

  public start() {
    this.init()
    this.app.listen(this.port, () => {
      this.logger.info({
        message: `Server listening on port ${this.port}.`,
        path: __filename,
      })
    })
  }
}
