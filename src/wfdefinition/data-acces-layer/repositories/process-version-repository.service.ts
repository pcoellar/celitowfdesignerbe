import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { IProcessVersionRepositoryService } from './interfaces/process-version-repository.interface';
import { ProcessVersionEntity } from 'src/wfdefinition/entities/data-entities/process-version.data.entity';
import { AuditableFieldsManager } from 'src/common/business-logic-layer/services/audit/utils';
import { NodeEntity } from 'src/wfdefinition/entities/data-entities/node.data.entity';
import { SequenceFlowEntity } from 'src/wfdefinition/entities/data-entities/sequence-flow.data.entity';
import { ProcessEntity } from 'src/wfdefinition/entities/data-entities/process.data.entity';

@Injectable()
export class ProcessVersionRepositoryService
  implements IProcessVersionRepositoryService
{
  constructor(
    @InjectRepository(ProcessVersionEntity)
    private readonly entityRepository: Repository<ProcessVersionEntity>,
    @InjectRepository(ProcessEntity)
    private readonly processRepository: Repository<ProcessEntity>,
  ) {}

  async findAll(relations?: string[]): Promise<ProcessVersionEntity[]> {
    const entities: ProcessVersionEntity[] = await this.entityRepository.find({
      relations: relations ?? [],
    });
    return entities;
  }

  async findByFilter(
    filter: any,
    relations?: string[],
  ): Promise<ProcessVersionEntity[]> {
    try {
      return await this.entityRepository.find({
        where: filter,
        relations: relations ?? [],
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async find(id: string, relations?: string[]): Promise<ProcessVersionEntity> {
    try {
      return await this.entityRepository.findOne({
        where: { id },
        relations: relations ?? [],
      });
    } catch {
      throw new NotFoundException();
    }
  }

  async create(entity: ProcessVersionEntity): Promise<ProcessVersionEntity> {
    const auditableFieldsManager = new AuditableFieldsManager();
    entity = auditableFieldsManager.IncludeAuditableFieldsOnCreate(entity);
    let result;
    await this.entityRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        if (entity.version > 1) {
          let processEntity = await this.processRepository.findOne({
            where: { id: entity.process.id },
          });
          processEntity.currentVersion = entity.id;
          processEntity =
            auditableFieldsManager.IncludeAuditableFieldsOnUpdate(
              processEntity,
            );
          await transactionalEntityManager.save(ProcessEntity, processEntity);
        }
        const data = transactionalEntityManager.create(
          ProcessVersionEntity,
          entity,
        );
        result = await transactionalEntityManager.save(
          ProcessVersionEntity,
          data,
        );
      },
    );
    return result;
  }

  async update(
    entity: Partial<ProcessVersionEntity>,
  ): Promise<ProcessVersionEntity> {
    const auditableFieldsManager = new AuditableFieldsManager();
    entity = auditableFieldsManager.IncludeAuditableFieldsOnUpdate(entity);

    let entityToModify: ProcessVersionEntity;

    try {
      entityToModify = await this.find(entity.id);
    } catch (error) {
      throw new NotFoundException();
    }

    if (!entityToModify) {
      throw new NotFoundException();
    }

    let result: ProcessVersionEntity;

    await this.entityRepository.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        await transactionalEntityManager.delete(NodeEntity, {
          processVersion: { id: entity.id },
        });
        await transactionalEntityManager.delete(SequenceFlowEntity, {
          processVersion: { id: entity.id },
        });

        entityToModify.nodes = null;
        entityToModify.sequenceFlows = null;

        entityToModify = {
          ...entityToModify,
          ...entity,
        };

        result = await transactionalEntityManager.save(
          ProcessVersionEntity,
          entityToModify,
        );
      },
    );

    return result;
  }
}
