import { ProcessRequestDto } from 'src/wfdefinition/entities/dto-entities/process-request.dto.entity';
import { ProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/process-response.dto.entity';

export abstract class IUpdateProcessHeaderService {
  abstract execute(
    processRequest: ProcessRequestDto,
  ): Promise<ProcessResponseDto>;
}
