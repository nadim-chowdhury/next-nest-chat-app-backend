// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AuthModule } from './auth/auth.module';
// import { User, UserSchema } from './schemas/user.schema';
// import { ChatModule } from './chat/chat.module';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost/chat-app'),
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     AuthModule,
//     ChatModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FileModule } from './file/file.module';
import { MeetingModule } from './meeting/meeting.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/chat-app'),
    AuthModule,
    ChatModule,
    FileModule,
    MeetingModule,
  ],
})
export class AppModule {}
