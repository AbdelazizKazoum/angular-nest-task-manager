import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import {
  AbstractDocument,
  AbstractSchemaFactory,
} from '@/core/database/abstract.schema';
import { User } from '../../user/entities/user.schema';

@Schema({
  collection: 'projects',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Project extends AbstractDocument {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner_id!: Types.ObjectId;

  @Prop({ default: false })
  is_archived!: boolean;
}

export const ProjectSchema = AbstractSchemaFactory(Project);
