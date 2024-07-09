import { ProcessEntity } from '../../data-entities/process.data.entity';
import { ProcessResponseDto } from '../process-response.dto.entity';

export class ProcessResponseParser {
  ParseToProcessResponseDto(process: ProcessEntity): ProcessResponseDto {
    const result: ProcessResponseDto = {
      id: process.id,
      name: process.name,
      currentVersion: process.currentVersion,
      createdDate: process.createdDate,
      lastModified: process.lastModified,
    };

    return result;
  }
}
