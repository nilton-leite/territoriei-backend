import { Types } from 'mongoose'

export enum IStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  RESERVED = 'RESERVED',
}

export interface ICreate {
  report_id: Number
  group_id: Types.ObjectId
  district_id: Types.ObjectId
  streets: [String]
  card: String
  qtde_blocks: Number
  status?: IStatus
}
export interface IUpdate {
  report_id: Number
  group_id: Types.ObjectId
  district_id: Types.ObjectId
  streets: [String]
  card: String
  qtde_blocks: Number
  status?: IStatus
}
export interface IFindById {
  _id: Types.ObjectId
}
