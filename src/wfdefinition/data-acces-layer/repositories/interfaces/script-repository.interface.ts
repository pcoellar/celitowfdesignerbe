import { IDataReaderService } from 'src/common/data-access-layer/repositories/interfaces/data-reader.interface';
import { IDataRemoverService } from 'src/common/data-access-layer/repositories/interfaces/data-remover.interface';
import { IDataWriterService } from 'src/common/data-access-layer/repositories/interfaces/data-writer.interface';
import { ScriptEntity } from 'src/wfdefinition/entities/data-entities/script.data.entity';

export abstract class IScriptRepositoryService
  implements
    IDataReaderService<ScriptEntity>,
    IDataWriterService<ScriptEntity>,
    IDataRemoverService
{
  abstract findAll(): Promise<ScriptEntity[]>;
  abstract find(id: string): Promise<ScriptEntity>;
  abstract findByFilter(filter: any): Promise<ScriptEntity[]>;
  abstract create(entity: ScriptEntity): Promise<ScriptEntity>;
  abstract update(entity: Partial<ScriptEntity>): Promise<ScriptEntity>;
  abstract delete(id: string);
}
