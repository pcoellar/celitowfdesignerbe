import { Injectable } from '@nestjs/common';
import { IProcessRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-repository.interface';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';
import { IGetAllProcessHeaderService } from '../interfaces/process-header/get-all-process-header.interface';
import { ProcessResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-response.dto.parse';
import { ProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/process-response.dto.entity';

@Injectable()
export class GetAllProcessHeaderService implements IGetAllProcessHeaderService {
  constructor(
    private readonly processRepositoryService: IProcessRepositoryService,
  ) {}
  async execute(): Promise<ProcessResponseDto[]> {
    const processEntities: ProcessEntity[] =
      await this.processRepositoryService.findAll();
    const result: ProcessResponseDto[] = [];
    for (let i = 0; i < processEntities.length; i++) {
      const getProcessResponseParser = new ProcessResponseParser();
      const processResponseDto =
        getProcessResponseParser.ParseToProcessResponseDto(processEntities[i]);
      result.push(processResponseDto);
    }
    return result;
  }
}
