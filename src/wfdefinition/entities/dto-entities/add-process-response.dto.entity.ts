import { ProcessVersionResponseDto } from './process-version-response.dto.entity';

export class AddProcessResponseDto {
  id: string;
  name: string;
  currentVersion: string;
  processVersions: ProcessVersionResponseDto[];
}
