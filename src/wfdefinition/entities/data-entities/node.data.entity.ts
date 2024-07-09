import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditableDataEntity } from 'src/common/entities/data-entities/base/auditable-data-entity';
import { NodeTypes } from '../enums/node-types.enum';
import { NodeSubTypes } from '../enums/node-subtypes.enum';
import { ProcessVersionEntity } from './process-version.data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('node')
export class NodeEntity extends AuditableDataEntity {
  @ManyToOne(
    () => ProcessVersionEntity,
    (processVersionEntity) => processVersionEntity.nodes,
  )
  processVersion: ProcessVersionEntity;
  @ApiProperty()
  @Column('varchar', { length: 50, nullable: false })
  name: string;
  @ApiProperty()
  @Column('varchar', { length: 20, nullable: false })
  type: NodeTypes;
  @ApiProperty()
  @Column('varchar', { length: 20, nullable: false })
  subtype: NodeSubTypes;
  @ApiProperty()
  @Column('json', { nullable: true })
  data: any;
}
