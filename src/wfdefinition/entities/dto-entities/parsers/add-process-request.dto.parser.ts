import { AddProcessRequestDto } from '../add-process-request.dto.entity';
import { ProcessEntity } from '../../data-entities/process.data.entity';
import { ProcessVersionEntity } from '../../data-entities/process-version.data.entity';
import { NodeEntity } from '../../data-entities/node.data.entity';
import { SequenceFlowEntity } from '../../data-entities/sequence-flow.data.entity';
import { v4 as uuidv4 } from 'uuid';

export class AddProcessRequestParser {
  ParseToProcessProcessVersion(
    processRequest: AddProcessRequestDto,
  ): [ProcessEntity, ProcessVersionEntity] {
    const processVersionId = uuidv4();
    const processEntity: ProcessEntity = {
      id: uuidv4(),
      name: processRequest.name,
      currentVersion: processVersionId,
      processVersions: [],
    };

    const nodes: NodeEntity[] = [];
    for (let i = 0; i < processRequest.nodes.length; i++) {
      nodes.push({
        ...processRequest.nodes[i],
        processVersion: processVersionId,
      });
    }
    const sequenceFlows: SequenceFlowEntity[] = [];
    for (let i = 0; i < processRequest.sequenceFlows.length; i++) {
      sequenceFlows.push({
        ...processRequest.sequenceFlows[i],
        processVersion: processVersionId,
        id: uuidv4(),
      });
    }
    const processVersionEntity: ProcessVersionEntity = {
      process: processEntity,
      version: 1,
      startNode: processRequest.startNode,
      nodes: nodes,
      sequenceFlows: sequenceFlows,
      id: processVersionId,
    };
    return [processEntity, processVersionEntity];
  }
}
