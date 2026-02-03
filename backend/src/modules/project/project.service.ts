/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './repositories/project.repository';
import { Types } from 'mongoose';
import { Project } from './entities/project.schema';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.projectRepository.create({
      ...createProjectDto,
      owner_id: new Types.ObjectId(createProjectDto.owner_id),
    } as Omit<Project, '_id'>);
  }

  async findAll() {
    return this.projectRepository.findAll({});
  }

  async findOne(id: string) {
    return this.projectRepository.findOne({ _id: new Types.ObjectId(id) });
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateProjectDto,
    );
  }

  async remove(id: string) {
    return this.projectRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
