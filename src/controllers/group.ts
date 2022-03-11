import { Request, Response } from 'express'
import status from 'http-status'
import Container from 'src/configs/ioc'
import { Logger } from 'winston'
import dotenv from 'dotenv'
import { Types } from 'mongoose'
import { ICreate, IUpdate } from '../utils/types/models/group'
import { GroupService, IGroupService } from '@src/services/group'

const envFound = dotenv.config()
if (!envFound) {
  throw new Error('.env file not found')
}

export class GroupController {
  private logger: Logger
  private groupService: IGroupService

  constructor({ logger, groupService }: Container) {
    this.logger = logger
    this.groupService = groupService
  }

  public async create(req: Request, res: Response) {
    const { description } = req.body

    let parameters: ICreate = { description }

    const retorno = await this.groupService.create({ data: parameters })
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

    await this.groupService.updateOne({ data: parameters }, Types.ObjectId(id))
    const retorno = await this.groupService.getById(Types.ObjectId(id))
    return res.status(status.OK).send(retorno)
  }

  async get(req: Request, res: Response) {
    try {
      const retorno = await this.groupService.get()
      return res.json(retorno)
    } catch (error: any) {
      return res.status(400).send(error.message)
    }
  }
}
