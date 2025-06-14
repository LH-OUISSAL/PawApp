import jwt from 'jsonwebtoken';
import express from 'express';
import Pet from '../models/PetModel.js';
import Breed from '../models/BreedModel.js';
import jwt from 'jsonwebtoken';
import authenticate from '../middlewares/auth.js';

const router = express.Router();



// Route to create a new pet
router.post('/newPet',  async (req, res) => {
    const { name, specie, breed, age, weight, height } = req.body;

    // Validate the received data
    if (!name || !specie || !breed) {
        return res.status(400).json({ message: 'Name, specie, and breed are required' });
    }

    try {
        // Fetch the origin from the Breed collection based on the breed selected
        const breedData = await Breed.findOne({ name: breed, specie: specie });

        // If no breed found, return an error
        if (!breedData) {
        return res.status(400).json({ message: 'Breed not found' });
        }

        // Extract origin from the breed data
        const { origin } = breedData;

        // Create a new pet with the fetched origin
        const newPet = new Pet({
        name,
        specie,
        breed,
        origin, // Automatically add the origin from the Breed model
        age,
        weight,
        height,
        userId: req.userId, // Assuming each pet belongs to a user
        });

        await newPet.save();

        res.status(201).json({ message: 'Pet created successfully', pet: newPet });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});









// Route to update an existing pet
router.put('/pets/:id', verifyToken, async (req, res) => {
    const { name, specie, breed, age, weight, height } = req.body;
    
    if (!name || !specie || !breed) {                                       // Validate received data
      return res.status(400).json({ message: 'Name, specie, and breed are required' });
    }
  
    try 
    {                               
      const pet = await Pet.findById(req.params.id);                      // Fetch the pet to be updated using the pet ID
      if (pet.userId.toString() !== req.userId) {                                 // Ensure the pet belongs to the logged-in user
        return res.status(403).json({ message: 'You are not authorized to update this pet' });
      }
  
      const breedData = await Breed.findOne({ name: breed, specie: specie });             // Fetch the origin from the Breed collection based on the breed selected
      if (!breedData) {                                   // If no breed found, return an error
        return res.status(400).json({ message: 'Breed not found' });
      }
      const { origin } = breedData;                   // Extract origin from the breed data
  
      // Update the pet's details
      pet.name = name || pet.name;
      pet.specie = specie || pet.specie;
      pet.breed = breed || pet.breed;
      pet.origin = origin; 
      pet.age = age || pet.age;
      pet.weight = weight || pet.weight;
      pet.height = height || pet.height;
      await pet.save();
      res.status(200).json({ message: 'Pet updated successfully', pet });

    } catch (err)
    {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Route to retrieve all pets of the authenticated user
router.get('/pets', authenticate, async (req, res) => {
    try 
    {
        const pets = await Pet.find({ userId: req.userId });          // Fetch pets that belong to the authenticated user
        if (pets.length === 0) {
        return res.status(404).json({ message: 'No pets found' });
        }
        res.json(pets);
    } 
    catch (err) 
    {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
    });


 // Route to delete a pet
 router.delete('/pets/:id', authenticate, async (req, res) => {
    const petId = req.params.id;

    try {
        const pet = await Pet.findOne({ _id: petId, userId: req.userId });         // Check if the pet exists and belongs to the authenticated user
        if (!pet) {
        return res.status(404).json({ message: 'Pet not found or unauthorized access' });
        }

        // Delete the pet
        await pet.remove();
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


   




