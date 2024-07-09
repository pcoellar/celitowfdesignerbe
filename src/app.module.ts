import { Module } from '@nestjs/common';
import { WfdefinitionModule } from './wfdefinition/wfdefinition.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessEntity } from './wfdefinition/entities/data-entities/process.data.entity';
import { ProcessVersionEntity } from './wfdefinition/entities/data-entities/process-version.data.entity';
import { NodeEntity } from './wfdefinition/entities/data-entities/node.data.entity';
import { SequenceFlowEntity } from './wfdefinition/entities/data-entities/sequence-flow.data.entity';
import { ScriptEntity } from './wfdefinition/entities/data-entities/script.data.entity';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    WfdefinitionModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          ProcessEntity,
          ProcessVersionEntity,
          NodeEntity,
          SequenceFlowEntity,
          ScriptEntity,
        ],
        synchronize: true,
      }),
    }),
    CommonModule,
  ],
})
export class AppModule {}
