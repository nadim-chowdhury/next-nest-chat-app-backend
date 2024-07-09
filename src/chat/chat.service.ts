import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = new this.chatModel({
      participants: createChatDto.participants,
      messages: [],
    });
    return newChat.save();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createChat(participants: string[]): Promise<Chat> {
    const newChat = new this.chatModel({
      participants: participants,
      messages: [],
    });
    return newChat.save();
  }

  async getChats(userId: string): Promise<Chat[]> {
    return this.chatModel
      .find({ participants: userId })
      .populate('participants', 'username')
      .exec();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createChat(participants: string[]): Promise<Chat> {
    const newChat = new this.chatModel({
      participants: participants,
      messages: [],
    });
    return newChat.save();
  }

  async getChats(userId: string): Promise<Chat[]> {
    return this.chatModel
      .find({ participants: userId })
      .populate('participants', 'username')
      .exec();
  }

  async getChatDetails(chatId: string): Promise<Chat> {
    return this.chatModel
      .findById(chatId)
      .populate('participants', 'username')
      .populate('messages.sender', 'username')
      .exec();
  }
}

 import { Injectable, NotFoundException } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
 import { Model } from 'mongoose';
 import { Chat, ChatDocument } from '../schemas/chat.schema';
 import { User, UserDocument } from '../schemas/user.schema';
 import { SendMessageDto } from './dto/send-message.dto';

 @Injectable()
 export class ChatService {
   constructor(
     @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
     @InjectModel(User.name) private userModel: Model<UserDocument>,
   ) {}

   async createChat(participants: string[]): Promise<Chat> {
     const newChat = new this.chatModel({
       participants: participants,
       messages: [],
     });
     return newChat.save();
   }

   async getChats(userId: string): Promise<Chat[]> {
     return this.chatModel
       .find({ participants: userId })
       .populate('participants', 'username')
       .exec();
   }

   async getChatDetails(chatId: string): Promise<Chat> {
     return this.chatModel
       .findById(chatId)
       .populate('participants', 'username')
       .populate('messages.sender', 'username')
       .exec();
   }

   async sendMessage(
     chatId: string,
     userId: string,
     sendMessageDto: SendMessageDto,
   ): Promise<Chat> {
     const chat = await this.chatModel.findById(chatId);
     if (!chat) {
       throw new NotFoundException('Chat not found');
     }

     chat.messages.push({
       sender: userId,
       content: sendMessageDto.content,
       timestamp: new Date(),
     });

     return chat.save();
   }
 }

 import { Injectable, NotFoundException } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
 import { Model } from 'mongoose';
 import { Chat, ChatDocument } from '../schemas/chat.schema';
 import { User, UserDocument } from '../schemas/user.schema';
 import { SendMessageDto } from './dto/send-message.dto';

 @Injectable()
 export class ChatService {
   constructor(
     @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
     @InjectModel(User.name) private userModel: Model<UserDocument>,
   ) {}

   async createChat(participants: string[]): Promise<Chat> {
     const newChat = new this.chatModel({
       participants: participants,
       messages: [],
     });
     return newChat.save();
   }

   async getChats(userId: string): Promise<Chat[]> {
     return this.chatModel
       .find({ participants: userId })
       .populate('participants', 'username')
       .exec();
   }

   async getChatDetails(chatId: string): Promise<Chat> {
     return this.chatModel
       .findById(chatId)
       .populate('participants', 'username')
       .populate('messages.sender', 'username')
       .exec();
   }

   async sendMessage(
     chatId: string,
     userId: string,
     sendMessageDto: SendMessageDto,
   ): Promise<Chat> {
     const chat = await this.chatModel.findById(chatId);
     if (!chat) {
       throw new NotFoundException('Chat not found');
     }

     chat.messages.push({
       sender: userId,
       content: sendMessageDto.content,
       timestamp: new Date(),
     });

     return chat.save();
   }
 }

  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Chat, ChatDocument } from '../schemas/chat.schema';
  import { User, UserDocument } from '../schemas/user.schema';
  import { SendMessageDto } from './dto/send-message.dto';

  @Injectable()
  export class ChatService {
    constructor(
      @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
      @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async createChat(participants: string[]): Promise<Chat> {
      const newChat = new this.chatModel({
        participants: participants,
        messages: [],
      });
      return newChat.save();
    }

    async getChats(userId: string): Promise<Chat[]> {
      return this.chatModel
        .find({ participants: userId })
        .populate('participants', 'username')
        .exec();
    }

    async getChatDetails(chatId: string): Promise<Chat> {
      return this.chatModel
        .findById(chatId)
        .populate('participants', 'username')
        .populate('messages.sender', 'username')
        .exec();
    }

    async sendMessage(
      chatId: string,
      userId: string,
      sendMessageDto: SendMessageDto,
    ): Promise<Chat> {
      const chat = await this.chatModel.findById(chatId);
      if (!chat) {
        throw new NotFoundException('Chat not found');
      }

      chat.messages.push({
        sender: userId,
        content: sendMessageDto.content,
        timestamp: new Date(),
      });

      return chat.save();
    }
  }

  import { Injectable, NotFoundException } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Chat, ChatDocument } from '../schemas/chat.schema';
  import { CreateGroupChatDto } from './dto/create-group-chat.dto';
  import { AddMembersDto } from './dto/add-members.dto';

  @Injectable()
  export class ChatService {
    constructor(
      @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    ) {}

    async createGroupChat(
      createGroupChatDto: CreateGroupChatDto,
    ): Promise<Chat> {
      const newGroupChat = new this.chatModel({
        ...createGroupChatDto,
        isGroupChat: true,
        messages: [],
      });
      return newGroupChat.save();
    }

    async addMembers(
      chatId: string,
      addMembersDto: AddMembersDto,
    ): Promise<Chat> {
      const chat = await this.chatModel.findById(chatId);
      if (!chat || !chat.isGroupChat) {
        throw new NotFoundException('Group chat not found');
      }
      chat.members.push(...addMembersDto.members);
      return chat.save();
    }
  }