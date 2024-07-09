import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File, FileSchema } from '../schemas/file.schema';
import { Chat, ChatSchema } from '../schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
