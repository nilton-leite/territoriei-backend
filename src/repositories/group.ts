import Container from '@src/configs/ioc'
import GroupModel from '@src/models/group'
import { ICreate, IUpdate } from '../utils/types/models/group'
import { Types } from 'mongoose'

export interface IGroupRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const GroupRepository = ({}: Container): IGroupRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await GroupModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await GroupModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      const item = await GroupModel.findOne({ _id: userId })
      return item
    },
  }
}
