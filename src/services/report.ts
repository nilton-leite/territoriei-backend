import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/report'

export interface IReportService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  getById(_id: Types.ObjectId): Promise<any>
  get(): Promise<any>
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
    getById: async (_id) => {
      const getData: any = await reportRepository.getById(_id)
      return getData
    },
    get: async () => {
      const getData: any = await reportRepository.get()
      return getData
    },
  }
}
