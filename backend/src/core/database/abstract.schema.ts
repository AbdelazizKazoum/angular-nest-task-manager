/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
// src/database/abstract.schema.ts
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types, Document } from 'mongoose';

@Schema()
export class AbstractDocument extends Document {
  declare _id: Types.ObjectId;
}

// This helper is useful if you use Mongoose without a framework wrapper
export function AbstractSchemaFactory<T extends AbstractDocument>(
  document: new (...args: any[]) => T,
): MongooseSchema<any> {
  const schema = (SchemaFactory as any).createForClass(
    document,
  ) as MongooseSchema<any>;
  // You can add global plugins here (e.g., auto-increment, soft delete)
  return schema;
}
