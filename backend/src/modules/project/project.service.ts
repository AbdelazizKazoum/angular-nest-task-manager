import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './repositories/project.repository';
import { Types } from 'mongoose';
import { Project } from './entities/project.schema';
import type { AuthUser } from '../../common/types/authenticated-request.interface';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto, user: AuthUser) {
    return this.projectRepository.create({
      ...createProjectDto,
      owner_id: new Types.ObjectId(user._id),
    } as Omit<Project, '_id'>);
  }

  async findAll(userId: string) {
    return this.projectRepository.findAll({
      owner_id: new Types.ObjectId(userId),
    });
  }

  async findOne(id: string, userId: string) {
    return this.projectRepository.findOne({
      _id: new Types.ObjectId(id),
      owner_id: new Types.ObjectId(userId),
    });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    return this.projectRepository.findOneAndUpdate(
      {
        _id: new Types.ObjectId(id),
        owner_id: new Types.ObjectId(userId),
      },
      updateProjectDto,
    );
  }

  async remove(id: string, userId: string) {
    return this.projectRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
      owner_id: new Types.ObjectId(userId),
    });
  }
}
