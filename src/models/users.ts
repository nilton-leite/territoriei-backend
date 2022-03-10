import { Document, Model, Schema, model, Types } from 'mongoose'

export interface IUsers extends Document {
  full_name: String
  telephone: String
  email: String
  birth_date: Date
  group_id: Types.ObjectId
  token_firebase_messaging?: String
  token_firebase?: String
  token_facebook?: String
  token_google?: String
}

interface IUsersModels extends Model<IUsers> {}

const schema = new Schema(
  {
    full_name: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true },
    birth_date: { type: Date, required: true },
    group_id: { type: Types.ObjectId, required: true },
    token_firebase_messaging: { type: String, required: false },
    token_firebase: { type: String, required: false },
    token_facebook: { type: String, required: false },
    token_google: { type: String, required: false },
  },
  { collection: 'users', timestamps: { createdAt: 'createdAt' } }
)

const UserModel: IUsersModels = model<IUsers, IUsersModels>('users', schema)
export default UserModel
