import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ type: Types.ObjectId, ref: 'Chat' })
  chat: Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
