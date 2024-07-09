import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatService.createChat(createChatDto);
  }

  @Get(':chatId')
  async getChat(@Param('chatId') chatId: string) {
    return this.chatService.getChat(chatId);
  }

  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(chatId, sendMessageDto);
  }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Chat } from '../schemas/chat.schema';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
    return this.chatService.createChat(createChatDto);
  }
}

 import {
   Controller,
   Post,
   Get,
   Body,
   UseGuards,
   Request,
 } from '@nestjs/common';
 import { ChatService } from './chat.service';
 import { CreateChatDto } from './dto/create-chat.dto';
 import { JwtAuthGuard } from '../auth/jwt-auth.guard';
 import { Chat } from '../schemas/chat.schema';

 @Controller('chats')
 export class ChatController {
   constructor(private readonly chatService: ChatService) {}

   @UseGuards(JwtAuthGuard)
   @Post()
   async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
     return this.chatService.createChat(createChatDto.participants);
   }

   @UseGuards(JwtAuthGuard)
   @Get()
   async getChats(@Request() req): Promise<Chat[]> {
     return this.chatService.getChats(req.user.userId);
   }
 }

  import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    UseGuards,
    Request,
  } from '@nestjs/common';
  import { ChatService } from './chat.service';
  import { CreateChatDto } from './dto/create-chat.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Chat } from '../schemas/chat.schema';

  @Controller('chats')
  export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
      return this.chatService.createChat(createChatDto.participants);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getChats(@Request() req): Promise<Chat[]> {
      return this.chatService.getChats(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':chatId')
    async getChatDetails(@Param('chatId') chatId: string): Promise<Chat> {
      return this.chatService.getChatDetails(chatId);
    }
  }

   import {
     Controller,
     Post,
     Get,
     Param,
     Body,
     UseGuards,
     Request,
   } from '@nestjs/common';
   import { ChatService } from './chat.service';
   import { CreateChatDto } from './dto/create-chat.dto';
   import { SendMessageDto } from './dto/send-message.dto';
   import { JwtAuthGuard } from '../auth/jwt-auth.guard';
   import { Chat } from '../schemas/chat.schema';

   @Controller('chats')
   export class ChatController {
     constructor(private readonly chatService: ChatService) {}

     @UseGuards(JwtAuthGuard)
     @Post()
     async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
       return this.chatService.createChat(createChatDto.participants);
     }

     @UseGuards(JwtAuthGuard)
     @Get()
     async getChats(@Request() req): Promise<Chat[]> {
       return this.chatService.getChats(req.user.userId);
     }

     @UseGuards(JwtAuthGuard)
     @Get(':chatId')
     async getChatDetails(@Param('chatId') chatId: string): Promise<Chat> {
       return this.chatService.getChatDetails(chatId);
     }

     @UseGuards(JwtAuthGuard)
     @Post(':chatId/messages')
     async sendMessage(
       @Param('chatId') chatId: string,
       @Request() req,
       @Body() sendMessageDto: SendMessageDto,
     ): Promise<Chat> {
       return this.chatService.sendMessage(
         chatId,
         req.user.userId,
         sendMessageDto,
       );
     }
   }