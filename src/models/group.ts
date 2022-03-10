import { Document, Model, Schema, model } from 'mongoose'

export interface IGroup extends Document {
  description: String
}

interface IGroupModels extends Model<IGroup> {}

const schema = new Schema(
  {
    description: { type: String, required: true },
  },
  { collection: 'groups', timestamps: { createdAt: 'createdAt' } }
)

const GroupModel: IGroupModels = model<IGroup, IGroupModels>('group', schema)
export default GroupModel
