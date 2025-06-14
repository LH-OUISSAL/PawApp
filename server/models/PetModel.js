import mongoose from 'mongoose';

// Define the schema for the Pet
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  
    },
    specie:{
        type:String,
        enum: ['dog', 'cat'],
        required:true
    },
    breed: {
      type: String,
      required: true,  
    },
    age: {
      type: Number,
      required: true, 
    },
    weight: {
      type: Number,
      required: true,  
    },
    height: {
      type: Number,
      required: true,  
    },
    lenght:{
        type:Number,
        required:true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',  
      required: true,  
    },
  },
  {
    timestamps: true,  
  }
);


const Pet = mongoose.model('Pet', petSchema);

export default Pet;
