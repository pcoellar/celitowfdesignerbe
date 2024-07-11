import { ScriptResponseDto } from 'src/wfdefinition/entities/dto-entities/script-response.dto.entity';

export abstract class IGetScriptService {
  abstract execute(id: string): Promise<ScriptResponseDto>;
}
