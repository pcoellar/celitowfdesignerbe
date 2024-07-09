import { ProcessEntity } from '../../data-entities/process.data.entity';
import { ProcessVersionEntity } from '../../data-entities/process-version.data.entity';
import { AddProcessResponseDto } from '../add-process-response.dto.entity';
import { ProcessVersionResponseDto } from '../process-version-response.dto.entity';
import { ProcessVersionResponseParser } from './process-version-response.dto.parser';

export class AddProcessResponseParser {
  ParseToAddProcessResponseDto(
    process: ProcessEntity,
    processVersion: ProcessVersionEntity,
  ): AddProcessResponseDto {
    const processVersionResponseParser = new ProcessVersionResponseParser();
    const processVersionResponse: ProcessVersionResponseDto =
      processVersionResponseParser.ParseToProcessVersionResponseDto(
        processVersion,
      );

    const processResponse: AddProcessResponseDto = {
      id: process.id,
      name: process.name,
      currentVersion: process.currentVersion,
      processVersions: [processVersionResponse],
    };

    return processResponse;
  }
}
