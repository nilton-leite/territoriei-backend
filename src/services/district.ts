import Container from '../configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/district'

export interface IDistrictService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const DistrictService = ({
  districtRepository,
}: Container): IDistrictService => {
  return {
    create: async (data) => {
      const saveData: any = await districtRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await districtRepository.updateOne(data.data, id)
      return saveData
    },
    get: async (userId) => {
      const getData: any = await districtRepository.get(userId)
      return getData
    },
  }
}
