import { ScriptResponseDto } from 'src/wfdefinition/entities/dto-entities/script-response.dto.entity';

export abstract class IGetAllScriptService {
  abstract execute(): Promise<ScriptResponseDto[]>;
}
