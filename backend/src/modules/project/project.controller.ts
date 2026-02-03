import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthenticatedRequest } from '../../common/types/authenticated-request.interface';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.projectService.create(createProjectDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.projectService.findAll(req.user._id!);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.projectService.findOne(id, req.user._id!);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.projectService.update(id, updateProjectDto, req.user._id!);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.projectService.remove(id, req.user._id!);
  }
}
