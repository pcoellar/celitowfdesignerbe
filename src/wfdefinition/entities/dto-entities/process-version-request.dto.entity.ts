import { NodeTypes } from '../enums/node-types.enum';
import { NodeSubTypes } from '../enums/node-subtypes.enum';

export class ProcessVersionNodeRequestDto {
  id: string;
  name: string;
  type: NodeTypes;
  subtype: NodeSubTypes;
  data: any;
}

export class ProcessVersionSequenceFlowRequestDto {
  id: string;
  initNode: string;
  endNode: string;
}

export class ProcessVersionRequestDto {
  id: string;
  startNode: string;
  nodes: ProcessVersionNodeRequestDto[];
  sequenceFlows: ProcessVersionSequenceFlowRequestDto[];
}
