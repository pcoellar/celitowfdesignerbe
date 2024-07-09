import { ProcessVersionResponseDto } from 'src/wfdefinition/entities/dto-entities/process-version-response.dto.entity';

export abstract class IGetAllProcessFlowService {
  abstract execute(): Promise<ProcessVersionResponseDto[]>;
}
