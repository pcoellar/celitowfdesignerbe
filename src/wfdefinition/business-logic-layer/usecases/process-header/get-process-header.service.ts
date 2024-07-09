import { Injectable } from '@nestjs/common';
import { IGetProcessHeaderService } from '../interfaces/process-header/get-process-header.interface';
import { IProcessRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-repository.interface';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';
import { ProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/process-response.dto.entity';
import { ProcessResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-response.dto.parse';

@Injectable()
export class GetProcessHeaderService implements IGetProcessHeaderService {
  constructor(
    private readonly processRepositoryService: IProcessRepositoryService,
  ) {}
  async execute(id: string): Promise<ProcessResponseDto> {
    const process: ProcessEntity = await this.processRepositoryService.find(id);
    const getProcessResponseParser = new ProcessResponseParser();
    const result: ProcessResponseDto =
      getProcessResponseParser.ParseToProcessResponseDto(process);
    return result;
  }
}
