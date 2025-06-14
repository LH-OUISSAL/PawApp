import axios from "axios";

const API_KEYS = {
  dog: "live_QSH2YWSLtgPZfvOlw3LcuobgwpO3rh5S9wmb7z3lWkKj0ktXT2DJnyXca8RFCVE4",
  cat: "live_tBb2b5kwO6jmJ5brHF91HLY9zlszJnKeSPMdfWvxMqGdyD2kH1liLfus6L1yyYSl"
};

export default async function getImageUrl(type, imageId) {
  if (!imageId) return null;

  const url = `https://api.the${type}api.com/v1/images/${imageId}`;
  // console.log(`[getImageUrl] Fetching image metadata from: ${url}`);

  try {
    const response = await axios.get(url, {
      headers: {
        "x-api-key": API_KEYS[type]
      }
    });

    // console.log("[getImageUrl] Response data:", response.data);

    return response.data.url || null;
  } catch (error) {
    console.error(`[getImageUrl] Error fetching image ID ${imageId}:`, error.message);
    return null;
  }
}
