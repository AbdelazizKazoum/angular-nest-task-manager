/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class UserResponseDto {
  @Expose()
  @Transform(({ value }) =>
    value instanceof Types.ObjectId ? value.toString() : value,
  )
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  createdAt?: Date;

  @Expose()
  updatedAt?: Date;

  @Exclude()
  password!: string; // Never expose password in responses

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
