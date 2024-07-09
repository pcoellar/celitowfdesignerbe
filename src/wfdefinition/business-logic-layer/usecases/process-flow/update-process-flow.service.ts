import { Injectable } from '@nestjs/common';
import { IProcessVersionRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-version-repository.interface';
import { IUpdateProcessFlowService } from '../interfaces/process-flow/update-process-flow.interface';
import { ProcessVersionResponseDto } from 'src/wfdefinition/entities/dto-entities/process-version-response.dto.entity';
import { ProcessVersionRequestDto } from 'src/wfdefinition/entities/dto-entities/process-version-request.dto.entity';
import { ProcessVersionEntity } from 'src/wfdefinition/entities/data-entities/process-version.data.entity';
import { ProcessVersionRequestParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-version-request.dto.parser';
import { ProcessVersionResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/process-version-response.dto.parser';
import { AuditableFieldsManager } from 'src/common/business-logic-layer/services/audit/utils';
import { v4 as uuidv4 } from 'uuid';
import { IApiService } from 'src/common/business-logic-layer/services/api/interfaces/api.interface';
import { ConfigService } from '@nestjs/config';
import { ProcessInstancesVersionCountResponse } from 'src/wfdefinition/entities/service-entities/process-instances-version-count-response.entity';

export class NodeMap {
  oldNodeId: string;
  newNodeId: string;
}

@Injectable()
export class UpdateProcessFlowService implements IUpdateProcessFlowService {
  constructor(
    private readonly processVersionRepositoryService: IProcessVersionRepositoryService,
    private readonly apiService: IApiService,
    private readonly configService: ConfigService,
  ) {}

  GetNewId(oldNodeId: string, nodesMap: NodeMap[]): string {
    const found = nodesMap.filter((x) => x.oldNodeId === oldNodeId);
    return found[0].newNodeId;
  }

  async CreateNewVersion(processVersionEntity: ProcessVersionEntity) {
    const newProcessVersionId = uuidv4();
    const processesVersionsDB =
      await this.processVersionRepositoryService.findByFilter({
        process: {
          id: processVersionEntity.process.id,
        },
      });
    let maxVersion = 0;
    for (let i = 0; i < processesVersionsDB.length; i++) {
      if (maxVersion < processesVersionsDB[i].version) {
        maxVersion = processesVersionsDB[i].version;
      }
    }
    const newVersion = maxVersion + 1;
    let newProcessVersion: ProcessVersionEntity = {
      ...processVersionEntity,
      id: newProcessVersionId,
      version: newVersion,
      nodes: [],
      sequenceFlows: [],
    };
    const nodesMap: NodeMap[] = [];
    const auditableFieldsManager = new AuditableFieldsManager();
    for (let i = 0; i < processVersionEntity.nodes.length; i++) {
      const nodeId = uuidv4();
      nodesMap.push({
        oldNodeId: processVersionEntity.nodes[i].id,
        newNodeId: nodeId,
      });
      newProcessVersion.nodes.push({
        ...processVersionEntity.nodes[i],
        id: nodeId,
        processVersion: newProcessVersionId,
      });
      newProcessVersion.nodes[i] =
        auditableFieldsManager.IncludeAuditableFieldsOnCreate(
          newProcessVersion.nodes[i],
        );
    }
    for (let i = 0; i < processVersionEntity.sequenceFlows.length; i++) {
      newProcessVersion.sequenceFlows.push({
        ...processVersionEntity.sequenceFlows[i],
        id: uuidv4(),
        processVersion: newProcessVersionId,
        initNode: this.GetNewId(
          processVersionEntity.sequenceFlows[i].initNode,
          nodesMap,
        ),
        endNode: this.GetNewId(
          processVersionEntity.sequenceFlows[i].endNode,
          nodesMap,
        ),
      });
      newProcessVersion.sequenceFlows[i] =
        auditableFieldsManager.IncludeAuditableFieldsOnCreate(
          newProcessVersion.sequenceFlows[i],
        );
    }
    newProcessVersion.startNode = this.GetNewId(
      newProcessVersion.startNode,
      nodesMap,
    );

    newProcessVersion =
      await this.processVersionRepositoryService.create(newProcessVersion);

    const processVersionResponseParser = new ProcessVersionResponseParser();
    const result: ProcessVersionResponseDto =
      processVersionResponseParser.ParseToProcessVersionResponseDto(
        newProcessVersion,
      );

    return result;
  }

  async UpdateCurrentVersion(
    processVersionEntity: Partial<ProcessVersionEntity>,
  ) {
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
    const updatedProcessVersion: ProcessVersionEntity =
      await this.processVersionRepositoryService.update(processVersionEntity);
    const processVersionResponseParser = new ProcessVersionResponseParser();
    const result: ProcessVersionResponseDto =
      processVersionResponseParser.ParseToProcessVersionResponseDto(
        updatedProcessVersion,
      );
    return result;
  }

  async execute(
    processVersionRequest: ProcessVersionRequestDto,
  ): Promise<ProcessVersionResponseDto> {
    const processVersionRequestParser = new ProcessVersionRequestParser(
      this.processVersionRepositoryService,
    );
    const processVersionEntity: ProcessVersionEntity =
      await processVersionRequestParser.ParseToProcessVersionEntity(
        processVersionRequest,
      );
    const wfEngineBaseUrl: string = this.configService.get('WFENGINE_BASE_URL');
    const response: ProcessInstancesVersionCountResponse =
      await this.apiService.get(
        `${wfEngineBaseUrl}process_instance/version/${processVersionEntity.id}/count`,
      );
    const newVersion = response.total > 0;
    if (newVersion) {
      return await this.CreateNewVersion(processVersionEntity);
    } else {
      return await this.UpdateCurrentVersion(processVersionEntity);
    }
  }
}
