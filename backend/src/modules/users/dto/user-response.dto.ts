import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
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
