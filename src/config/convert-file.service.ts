import { Injectable } from '@nestjs/common';
import * as ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class ConvertFile {
  async Convert(path: Buffer): Promise<StreamableFile> {
    const gifStream = new PassThrough();

    return new Promise((resolve, reject) => {
      ffmpeg(path)
      .inputFormat('video/mp4')
        .outputOptions('-vf', 'fps=10,scale=320:-1:flags=lanczos')
        .toFormat('gif')
        .on('end', () => {
          resolve(new StreamableFile(gifStream));
        })
        .on('error', (err) => {
          reject(err);
        })
        .pipe(gifStream);
    });
  }
}