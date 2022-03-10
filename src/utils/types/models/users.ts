import { Types } from 'mongoose'

export interface ICreate {
  full_name: string
  telephone: string
  email: string
  birth_date: Date
  group_id: Types.ObjectId
  token_firebase_messaging?: string
  token_firebase?: string
  token_facebook?: string
  token_google?: string
}

export interface IUpdate {
  full_name: string
  telephone: string
  birth_date: Date
  group_id: Types.ObjectId
}
export interface IFindOne {
  email: string
}
export interface IFindOneLogin {
  email: string
  token_firebase: string
}
