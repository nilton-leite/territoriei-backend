import { Request, Response } from 'express'
import status from 'http-status'
import Container from '../configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { ICreate, IUpdate } from '../utils/types/models/request'
import { RequestService, IRequestService } from '../services/request'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class RequestController {
  private logger: Logger
  private requestService: IRequestService

  constructor({ logger, requestService }: Container) {
    this.logger = logger
    this.requestService = requestService
  }

  public async create(req: Request, res: Response) {
    const {
      report_id,
      user_id,
      status,
      reply_date,
      withdrawn_date,
      return_date,
      observation,
    } = req.body

    let parameters: ICreate = {
      report_id,
      user_id,
      status,
      reply_date,
      withdrawn_date,
      return_date,
      observation,
    }

    const retorno = await this.requestService.create({ data: parameters })
    return res.status(status.OK).send({
      _id: retorno._id,
      description: retorno.description,
    })
  }

  public async update(req: Request, res: Response) {
    const {
      report_id,
      user_id,
      status,
      reply_date,
      withdrawn_date,
      return_date,
      observation,
      id,
    } = req.body

    let parameters: IUpdate = {
      report_id,
      user_id,
      status,
      reply_date,
      withdrawn_date,
      return_date,
      observation,
    }

    await this.requestService.updateOne(
      { data: parameters },
      Types.ObjectId(id)
    )
    const retorno = await this.requestService.get(Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }

  async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      if (id) {
        const retorno = await this.requestService.get(Types.ObjectId(id))

        return res.json([retorno])
      }

      return res.json([])
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
