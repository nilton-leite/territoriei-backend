import { Types } from 'mongoose'
export interface ICreate {
  report_id: Number
  group_id: Types.ObjectId
  district_id: Types.ObjectId
  streets: [String]
  card: String
  qtde_blocks: Number
}
export interface IUpdate {
  report_id: Number
  group_id: Types.ObjectId
  district_id: Types.ObjectId
  streets: [String]
  card: String
  qtde_blocks: Number
}
export interface IFindById {
  _id: Types.ObjectId
}
