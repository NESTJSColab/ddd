import { HttpCode, Body, Controller, Post } from '@nestjs/common';

import { CreateProjectDto } from './create-project.dto';
import { CreateProjectService } from './create-project.service';

@Controller('projects')
export class CreateProjectController {
  constructor(private readonly projectService: CreateProjectService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createProject: CreateProjectDto): Promise<void> {
    const { name } = createProject;

    this.projectService.create(name);
  }
}