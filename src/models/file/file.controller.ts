import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { validatorFile } from './file.validator';
import { ConvertFile } from 'src/config/convert-file.service';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly convertFile: ConvertFile,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile(validatorFile) file: Express.Multer.File) {
    console.log('teste', file)
    const teste = await this.convertFile.Convert(file.buffer)
    return this.fileService.create(file);
  }
}
