// import axios from 'axios';
// import mongoose from 'mongoose';
// import Breed from '../models/BreedModel.js'

// const CAT_API_URL = `https://api.thecatapi.com/v1/breeds?api_key=YOUR_CAT_API_KEY`;

// mongoose.connect('mongodb://127.0.0.1:27017/PawApp')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// const fetchCats = async () => {
//   try {
//     console.log('Fetching cat breeds...');
//     const response = await axios.get(CAT_API_URL);
//     const catBreeds = response.data.map(breed => ({
//       animal:'cat',
//       name: breed.name,
//       origin: breed.origin || 'Unknown',
//       weight: breed.weight?.metric || 'Unknown',
//       height: breed.height?.metric || 'Unknown',
//       bred_for: breed.bred_for || 'Unknown',
//       breed_group: breed.breed_group || 'Unknown',
//       reference_image_id: breed.reference_image_id || '',
//       life_span: breed.life_span || 'Unknown',
//       temperament: breed.temperament || 'Unknown',
//     }));

//     await Promise.all(catBreeds.map(breed =>
//       Breed.updateOne(
//         { name: breed.name },
//         {
//           $set: { reference_image_id: breed.reference_image_id } 
//         }
//       )
//     ));

//     console.log('Cat breeds imported successfully ✅');
//   } catch (error) {
//     console.error('Error fetching cat breeds:', error.message);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// fetchCats();




import axios from 'axios';
import mongoose from 'mongoose';
import Breed from '../models/BreedModel.js';

const CAT_API_URL = `https://api.thecatapi.com/v1/breeds?api_key=YOUR_CAT_API_KEY`;

mongoose.connect('mongodb://127.0.0.1:27017/PawApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const fetchCats = async () => {
  try {
    console.log('Fetching cat breeds...');
    const response = await axios.get(CAT_API_URL);
    const catBreeds = response.data.map(breed => ({
      animal: 'cat',
      name: breed.name,
      origin: breed.origin || 'Unknown',
      weight: breed.weight?.metric || 'Unknown',
      height: breed.height?.metric || 'Unknown',
      bred_for: breed.bred_for || 'Unknown',
      breed_group: breed.breed_group || 'Unknown',
      reference_image_id: breed.reference_image_id || '', // Ensure this field is added
      life_span: breed.life_span || 'Unknown',
      temperament: breed.temperament || 'Unknown',
    }));

    // Update existing documents with reference_image_id if missing
    for (const breed of catBreeds) {
      await Breed.updateMany(
        { name: breed.name },
        { 
          $set: { reference_image_id: breed.reference_image_id || '' }
        }
      );
    }

    console.log('Cat breeds updated successfully ✅');
  } catch (error) {
    console.error('Error fetching cat breeds:', error.message);
  } finally {
    mongoose.disconnect();
  }
};

fetchCats();
