import { Injectable } from '@nestjs/common';
import { ProcessVersionEntity } from 'src/wfdefinition/entities/data-entities/process-version.data.entity';
import { IProcessVersionRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-version-repository.interface';
import { IGetProcessFlowService } from '../interfaces/process-flow/get-process-flow.interface';
import { ProcessVersionResponseDto } from 'src/wfdefinition/entities/dto-entities/process-version-response.dto.entity';
import { ProcessVersionResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-version-response.dto.parser';

@Injectable()
export class GetProcessFlowService implements IGetProcessFlowService {
  constructor(
    private readonly processVersionRespositoryService: IProcessVersionRepositoryService,
  ) {}
  async execute(id: string): Promise<ProcessVersionResponseDto> {
    const processVersion: ProcessVersionEntity =
      await this.processVersionRespositoryService.find(id, [
        'nodes',
        'sequenceFlows',
        'process',
      ]);

    const processVersionResponseParser = new ProcessVersionResponseParser();
    const result: ProcessVersionResponseDto =
      processVersionResponseParser.ParseToProcessVersionResponseDto(
        processVersion,
      );
    return result;
  }
}
