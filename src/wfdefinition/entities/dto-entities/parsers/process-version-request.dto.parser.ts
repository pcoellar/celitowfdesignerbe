import { IProcessVersionRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-version-repository.interface';
import { NodeEntity } from '../../data-entities/node.data.entity';
import { ProcessVersionEntity } from '../../data-entities/process-version.data.entity';
import { SequenceFlowEntity } from '../../data-entities/sequence-flow.data.entity';
import { ProcessVersionRequestDto } from '../process-version-request.dto.entity';
import { NotFoundException } from '@nestjs/common';

export class ProcessVersionRequestParser {
  constructor(
    private readonly processVersionRespositoryService: IProcessVersionRepositoryService,
  ) {}
  async ParseToProcessVersionEntity(
    processVersionRequest: ProcessVersionRequestDto,
  ): Promise<ProcessVersionEntity> {
    const processVersionDB: ProcessVersionEntity =
      await this.processVersionRespositoryService.find(
        processVersionRequest.id,
        ['nodes', 'sequenceFlows', 'process'],
      );
    if (!processVersionDB) {
      throw new NotFoundException();
    }

    const processVersion: ProcessVersionEntity = {
      id: processVersionRequest.id,
      version: processVersionDB.version,
      startNode: processVersionRequest.startNode,
      nodes: null,
      sequenceFlows: null,
      process: processVersionDB.process,
    };

    const nodes: NodeEntity[] = [];
    if (processVersionRequest.nodes) {
      for (let i = 0; i < processVersionRequest.nodes.length; i++) {
        nodes.push({
          id: processVersionRequest.nodes[i].id,
          name: processVersionRequest.nodes[i].name,
          type: processVersionRequest.nodes[i].type,
          subtype: processVersionRequest.nodes[i].subtype,
          data: processVersionRequest.nodes[i].data,
          processVersion: processVersion,
        });
      }
    }

    const sequenceFlows: SequenceFlowEntity[] = [];
    if (processVersionRequest.sequenceFlows) {
      for (let i = 0; i < processVersionRequest.sequenceFlows.length; i++) {
        sequenceFlows.push({
          id: processVersionRequest.sequenceFlows[i].id,
          initNode: processVersionRequest.sequenceFlows[i].initNode,
          endNode: processVersionRequest.sequenceFlows[i].endNode,
          processVersion: processVersion,
        });
      }
    }

    processVersion.nodes = nodes;
    processVersion.sequenceFlows = sequenceFlows;

    return processVersion;
  }
}
