import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: [{ type: Object }] })
  messages: { sender: Types.ObjectId; content: string; timestamp: Date }[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);

 import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
 import { Document, Types } from 'mongoose';

 export type ChatDocument = Chat & Document;

 @Schema()
 export class Chat {
   @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
   participants: Types.ObjectId[];

   @Prop({
     type: [
       {
         sender: { type: Types.ObjectId, ref: 'User' },
         content: String,
         timestamp: Date,
       },
     ],
     default: [],
   })
   messages: { sender: Types.ObjectId; content: string; timestamp: Date }[];
 }

 export const ChatSchema = SchemaFactory.createForClass(Chat);

 import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
 import { Document, Types } from 'mongoose';

 export type ChatDocument = Chat & Document;

 @Schema()
 export class Chat {
   @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
   participants: Types.ObjectId[];

   @Prop({
     type: [
       {
         sender: { type: Types.ObjectId, ref: 'User' },
         content: String,
         timestamp: Date,
       },
     ],
     default: [],
   })
   messages: { sender: Types.ObjectId; content: string; timestamp: Date }[];

   @Prop({ type: [{ type: Types.ObjectId, ref: 'File' }], default: [] })
   files: Types.ObjectId[];
 }

 export const ChatSchema = SchemaFactory.createForClass(Chat);