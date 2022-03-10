import { Types } from 'mongoose'

export enum IStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  RETURNED = 'RETURNED',
  RESERVED = 'RESERVED',
}
export interface ICreate {
  report_id: Types.ObjectId
  user_id: Types.ObjectId
  status: IStatus
  reply_date: Date
  withdrawn_date: Date
  return_date: Date
  observation: String
}
export interface IUpdate {
  report_id: Types.ObjectId
  user_id: Types.ObjectId
  status: IStatus
  reply_date: Date
  withdrawn_date: Date
  return_date: Date
  observation: String
}
export interface IFindById {
  _id: Types.ObjectId
}
