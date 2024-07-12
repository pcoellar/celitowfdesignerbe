import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAddScriptService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/script/add-script.interface';
import { IDeleteScriptService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/script/delete-script.interface';
import { IGetAllScriptService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/script/get-all-script.interface';
import { IGetScriptService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/script/get-script.interface';
import { IUpdateScriptService } from 'src/wfdefinition/business-logic-layer/usecases/interfaces/script/update-script.interface';
import { ScriptEntity } from 'src/wfdefinition/entities/data-entities/script.data.entity';
import { ScriptRequestDto } from 'src/wfdefinition/entities/dto-entities/script-request.dto.entity';

@Controller('scripts')
@ApiTags('Scripts')
@ApiResponse({ status: 500, description: 'Internal error' })
export class ScriptController {
  constructor(
    private readonly addScriptUseCase: IAddScriptService,
    private readonly getScriptUseCase: IGetScriptService,
    private readonly updateScriptUseCase: IUpdateScriptService,
    private readonly getAllScriptUseCase: IGetAllScriptService,
    private readonly deleteScriptUseCase: IDeleteScriptService,
  ) {}

  @Get()
  async getAllScript() {
    const scriptes = await this.getAllScriptUseCase.execute();
    return scriptes;
  }

  @Get(':id')
  async getScript(@Param('id') id?: string) {
    const script = await this.getScriptUseCase.execute(id);
    return script;
  }

  @Put()
  async updateScript(@Body() script: ScriptEntity) {
    const updatedScript = await this.updateScriptUseCase.execute(script);
    return updatedScript;
  }

  @Post()
  async addScript(@Body() script: ScriptRequestDto) {
    const userCreated = await this.addScriptUseCase.execute(script);
    return userCreated;
  }

  @Delete(':id')
  async delete(@Param('id') id?: string) {
    await this.deleteScriptUseCase.execute(id);
  }
}
