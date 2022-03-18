import { IStatus } from '@src/utils/types/models/report'
import { Document, Model, Schema, model, Types } from 'mongoose'

export interface IReport extends Document {
  report_id: Number
  group_id: Types.ObjectId
  district_id: Types.ObjectId
  streets: [String]
  card: String
  qtde_blocks: Number
  status?: IStatus
}

interface IReportModels extends Model<IReport> {}

const schema = new Schema(
  {
    report_id: { type: Number, required: true },
    group_id: { type: Types.ObjectId, required: true },
    district_id: { type: Types.ObjectId, required: true },
    streets: { type: [String], required: true },
    card: { type: String, required: true },
    qtde_blocks: { type: Number, required: true },
    status: {
      type: String,
      enum: IStatus,
      required: false,
      default: IStatus.AVAILABLE,
    },
  },
  { collection: 'reports', timestamps: { createdAt: 'createdAt' } }
)

const ReportModel: IReportModels = model<IReport, IReportModels>(
  'reports',
  schema
)
export default ReportModel
