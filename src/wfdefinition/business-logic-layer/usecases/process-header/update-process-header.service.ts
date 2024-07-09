import { Injectable } from '@nestjs/common';
import { IUpdateProcessHeaderService } from '../interfaces/process-header/update-process-header.interface';
import { IProcessRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-repository.interface';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';
import { ProcessRequestParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-request.dto.parser';
import { ProcessResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-response.dto.parse';
import { ProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/process-response.dto.entity';
import { ProcessRequestDto } from 'src/wfdefinition/entities/dto-entities/process-request.dto.entity';

@Injectable()
export class UpdateProcessHeaderService implements IUpdateProcessHeaderService {
  constructor(
    private readonly processRespositoryService: IProcessRepositoryService,
  ) {}
  async execute(
    processRequest: ProcessRequestDto,
  ): Promise<ProcessResponseDto> {
    const processRequestParser = new ProcessRequestParser();
    const processEntity: Partial<ProcessEntity> =
      processRequestParser.ParseToProcessEntity(processRequest);
    const process: ProcessEntity =
      await this.processRespositoryService.update(processEntity);
    const processResponseParser = new ProcessResponseParser();
    const result: ProcessResponseDto =
      processResponseParser.ParseToProcessResponseDto(process);
    return result;
  }
}
