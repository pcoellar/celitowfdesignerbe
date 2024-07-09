import { ProcessVersionResponseDto } from 'src/wfdefinition/entities/dto-entities/process-version-response.dto.entity';

export abstract class IUpdateProcessFlowService {
  abstract execute(
    processVersion: ProcessVersionResponseDto,
  ): Promise<ProcessVersionResponseDto>;
}
