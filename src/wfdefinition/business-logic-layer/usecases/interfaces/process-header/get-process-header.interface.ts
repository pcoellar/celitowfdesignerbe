import { ProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/process-response.dto.entity';

export abstract class IGetProcessHeaderService {
  abstract execute(id: string): Promise<ProcessResponseDto>;
}
