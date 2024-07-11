import { ScriptRequestDto } from 'src/wfdefinition/entities/dto-entities/script-request.dto.entity';
import { ScriptResponseDto } from 'src/wfdefinition/entities/dto-entities/script-response.dto.entity';

export abstract class IAddScriptService {
  abstract execute(scriptRequest: ScriptRequestDto): Promise<ScriptResponseDto>;
}
