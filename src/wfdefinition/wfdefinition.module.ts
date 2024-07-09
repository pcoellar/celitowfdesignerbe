import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './entities/data-entities/process.data.entity';
import { ProcessVersionEntity } from './entities/data-entities/process-version.data.entity';
import { NodeEntity } from './entities/data-entities/node.data.entity';
import { SequenceFlowEntity } from './entities/data-entities/sequence-flow.data.entity';
import { ScriptEntity } from './entities/data-entities/script.data.entity';
import { ProcessController } from './presentation-layer/controllers/process.controller';
import { ProcessVersionController } from './presentation-layer/controllers/process-version.controller';
import { IProcessRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/process-repository.interface';
import { ProcessRepositoryService } from './data-acces-layer/repositories/process-repository.service';
import { IProcessVersionRepositoryService } from './data-acces-layer/repositories/interfaces/process-version-repository.interface';
import { ProcessVersionRepositoryService } from './data-acces-layer/repositories/process-version-repository.service';
import { IGetProcessFlowService } from './business-logic-layer/usecases/interfaces/process-flow/get-process-flow.interface';
import { IUpdateProcessFlowService } from './business-logic-layer/usecases/interfaces/process-flow/update-process-flow.interface';
import { UpdateProcessFlowService } from './business-logic-layer/usecases/process-flow/update-process-flow.service';
import { IAddProcessService } from './business-logic-layer/usecases/interfaces/process-header/add-process.interface';
import { AddProcessService } from './business-logic-layer/usecases/process-header/add-process.service';
import { IGetProcessHeaderService } from './business-logic-layer/usecases/interfaces/process-header/get-process-header.interface';
import { GetProcessHeaderService } from './business-logic-layer/usecases/process-header/get-process-header.service';
import { UpdateProcessHeaderService } from './business-logic-layer/usecases/process-header/update-process-header.service';
import { IUpdateProcessHeaderService } from './business-logic-layer/usecases/interfaces/process-header/update-process-header.interface';
import { IGetAllProcessFlowService } from './business-logic-layer/usecases/interfaces/process-flow/get-all-process-flow.interface';
import { GetAllProcessFlowService } from './business-logic-layer/usecases/process-flow/get-all-process-flow.service';
import { IGetAllProcessHeaderService } from './business-logic-layer/usecases/interfaces/process-header/get-all-process-header.interface';
import { GetAllProcessHeaderService } from './business-logic-layer/usecases/process-header/get-all-process-header.service';
import { CommonModule } from 'src/common/common.module';
import { GetProcessFlowService } from './business-logic-layer/usecases/process-flow/get-process-flow.service';
import { IApiService } from 'src/common/business-logic-layer/services/api/interfaces/api.interface';
import { ApiService } from 'src/common/business-logic-layer/services/api/api.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProcessEntity,
      ProcessVersionEntity,
      NodeEntity,
      SequenceFlowEntity,
      ScriptEntity,
    ]),
    CommonModule,
  ],
  providers: [
    {
      provide: IProcessRepositoryService,
      useClass: ProcessRepositoryService,
    },
    {
      provide: IProcessVersionRepositoryService,
      useClass: ProcessVersionRepositoryService,
    },
    {
      provide: IGetProcessFlowService,
      useClass: GetProcessFlowService,
    },
    {
      provide: IUpdateProcessFlowService,
      useClass: UpdateProcessFlowService,
    },
    {
      provide: IAddProcessService,
      useClass: AddProcessService,
    },
    {
      provide: IGetProcessHeaderService,
      useClass: GetProcessHeaderService,
    },
    {
      provide: IUpdateProcessHeaderService,
      useClass: UpdateProcessHeaderService,
    },
    {
      provide: IGetAllProcessFlowService,
      useClass: GetAllProcessFlowService,
    },
    {
      provide: IGetAllProcessHeaderService,
      useClass: GetAllProcessHeaderService,
    },
    {
      provide: IApiService,
      useClass: ApiService,
    },
    ConfigService,
  ],
  controllers: [ProcessController, ProcessVersionController],
  exports: [],
})
export class WfdefinitionModule {}