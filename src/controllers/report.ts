import { Request, Response } from 'express'
import status from 'http-status'
import Container from '../configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { ICreate, IUpdate } from '../utils/types/models/report'
import { ReportService, IReportService } from '../services/report'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class ReportController {
  private logger: Logger
  private reportService: IReportService

  constructor({ logger, reportService }: Container) {
    this.logger = logger
    this.reportService = reportService
  }

  public async create(req: Request, res: Response) {
    const { report_id, group_id, district_id, streets, card, qtde_blocks } =
      req.body

    let parameters: ICreate = {
      report_id,
      group_id: Types.ObjectId(group_id),
      district_id: Types.ObjectId(district_id),
      streets,
      card,
      qtde_blocks,
    }

    const retorno = await this.reportService.create({ data: parameters })
    return res.status(status.OK).send({
      _id: retorno._id,
      report_id: retorno.report_id,
      group_id: retorno.group_id,
      district_id: retorno.district_id,
      streets: retorno.streets,
      card: retorno.card,
      qtde_blocks: retorno.qtde_blocks,
    })
  }

  public async update(req: Request, res: Response) {
    const { report_id, group_id, district_id, streets, card, qtde_blocks, id } =
      req.body

    let parameters: IUpdate = {
      report_id,
      group_id: Types.ObjectId(group_id),
      district_id: Types.ObjectId(district_id),
      streets,
      card,
      qtde_blocks,
    }

    await this.reportService.updateOne({ data: parameters }, Types.ObjectId(id))
    const retorno = await this.reportService.getById(Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params

    try {
      if (id) {
        const retorno = await this.reportService.getById(Types.ObjectId(id))

        return res.json(retorno)
      }

      return res.json({})
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }

  async get(req: Request, res: Response) {
    try {
      const retorno = await this.reportService.get()
      return res.json(retorno)
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }

  async getByGroup(req: Request, res: Response) {
    const { id } = req.params

    try {
      if (id) {
        const retorno = await this.reportService.getByGroup(Types.ObjectId(id))

        return res.json(retorno)
      }

      return res.json({})
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
