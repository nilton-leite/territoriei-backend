import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/request'

export interface IRequestService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const RequestService = ({
  requestRepository,
}: Container): IRequestService => {
  return {
    create: async (data) => {
      const saveData: any = await requestRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await requestRepository.updateOne(data.data, id)
      return saveData
    },
    get: async (userId) => {
      const getData: any = await requestRepository.get(userId)
      return getData
    },
  }
}
