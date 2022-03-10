import { Document, Model, Schema, model } from 'mongoose'

export interface IDistrict extends Document {
  description: String
}

interface IDistrictModels extends Model<IDistrict> {}

const schema = new Schema(
  {
    description: { type: String, required: true },
  },
  { collection: 'description', timestamps: { createdAt: 'createdAt' } }
)

const DistrictModel: IDistrictModels = model<IDistrict, IDistrictModels>(
  'district',
  schema
)
export default DistrictModel
