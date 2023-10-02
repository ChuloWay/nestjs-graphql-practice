import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose, { Mongoose } from 'mongoose';

let mongooseInstance: Mongoose;

export const connectToDatabase = async (): Promise<MongooseModuleOptions> => {
  const uri = process.env.MONG0_URL;
  if (!mongooseInstance) {
    mongooseInstance = await mongoose.connect(uri, {});
  }

  return {
    uri,
  };
};
