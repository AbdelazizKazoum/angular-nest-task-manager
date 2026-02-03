import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../entities/project.schema';
import { AbstractRepository } from '../../../core/database/abstract.repository';

@Injectable()
export class ProjectRepository extends AbstractRepository<Project> {
  protected readonly logger = new Logger(Project.name);

  constructor(
    @InjectModel(Project.name)
    projectModel: Model<Project>,
  ) {
    super(projectModel);
  }
}
