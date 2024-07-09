import { ProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/process-response.dto.entity';

export abstract class IGetAllProcessHeaderService {
  abstract execute(): Promise<ProcessResponseDto[]>;
}
