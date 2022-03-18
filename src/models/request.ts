import { Document, Model, Schema, model, Types } from 'mongoose'
import { IStatus } from '../utils/types/models/request'

export interface IRequest extends Document {
  report_id: Types.ObjectId
  user_id: Types.ObjectId
  status?: IStatus
  reply_date: Date
  withdrawn_date: Date
  return_date: Date
  observation: String
}

interface IRequestModels extends Model<IRequest> {}

const schema = new Schema(
  {
    report_id: { type: Types.ObjectId, required: true },
    user_id: { type: Types.ObjectId, required: true },
    status: {
      type: String,
      enum: IStatus,
      required: false,
      default: IStatus.PENDING,
    },
    reply_date: { type: Date, required: true },
    withdrawn_date: { type: Date, required: false },
    return_date: { type: Date, required: false },
    observation: { type: String, required: false },
  },
  { collection: 'requests', timestamps: { createdAt: 'createdAt' } }
)

const RequestModel: IRequestModels = model<IRequest, IRequestModels>(
  'requests',
  schema
)
export default RequestModel
