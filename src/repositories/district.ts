import Container from '../configs/ioc'
import DistrictModel from '../models/district'
import { ICreate, IUpdate } from '../utils/types/models/district'
import { Types } from 'mongoose'

export interface IDistrictRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const DistrictRepository = ({}: Container): IDistrictRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await DistrictModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await DistrictModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      const item = await DistrictModel.findOne({ _id: userId })
      return item
    },
  }
}
