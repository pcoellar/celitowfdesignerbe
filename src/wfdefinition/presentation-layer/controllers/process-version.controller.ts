import { Body, Controller, Get, Put, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IGetAllProcessFlowService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-flow/get-all-process-flow.interface';
import { IGetProcessFlowService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-flow/get-process-flow.interface';
import { IUpdateProcessFlowService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/process-flow/update-process-flow.interface';
import { ProcessVersionEntity } from 'src/wfdefinition/entities/data-entities/process-version.data.entity';

@Controller('processes_version')
@ApiTags('Processes Version')
@ApiResponse({ status: 500, description: 'Internal error' })
export class ProcessVersionController {
  constructor(
    private readonly getProcessFlowUseCase: IGetProcessFlowService,
    private readonly updateProcessFlowUseCase: IUpdateProcessFlowService,
    private readonly getAllProcessFlowService: IGetAllProcessFlowService,
  ) {}

  @Get()
  async getAllProcess() {
    return await this.getAllProcessFlowService.execute();
  }

  @Get(':id')
  async getProcessVersion(@Param('id') id?: string) {
    const processVersion = await this.getProcessFlowUseCase.execute(id);
    return processVersion;
  }

  @Put()
  async updateProcessVersion(@Body() processVersion: ProcessVersionEntity) {
    const updatedProcessVersion =
      await this.updateProcessFlowUseCase.execute(processVersion);
    return updatedProcessVersion;
  }
}
