import {
  Controller,
  Post,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { Multer } from 'multer'; // Import the Multer type

@Controller('chats/:chatId/files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @Param('chatId') chatId: string,
    @UploadedFile() file: Multer.File, // Use Multer.File type here
  ) {
    return this.fileService.uploadFile(chatId, file);
  }

  @Get(':fileId')
  async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
    const file = await this.fileService.downloadFile(fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    res.sendFile(this.fileService.getFilePath(file));
  }
}
