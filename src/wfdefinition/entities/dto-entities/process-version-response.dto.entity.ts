import { NodeTypes } from '../enums/node-types.enum';
import { NodeSubTypes } from '../enums/node-subtypes.enum';

export class ProcessVersionNodeResponseDto {
  id: string;
  name: string;
  type: NodeTypes;
  subtype: NodeSubTypes;
  data: any;
  createdDate?: Date;
  lastModified?: Date;
}

export class ProcessVersionSequenceFlowResponseDto {
  id: string;
  initNode: string;
  endNode: string;
  createdDate?: Date;
  lastModified?: Date;
}

export class ProcessVersionResponseDto {
  id: string;
  version: number;
  startNode: string;
  nodes: ProcessVersionNodeResponseDto[];
  sequenceFlows: ProcessVersionSequenceFlowResponseDto[];
  createdDate?: Date;
  lastModified?: Date;
}
