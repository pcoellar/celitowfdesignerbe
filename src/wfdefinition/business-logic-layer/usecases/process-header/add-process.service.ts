import { Injectable } from '@nestjs/common';
import { IAddProcessService } from '../interfaces/process-header/add-process.interface';
import { IProcessRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-repository.interface';
import { IProcessVersionRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-version-repository.interface';
import { AddProcessRequestDto } from 'src/wfdefinition/entities/dto-entities/add-process-request.dto.entity';
import { AddProcessRequestParser } from 'src/wfdefinition/entities/dto-entities/parsers/add-process-request.dto.parser';
import { AddProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/add-process-response.dto.entity';
import { AddProcessResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/add-process-response.dto.parser';
import { AuditableFieldsManager } from 'src/common/business-logic-layer/services/audit/utils';

@Injectable()
export class AddProcessService implements IAddProcessService {
  constructor(
    private readonly processRepositoryService: IProcessRepositoryService,
    private readonly processVersionRepositoryService: IProcessVersionRepositoryService,
  ) {}
  async execute(
    processRequest: AddProcessRequestDto,
  ): Promise<AddProcessResponseDto> {
    const addProcessRequestParser = new AddProcessRequestParser();
    let [processEntity, processVersionEntity] =
      addProcessRequestParser.ParseToProcessProcessVersion(processRequest);

    processEntity = await this.processRepositoryService.create(processEntity);

    const auditableFieldsManager = new AuditableFieldsManager();
    for (let i = 0; i < processVersionEntity.nodes.length; i++) {
      processVersionEntity.nodes[i] =
        auditableFieldsManager.IncludeAuditableFieldsOnCreate(
          processVersionEntity.nodes[i],
        );
    }
    for (let i = 0; i < processVersionEntity.sequenceFlows.length; i++) {
      processVersionEntity.sequenceFlows[i] =
        auditableFieldsManager.IncludeAuditableFieldsOnCreate(
          processVersionEntity.sequenceFlows[i],
        );
    }
    processVersionEntity =
      await this.processVersionRepositoryService.create(processVersionEntity);

    const addProcessResponseParser = new AddProcessResponseParser();
    const response: AddProcessResponseDto =
      addProcessResponseParser.ParseToAddProcessResponseDto(
        processEntity,
        processVersionEntity,
      );

    return response;
  }
}
