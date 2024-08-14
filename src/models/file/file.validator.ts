import { HttpStatus, ParseFilePipeBuilder } from "@nestjs/common";

const SizeMB = 4 * 1024 * 1024
export const validatorFile = new ParseFilePipeBuilder()
    .addFileTypeValidator({
        fileType: 'mp4',
    })
    .addMaxSizeValidator({
        maxSize: SizeMB
    })
    .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })