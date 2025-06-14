import mongoose from "mongoose";

const breedSchema = new mongoose.Schema({
  animal:{type:String,required:true},
  name: { type: String, required: true },
  origin: { type: String },
  weight: { type: String },
  height: { type: String },
  bred_for: { type: String },
  breed_group: { type: String },
  country_codes: [String],
  life_span: { type: String },
  temperament: { type: String },
  reference_image_id:{type:String}
});

const Breed = mongoose.model('Breed', breedSchema);
export default Breed


