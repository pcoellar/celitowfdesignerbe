import { ProcessVersionEntity } from 'src/wfdefinition/entities/data-entities/process-version.data.entity';
import { IDataReaderService } from 'src/common/data-access-layer/repositories/interfaces/data-reader.interface';
import { IDataWriterService } from 'src/common/data-access-layer/repositories/interfaces/data-writer.interface';

export abstract class IProcessVersionRepositoryService
  implements
    IDataReaderService<ProcessVersionEntity>,
    IDataWriterService<ProcessVersionEntity>
{
  abstract findAll(): Promise<ProcessVersionEntity[]>;
  abstract find(id: string): Promise<ProcessVersionEntity>;
  abstract findByFilter(filter: any): Promise<ProcessVersionEntity[]>;
  abstract create(entity: ProcessVersionEntity): Promise<ProcessVersionEntity>;
  abstract update(
    entity: Partial<ProcessVersionEntity>,
  ): Promise<ProcessVersionEntity>;
}
