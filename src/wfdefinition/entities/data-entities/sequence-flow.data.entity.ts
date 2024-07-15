import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditableDataEntity } from 'src/common/entities/data-entities/base/auditable-data-entity';
import { ProcessVersionEntity } from './process-version.data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sequence_flow')
export class SequenceFlowEntity extends AuditableDataEntity {
  @ManyToOne(
    () => ProcessVersionEntity,
    (processVersionEntity) => processVersionEntity.sequenceFlows,
  )
  processVersion: ProcessVersionEntity;
  @ApiProperty()
  @Column('varchar', { length: 36, nullable: false })
  initNode: string;
  @ApiProperty()
  @Column('varchar', { length: 36, nullable: false })
  endNode: string;
  @ApiProperty()
  @Column('varchar', { nullable: true })
  condition?: string;
}
