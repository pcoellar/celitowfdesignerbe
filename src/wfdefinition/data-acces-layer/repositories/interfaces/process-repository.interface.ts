import { IDataReaderService } from 'src/common/data-access-layer/repositories/interfaces/data-reader.interface';
import { IDataWriterService } from 'src/common/data-access-layer/repositories/interfaces/data-writer.interface';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';

export abstract class IProcessRepositoryService
  implements
    IDataReaderService<ProcessEntity>,
    IDataWriterService<ProcessEntity>
{
  abstract findAll(): Promise<ProcessEntity[]>;
  abstract find(id: string): Promise<ProcessEntity>;
  abstract findByFilter(filter: any): Promise<ProcessEntity[]>;
  abstract create(entity: ProcessEntity): Promise<ProcessEntity>;
  abstract update(entity: Partial<ProcessEntity>): Promise<ProcessEntity>;
}
