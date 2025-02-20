import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class User extends Document {
  @Prop({ required: true })
  email: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string

  @Prop()
  picture: string

  @Prop({ default: false })
  isAdmin: boolean

  @Prop({ default: true })
  isEnabled: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)

