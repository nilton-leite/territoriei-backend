import Container from '../configs/ioc'
import ReportModel from '../models/report'
import { ICreate, IUpdate } from '../utils/types/models/report'
import { Types } from 'mongoose'

export interface IReportRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const ReportRepository = ({}: Container): IReportRepository => {
  return {
    create: async (params: ICreate) => {
      const item = await ReportModel.create(params)
      return item
    },
    updateOne: async (params: IUpdate, id: Types.ObjectId) => {
      const item = await ReportModel.updateOne({ _id: id }, params)
      return item
    },
    get: async (userId: Types.ObjectId) => {
      const item = await ReportModel.findOne({ _id: userId })
      return item
    },
  }
}
