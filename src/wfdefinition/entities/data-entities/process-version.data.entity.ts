import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AuditableDataEntity } from 'src/common/entities/data-entities/base/auditable-data-entity';
import { ProcessEntity } from './process.data.entity';
import { NodeEntity } from './node.data.entity';
import { SequenceFlowEntity } from './sequence-flow.data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('process_version')
export class ProcessVersionEntity extends AuditableDataEntity {
  @ManyToOne(
    () => ProcessEntity,
    (processEntity) => processEntity.processVersions,
  )
  process: ProcessEntity;
  @ApiProperty()
  @Column('integer', { nullable: false })
  version: number;
  @ApiProperty()
  @Column('varchar', { length: 36, nullable: false })
  startNode: string;
  @ApiProperty()
  @OneToMany(() => NodeEntity, (nodeEntity) => nodeEntity.processVersion, {
    cascade: true,
  })
  nodes: NodeEntity[];
  @ApiProperty()
  @OneToMany(
    () => SequenceFlowEntity,
    (sequenceFlowEntity) => sequenceFlowEntity.processVersion,
    { cascade: true },
  )
  sequenceFlows: SequenceFlowEntity[];
}
