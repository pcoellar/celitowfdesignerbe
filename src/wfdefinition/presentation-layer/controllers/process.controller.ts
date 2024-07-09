import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAddProcessService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-header/add-process.interface';
import { IGetAllProcessHeaderService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-header/get-all-process-header.interface';
import { IGetProcessHeaderService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-header/get-process-header.interface';
import { IUpdateProcessHeaderService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-header/update-process-header.interface';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';
import { AddProcessRequestDto } from 'src/wfdefinition/entities/dto-entities/add-process-request.dto.entity';

@Controller('processes')
@ApiTags('Processes')
@ApiResponse({ status: 500, description: 'Internal error' })
export class ProcessController {
  constructor(
    private readonly addProcessUseCase: IAddProcessService,
    private readonly getProcessHeaderUseCase: IGetProcessHeaderService,
    private readonly updateProcessHeaderUseCase: IUpdateProcessHeaderService,
    private readonly getAllProcessHeaderService: IGetAllProcessHeaderService,
  ) {}

  @Get()
  async getAllProcess() {
    const processes = await this.getAllProcessHeaderService.execute();
    return processes;
  }

  @Get(':id')
  async getProcess(@Param('id') id?: string) {
    const process = await this.getProcessHeaderUseCase.execute(id);
    return process;
  }

  @Put()
  async updateProcess(@Body() process: ProcessEntity) {
    const updatedProcess =
      await this.updateProcessHeaderUseCase.execute(process);
    return updatedProcess;
  }

  @Post()
  async addProcess(@Body() process: AddProcessRequestDto) {
    const userCreated = await this.addProcessUseCase.execute(process);
    return userCreated;
  }
}
