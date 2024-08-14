import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ConvertFile } from 'src/config/convert-file.service';

@Module({
  controllers: [FileController],
  providers: [
    FileService,
    ConvertFile
  ],
})
export class FileModule {}
