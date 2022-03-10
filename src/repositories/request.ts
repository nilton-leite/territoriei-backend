import Container from '../configs/ioc'
import RequestModel from '../models/request'
import { ICreate, IUpdate } from '../utils/types/models/request'
import { Types } from 'mongoose'

export interface IRequestRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const RequestRepository = ({}: Container): IRequestRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await RequestModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await RequestModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      const item = await RequestModel.findOne({ _id: userId })
      return item
    },
  }
}
