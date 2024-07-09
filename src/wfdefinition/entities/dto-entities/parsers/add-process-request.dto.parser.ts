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
    const process_version_id = uuidv4();
    const processEntity: ProcessEntity = {
      id: uuidv4(),
      name: processRequest.name,
      currentVersion: process_version_id,
      processVersions: [],
    };

    const nodes: NodeEntity[] = [];
    for (let i = 0; i < processRequest.nodes.length; i++) {
      nodes.push({
        ...processRequest.nodes[i],
        processVersion: process_version_id,
      });
    }
    const sequence_flows: SequenceFlowEntity[] = [];
    for (let i = 0; i < processRequest.sequence_flows.length; i++) {
      sequence_flows.push({
        ...processRequest.sequence_flows[i],
        processVersion: process_version_id,
        id: uuidv4(),
      });
    }
    const processVersionEntity: ProcessVersionEntity = {
      process: processEntity,
      version: 1,
      startNode: processRequest.startNode,
      nodes: nodes,
      sequenceFlows: sequence_flows,
      id: process_version_id,
    };
    return [processEntity, processVersionEntity];
  }
}
