import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import { File, FileDocument } from 'src/schema/file.schema';
import { Chat, ChatDocument } from 'src/schema/chat.schema';
import { Multer } from 'multer';
import { Types } from 'mongoose'; // Import Types for ObjectId

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) {}

  async uploadFile(chatId: string, file: Multer.File): Promise<File> {
    const chat = await this.chatModel.findById(chatId).exec();
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const newFile = new this.fileModel({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      chat: new Types.ObjectId(chatId), // Ensure chatId is treated as ObjectId
    });

    chat.files.push(newFile._id);
    await chat.save();
    return newFile.save();
  }

  async downloadFile(fileId: string): Promise<File> {
    const file = await this.fileModel.findById(fileId).exec();
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  getFilePath(file: File): string {
    return join(__dirname, '..', '..', file.path);
  }
}
