import { Types } from 'mongoose'
export interface ICreate {
  description: string
}
export interface IUpdate {
  description: string
}
export interface IFindById {
  _id: Types.ObjectId
}
