import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/categoryModel.js';
import Item from './models/itemModel.js';
dotenv.config();
mongoose.set('strictQuery', false);
const uri = process.env.mongodbKey;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}
// const category1 = new Category({
//   name: 'hobby',
//   description: 'I am hobby category',
// });
// const item1 = new Item({
//   name: 'web developing',
//   description: 'I am a top tier hobby',
//   number: 1,
//   price: 111111,
//   category: category1,
// });
// const item2 = new Item({
//   name: 'resistance training',
//   description: 'I am a top tier hobby next to web developing',
//   number: 1,
//   price: 11111,
//   category: category1,
// });
// category1.save();
// item1.save();
// item2.save();
