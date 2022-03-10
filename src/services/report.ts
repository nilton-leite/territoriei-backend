import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/report'

export interface IReportService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const ReportService = ({
  reportRepository,
}: Container): IReportService => {
  return {
    create: async (data) => {
      const saveData: any = await reportRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await reportRepository.updateOne(data.data, id)
      return saveData
    },
    get: async (userId) => {
      const getData: any = await reportRepository.get(userId)
      return getData
    },
  }
}
