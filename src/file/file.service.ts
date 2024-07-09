import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { File, FileDocument } from '../schemas/file.schema';
import { Express } from 'express';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private fileModel: Model<FileDocument>,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
  ) {}

  async uploadFile(chatId: string, file: Express.Multer.File): Promise<File> {
    const chat = await this.chatModel.findById(chatId);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    const newFile = new this.fileModel({
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      chat: chatId,
    });

    chat.files.push(newFile._id);
    await chat.save();
    return newFile.save();
  }

  async downloadFile(fileId: string): Promise<File> {
    const file = await this.fileModel.findById(fileId);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  getFilePath(file: File): string {
    return join(__dirname, '..', '..', file.path);
  }
}
