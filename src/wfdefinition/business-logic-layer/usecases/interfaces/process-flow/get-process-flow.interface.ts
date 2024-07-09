import { ProcessVersionResponseDto } from 'src/wfdefinition/entities/dto-entities/process-version-response.dto.entity';

export abstract class IGetProcessFlowService {
  abstract execute(id: string): Promise<ProcessVersionResponseDto>;
}
