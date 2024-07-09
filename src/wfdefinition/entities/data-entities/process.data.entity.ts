import { Column, Entity, OneToMany } from 'typeorm';
import { AuditableDataEntity } from 'src/common/entities/data-entities/base/auditable-data-entity';
import { ProcessVersionEntity } from './process-version.data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('process')
export class ProcessEntity extends AuditableDataEntity {
  @ApiProperty()
  @Column('varchar', { length: 60, nullable: false })
  name: string;
  @Column('varchar', { length: 36, nullable: false })
  currentVersion: string;
  @OneToMany(
    () => ProcessVersionEntity,
    (processVersionEntity) => processVersionEntity.process,
  )
  processVersions: ProcessVersionEntity[];
}
