import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  name: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  price: Number,
  number: Number,
  // implicit id
});
// url is calculated by moongose _id
ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});
const Item = mongoose.model('Item', ItemSchema);
export default Item;
