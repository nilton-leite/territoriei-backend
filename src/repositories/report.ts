import Container from '../configs/ioc'
import ReportModel from '../models/report'
import { ICreate, IUpdate } from '../utils/types/models/report'
import { Types } from 'mongoose'

export interface IReportRepository {
  create(params: ICreate): Promise<any>
  updateOne(params: IUpdate, id: Types.ObjectId): Promise<any>
  getById(_id: Types.ObjectId): Promise<any>
  get(): Promise<any>
  getByGroup(_id: Types.ObjectId): Promise<any>
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
    getById: async (_id: Types.ObjectId) => {
      const item = await ReportModel.aggregate([
        {
          $match: {
            _id: _id,
          },
        },
        {
          $lookup: {
            from: 'groups',
            localField: 'group_id',
            foreignField: '_id',
            as: 'groups',
          },
        },
        { $unwind: '$groups' },
        {
          $lookup: {
            from: 'districts',
            localField: 'district_id',
            foreignField: '_id',
            as: 'districts',
          },
        },
        { $unwind: '$districts' },
        {
          $project: {
            _id: 1,
            'groups._id': 1,
            'groups.description': 1,
            'districts._id': 1,
            'districts.description': 1,
            qtde_blocks: 1,
            streets: 1,
            report_id: 1,
          },
        },
      ])
      return item
    },
    get: async () => {
      const item = await ReportModel.aggregate([
        {
          $lookup: {
            from: 'groups',
            localField: 'group_id',
            foreignField: '_id',
            as: 'groups',
          },
        },
        { $unwind: '$groups' },
        {
          $lookup: {
            from: 'districts',
            localField: 'district_id',
            foreignField: '_id',
            as: 'districts',
          },
        },
        { $unwind: '$districts' },
        {
          $project: {
            _id: 1,
            'groups._id': 1,
            'groups.description': 1,
            'districts._id': 1,
            'districts.description': 1,
            qtde_blocks: 1,
            streets: 1,
            report_id: 1,
          },
        },
      ])
      return item
    },
    getByGroup: async (_id: Types.ObjectId) => {
      const item = await ReportModel.aggregate([
        {
          $match: {
            group_id: _id,
          },
        },
        {
          $lookup: {
            from: 'groups',
            localField: 'group_id',
            foreignField: '_id',
            as: 'groups',
          },
        },
        { $unwind: '$groups' },
        {
          $lookup: {
            from: 'districts',
            localField: 'district_id',
            foreignField: '_id',
            as: 'districts',
          },
        },
        { $unwind: '$districts' },
        {
          $project: {
            _id: 1,
            'groups._id': 1,
            'groups.description': 1,
            'districts._id': 1,
            'districts.description': 1,
            qtde_blocks: 1,
            streets: 1,
            report_id: 1,
          },
        },
      ])
      return item
    },
  }
}
