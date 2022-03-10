import Container from '@src/configs/ioc'
import { Types } from 'mongoose'
import { IUpdate, ICreate } from '../utils/types/models/group'

export interface IGroupService {
  create(params: { data: ICreate }): Promise<any>
  updateOne(params: { data: IUpdate }, id: Types.ObjectId): Promise<any>
  get(userId: Types.ObjectId): Promise<any>
}

export const GroupService = ({ groupRepository }: Container): IGroupService => {
  return {
    create: async (data) => {
      const saveData: any = await groupRepository.create(data.data)
      return saveData
    },
    updateOne: async (data, id) => {
      const saveData: any = await groupRepository.updateOne(data.data, id)
      return saveData
    },
    get: async (userId) => {
      const getData: any = await groupRepository.get(userId)
      return getData
    },
  }
}
