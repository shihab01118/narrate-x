import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connectionString = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'narrate-x',
      autoIndex: true
    });
    console.log(`Connected to MongoDB: ${connectionString.connection.host}`);
  } catch (error) {
    console.log('Error connection to MongoDB: ', error.message);
    process.exit(1);
  }
};
