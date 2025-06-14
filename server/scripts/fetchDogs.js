import axios from 'axios';
import mongoose from 'mongoose';
import Breed from '../models/BreedModel.js';

const DOG_API_URL = `https://api.thedogapi.com/v1/breeds?api_key=YOUR_DOG_API_KEY`;

mongoose.connect('mongodb://127.0.0.1:27017/PawApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const fetchDogs = async () => {
  try {
    console.log('Fetching dog breeds...');
    const response = await axios.get(DOG_API_URL);
    const dogBreeds = response.data.map(breed => ({
      animal:'dog',
      name: breed.name,
      origin: breed.origin || 'Unknown',
      weight: breed.weight?.metric || 'Unknown',
      height: breed.height?.metric || 'Unknown',
      bred_for: breed.bred_for || 'Unknown',
      breed_group: breed.breed_group || 'Unknown',
      country_codes: breed.country_codes || [],
      reference_image_id: breed.reference_image_id || '',
      life_span: breed.life_span || 'Unknown',
      temperament: breed.temperament || 'Unknown',
    }));

    await Promise.all(dogBreeds.map(breed =>
      Breed.updateOne(
        { name: breed.name },
        {
          $set: { reference_image_id: breed.reference_image_id } 
        }
      )
    ));

    console.log('Dog breeds imported successfully ✅');
  } catch (error) {
    console.error('Error fetching dog breeds:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

fetchDogs(); 