import { Prop, Schema } from '@nestjs/mongoose';
import {
  AbstractDocument,
  AbstractSchemaFactory,
} from '@/core/database/abstract.schema';

@Schema({ collection: 'users', timestamps: true })
export class User extends AbstractDocument {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true })
  password!: string;
}

export const UserSchema = AbstractSchemaFactory(User);
