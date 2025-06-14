import axios from "axios";

const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';
const fetchDogs = async () => {
  try {
    const response = await axios.get(DOG_API_URL);
    const dogBreeds = response.data;

    dogBreeds.forEach(breed => {
      console.log(`db.breeds.updateOne({ name: '${breed.name}' }, { $set: { reference_image_id: '${breed.reference_image_id}' } })`);
    });

  } catch (error) {
    console.error('Error fetching dog breeds:', error.message);
  }
};

fetchDogs();