import mongoose, { Schema } from 'mongoose';
const SampleSchema = new Schema({
  name: String,
  age: Number,
});

const SampleModel = mongoose.model('SampleModel', SampleSchema);
export default SampleModel;
