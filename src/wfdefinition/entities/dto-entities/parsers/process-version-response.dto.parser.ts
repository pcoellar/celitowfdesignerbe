import { ProcessVersionEntity } from '../../data-entities/process-version.data.entity';
import {
  ProcessVersionNodeResponseDto,
  ProcessVersionSequenceFlowResponseDto,
  ProcessVersionResponseDto,
} from '../process-version-response.dto.entity';

export class ProcessVersionResponseParser {
  ParseToProcessVersionResponseDto(
    processVersion: ProcessVersionEntity,
  ): ProcessVersionResponseDto {
    const nodesResponse: ProcessVersionNodeResponseDto[] = [];
    if (processVersion.nodes) {
      for (let i = 0; i < processVersion.nodes.length; i++) {
        nodesResponse.push({
          id: processVersion.nodes[i].id,
          name: processVersion.nodes[i].name,
          type: processVersion.nodes[i].type,
          subtype: processVersion.nodes[i].subtype,
          data: processVersion.nodes[i].data,
          createdDate: processVersion.nodes[i].createdDate,
          lastModified: processVersion.nodes[i].lastModified,
        });
      }
    }

    const sequenceFlowsResponse: ProcessVersionSequenceFlowResponseDto[] = [];
    if (processVersion.sequenceFlows) {
      for (let i = 0; i < processVersion.sequenceFlows.length; i++) {
        sequenceFlowsResponse.push({
          id: processVersion.sequenceFlows[i].id,
          initNode: processVersion.sequenceFlows[i].initNode,
          endNode: processVersion.sequenceFlows[i].endNode,
          createdDate: processVersion.sequenceFlows[i].createdDate,
          lastModified: processVersion.sequenceFlows[i].lastModified,
        });
      }
    }

    const processVersionResponse: ProcessVersionResponseDto = {
      id: processVersion.id,
      version: processVersion.version,
      startNode: processVersion.startNode,
      nodes: nodesResponse,
      sequenceFlows: sequenceFlowsResponse,
      createdDate: processVersion.createdDate,
      lastModified: processVersion.lastModified,
    };

    return processVersionResponse;
  }
}
