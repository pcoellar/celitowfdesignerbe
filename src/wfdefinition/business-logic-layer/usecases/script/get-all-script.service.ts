import { Injectable } from '@nestjs/common';
import { IScriptRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/script-repository.interface';
import { ScriptEntity } from 'src/wfdefinition/entities/data-entities/script.data.entity';
import { ScriptResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/script-response.dto.parse';
import { ScriptResponseDto } from 'src/wfdefinition/entities/dto-entities/script-response.dto.entity';
import { IGetAllScriptService } from '../interfaces/script/get-all-script.interface';

@Injectable()
export class GetAllScriptService implements IGetAllScriptService {
  constructor(
    private readonly scriptRepositoryService: IScriptRepositoryService,
  ) {}
  async execute(): Promise<ScriptResponseDto[]> {
    const scriptEntities: ScriptEntity[] =
      await this.scriptRepositoryService.findAll();
    const result: ScriptResponseDto[] = [];
    for (let i = 0; i < scriptEntities.length; i++) {
      const getScriptResponseParser = new ScriptResponseParser();
      const scriptResponseDto =
        getScriptResponseParser.ParseToScriptResponseDto(scriptEntities[i]);
      result.push(scriptResponseDto);
    }
    return result;
  }
}
