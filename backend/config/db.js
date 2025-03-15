import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Atlas URI - हार्डकोडेड (अस्थायी समाधान)
    const mongoURI = 'mongodb+srv://suraj69941:sGffmFMhnzw0GFhe@cluster0.2qfx3.mongodb.net/ment_App?retryWrites=true&w=majority&appName=Cluster0';
    
    console.log('Connecting to MongoDB Atlas...');
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; 