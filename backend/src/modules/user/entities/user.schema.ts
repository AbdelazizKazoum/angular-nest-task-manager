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

  @Prop({ trim: true })
  phone?: string;

  @Prop({ default: 'user', enum: ['user', 'admin', 'manager'] })
  role!: string;

  @Prop()
  avatar?: string;

  @Prop({ default: true })
  isActive!: boolean;

  @Prop({ type: Object })
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };

  @Prop()
  department?: string;

  @Prop({ type: [String] })
  skills?: string[];
}

export const UserSchema = AbstractSchemaFactory(User);
