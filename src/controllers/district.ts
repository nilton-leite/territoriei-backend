import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { ICreate, IUpdate } from '../utils/types/models/group'
import { DistrictService, IDistrictService } from '../services/district'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class DistrictController {
  private logger: Logger
  private districtService: IDistrictService

  constructor({ logger, districtService }: Container) {
    this.logger = logger
    this.districtService = districtService
  }

  public async create(req: Request, res: Response) {
    const { description } = req.body

    let parameters: ICreate = { description }

    const retorno = await this.districtService.create({ data: parameters })
    return res.status(status.OK).send({
      _id: retorno._id,
      description: retorno.description,
    })
  }

  public async update(req: Request, res: Response) {
    const { description, id } = req.body

    let parameters: IUpdate = {
      description: description,
    }

    await this.districtService.updateOne(
      { data: parameters },
      Types.ObjectId(id)
    )
    const retorno = await this.districtService.get(Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }

  async get(req: Request, res: Response) {
    const { id } = req.body

    try {
      if (id) {
        const retorno = await this.districtService.get(Types.ObjectId(id))

        return res.json([retorno])
      }

      return res.json([])
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
