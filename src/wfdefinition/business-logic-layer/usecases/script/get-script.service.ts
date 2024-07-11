import { Injectable } from '@nestjs/common';
import { IScriptRepositoryService } from 'src/wfdefinition/data-acces-layer/repositories/interfaces/script-repository.interface';
import { ScriptEntity } from 'src/wfdefinition/entities/data-entities/script.data.entity';
import { ScriptResponseDto } from 'src/wfdefinition/entities/dto-entities/script-response.dto.entity';
import { ScriptResponseParser } from 'src/wfdefinition/entities/dto-entities/parsers/script-response.dto.parse';
import { IGetScriptService } from '../interfaces/script/get-script.interface';

@Injectable()
export class GetScriptService implements IGetScriptService {
  constructor(
    private readonly scriptRepositoryService: IScriptRepositoryService,
  ) {}
  async execute(id: string): Promise<ScriptResponseDto> {
    const script: ScriptEntity = await this.scriptRepositoryService.find(id);
    const getScriptResponseParser = new ScriptResponseParser();
    const result: ScriptResponseDto =
      getScriptResponseParser.ParseToScriptResponseDto(script);
    return result;
  }
}
