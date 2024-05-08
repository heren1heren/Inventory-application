import mongoose, { Schema } from 'mongoose';
const CategorySchema = new Schema({
  name: String,
  description: String,
});
CategorySchema.virtual('url').get(function () {
  return `/inventory/category/${this._id}`;
});

const Category = mongoose.model('Category', CategorySchema);
export default Category;
