import { Injectable } from '@nestjs/common';
import { IGetAllProcessFlowService } from '../interfaces/process-flow/get-all-process-flow.interface';
import { ProcessVersionEntity } from 'src/wfdefinition/entities/data-entities/process-version.data.entity';
import { IProcessVersionRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-version-repository.interface';
import { ProcessVersionResponseDto } from 'src/wfdefinition/entities/dto-entities/process-version-response.dto.entity';
import { ProcessVersionResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-version-response.dto.parser';

@Injectable()
export class GetAllProcessFlowService implements IGetAllProcessFlowService {
  constructor(
    private readonly processVersionRepositoryService: IProcessVersionRepositoryService,
  ) {}
  async execute(): Promise<ProcessVersionResponseDto[]> {
    const processesVersions: ProcessVersionEntity[] =
      await this.processVersionRepositoryService.findAll();
    const result: ProcessVersionResponseDto[] = [];
    for (let i = 0; i < processesVersions.length; i++) {
      const processVersionResponseParser = new ProcessVersionResponseParser();
      const processVersionResponseDto: ProcessVersionResponseDto =
        processVersionResponseParser.ParseToProcessVersionResponseDto(
          processesVersions[i],
        );
      result.push(processVersionResponseDto);
    }
    return result;
  }
}
