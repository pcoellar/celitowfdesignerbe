import { ProcessEntity } from '../../data-entities/process.data.entity';
import { ProcessRequestDto } from '../process-request.dto.entity';

export class ProcessRequestParser {
  ParseToProcessEntity(
    processRequest: ProcessRequestDto,
  ): Partial<ProcessEntity> {
    const process: Partial<ProcessEntity> = {
      id: processRequest.id,
      name: processRequest.name,
    };
    return process;
  }
}
