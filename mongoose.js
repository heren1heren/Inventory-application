import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.set('strictQuery', false);
const uri = process.env.mongodbKey;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}

const aModelSchema = new Schema({
  name: String,
  age: Number,
});
