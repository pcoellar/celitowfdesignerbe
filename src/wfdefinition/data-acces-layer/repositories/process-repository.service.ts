import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProcessRepositoryService } from './interfaces/process-repository.interface';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';
import { AuditableFieldsManager } from 'src/common/business-logic-layer/services/audit/utils';

@Injectable()
export class ProcessRepositoryService implements IProcessRepositoryService {
  constructor(
    @InjectRepository(ProcessEntity)
    private readonly entityRepository: Repository<ProcessEntity>,
  ) {}

  async findAll(): Promise<ProcessEntity[]> {
    const entities: ProcessEntity[] = await this.entityRepository.find();
    return entities;
  }

  async findByFilter(filter: any): Promise<ProcessEntity[]> {
    try {
      return await this.entityRepository.find({ where: filter });
    } catch {
      throw new NotFoundException();
    }
  }

  async find(id: string): Promise<ProcessEntity> {
    try {
      return await this.entityRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundException();
    }
  }

  async create(entity: ProcessEntity): Promise<ProcessEntity> {
    const auditableFieldsManager = new AuditableFieldsManager();
    entity = auditableFieldsManager.IncludeAuditableFieldsOnCreate(entity);
    const data = this.entityRepository.create(entity);
    const result = await this.entityRepository.save(data);
    return result;
  }

  async update(entity: Partial<ProcessEntity>): Promise<ProcessEntity> {
    const auditableFieldsManager = new AuditableFieldsManager();
    entity = auditableFieldsManager.IncludeAuditableFieldsOnUpdate(entity);
    let entityToModify: ProcessEntity = await this.find(entity.id);
    if (!entityToModify) {
      throw new NotFoundException();
    }
    entityToModify = {
      ...entityToModify,
      ...entity,
    };
    const result: ProcessEntity =
      await this.entityRepository.save(entityToModify);
    return result;
  }
}
