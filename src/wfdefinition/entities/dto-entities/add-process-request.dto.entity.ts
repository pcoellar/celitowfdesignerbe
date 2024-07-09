import { IsEnum, IsString } from 'class-validator';
import { NodeTypes } from '../enums/node-types.enum';
import { NodeSubTypes } from '../enums/node-subtypes.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AddProcessRequestNodeDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(NodeTypes)
  type: NodeTypes;

  @ApiProperty()
  @IsEnum(NodeSubTypes)
  subtype: NodeSubTypes;

  data: any;
}

export class AddProcessRequestSecuenceFlowDto {
  @ApiProperty()
  @IsString()
  initNode: string;

  @ApiProperty()
  @IsString()
  endNode: string;
}

export class AddProcessRequestDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  startNode: string;

  @ApiProperty()
  nodes: AddProcessRequestNodeDto[];
  @ApiProperty()
  sequence_flows: AddProcessRequestSecuenceFlowDto[];
}
