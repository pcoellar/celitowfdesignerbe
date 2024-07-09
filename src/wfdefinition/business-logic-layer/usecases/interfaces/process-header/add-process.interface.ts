import { AddProcessRequestDto } from 'src/wfdefinition/entities/dto-entities/add-process-request.dto.entity';
import { AddProcessResponseDto } from 'src/wfdefinition/entities/dto-entities/add-process-response.dto.entity';

export abstract class IAddProcessService {
  abstract execute(
    processRequest: AddProcessRequestDto,
  ): Promise<AddProcessResponseDto>;
}
