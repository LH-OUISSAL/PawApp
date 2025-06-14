import express from "express";
import Breed from "../models/BreedModel.js";
import getImageUrl from "../utils/images.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { type } = req.body;

  try {
    const breeds = await Breed.find({ specie: type });

    const breedsWithImages = await Promise.all(
    breeds.map(async (breed) => {
    const breedObj = breed.toObject();
    const imageId = breed.reference_image_id;


    if (typeof imageId === 'string' && imageId.trim().length > 0) {
      const imageUrl = await getImageUrl(type, imageId);
      breedObj.imageUrl = imageUrl;
    } else {
      breedObj.imageUrl = null;
    }
    return breedObj;
  })
);


    res.json({ breeds: breedsWithImages });
  } catch (error) {
    console.error("Error fetching breeds:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
