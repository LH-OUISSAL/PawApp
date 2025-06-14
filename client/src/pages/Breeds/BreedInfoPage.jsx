import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreeds } from "../../redux/breeds/breedsSlice";

const breedGroups = [
  'Herding', 'Hound', 'Mixed', 'Non-Sporting',
  'Sporting', 'Terrier', 'Toy', 'Working'
];

const manualBreeds = [
  { name: "Labrador Retriever", breed_group: "Sporting", bred_for: "Water retrieving", life_span: "10 - 12 years", origin: "Canada", temperament: "Gentle, Intelligent, Family-friendly", reference_image_id: "B1uW7l5VX" },
  { name: "German Shepherd", breed_group: "Herding", bred_for: "Herding, Guard dog", life_span: "9 - 13 years", origin: "Germany", temperament: "Loyal, Confident, Obedient", reference_image_id: "SJyBfg5NX" },
  { name: "Bulldog", breed_group: "Non-Sporting", bred_for: "Bull baiting", life_span: "8 - 10 years", origin: "England", temperament: "Docile, Friendly, Willful", reference_image_id: "B1d5me547" },
  { name: "Poodle", breed_group: "Non-Sporting", bred_for: "Water retrieving", life_span: "12 - 15 years", origin: "Germany, France", temperament: "Active, Alert, Intelligent", reference_image_id: "SyRe4xcN7" },
  { name: "Beagle", breed_group: "Hound", bred_for: "Rabbit hunting", life_span: "12 - 15 years", origin: "England", temperament: "Curious, Merry, Friendly", reference_image_id: "Syd4xxqEm" },
  { name: "Rottweiler", breed_group: "Working", bred_for: "Cattle driving, guard dog", life_span: "8 - 10 years", origin: "Germany", temperament: "Loyal, Obedient, Protective", reference_image_id: "r1xXEgcNX" },
  { name: "Golden Retriever", breed_group: "Sporting", bred_for: "Retrieving", life_span: "10 - 12 years", origin: "Scotland", temperament: "Friendly, Intelligent, Reliable", reference_image_id: "H1cDZx9V7" },
  { name: "Boxer", breed_group: "Working", bred_for: "Guard dog, companion", life_span: "10 - 12 years", origin: "Germany", temperament: "Friendly, Energetic, Loyal", reference_image_id: "ry1kWe5VQ" },
  { name: "Siberian Husky", breed_group: "Working", bred_for: "Sled pulling", life_span: "12 - 14 years", origin: "Russia", temperament: "Friendly, Outgoing, Alert", reference_image_id: "S17ZilqNm" },
  { name: "Chihuahua", breed_group: "Toy", bred_for: "Companionship", life_span: "14 - 18 years", origin: "Mexico", temperament: "Alert, Devoted, Lively", reference_image_id: "B1pDZx9Nm" },
  { name: "Doberman Pinscher", breed_group: "Working", bred_for: "Guard dog", life_span: "10 - 13 years", origin: "Germany", temperament: "Alert, Loyal, Intelligent", reference_image_id: "HyL3bl94Q" },
  { name: "Shih Tzu", breed_group: "Toy", bred_for: "Companion", life_span: "10 - 18 years", origin: "China", temperament: "Loyal, Affectionate, Alert", reference_image_id: "BkrJjgcV7" }
];

export default function BreedInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const breedsInfo = useSelector((state) => state.breeds.data);
  const loading = useSelector((state) => state.breeds.loading);
  const error = useSelector((state) => state.breeds.error);

  const [filters, setFilters] = useState({
    breed_group: "",
    bred_for: "",
    origin: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (breedsInfo.length === 0) {
      dispatch(fetchBreeds());
    }
  }, [dispatch, breedsInfo.length]);

  const applyFilters = (breeds) =>
    breeds.filter((breed) => {
      const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGroup = !filters.breed_group || (breed.breed_group && breed.breed_group.toLowerCase() === filters.breed_group.toLowerCase());
      const matchesBredFor = !filters.bred_for || (breed.bred_for && breed.bred_for.toLowerCase().includes(filters.bred_for.toLowerCase()));
      const matchesOrigin = !filters.origin || (breed.origin && breed.origin.toLowerCase().includes(filters.origin.toLowerCase()));
      return matchesSearch && matchesGroup && matchesBredFor && matchesOrigin;
    });

  const removeFilter = (key) => {
    setFilters({ ...filters, [key]: "" });
  };

  const renderBreedCards = (breeds) =>
    breeds.map((breed, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition hover:-translate-y-1 border border-neutral-200 space-y-3"
      >
        <img
          src={
            breed.imageUrl ||
            (breed.reference_image_id
              ? `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`
              : "https://via.placeholder.com/300")
          }
          alt={breed.name}
          className="w-full h-56 object-cover rounded-xl mx-auto shadow-md"
        />
        <h3 className="text-xl font-bold text-neutral-800 text-center">{breed.name}</h3>
        <ul className="text-sm space-y-1">
          <li><span className="text-neutral-500 font-medium">Group:</span> <span className="text-neutral-800">{breed.breed_group || "Unknown"}</span></li>
          <li><span className="text-neutral-500 font-medium">Bred for:</span> <span className="text-neutral-800">{breed.bred_for || "Unknown"}</span></li>
          <li><span className="text-neutral-500 font-medium">Life Span:</span> <span className="text-neutral-800">{breed.life_span || "Unknown"}</span></li>
          <li><span className="text-neutral-500 font-medium">Origin:</span> <span className="text-neutral-800">{breed.origin || "Unknown"}</span></li>
          <li><span className="text-neutral-500 font-medium">Temperament:</span> <span className="text-neutral-800">{breed.temperament || "Unknown"}</span></li>
        </ul>
        <button
          style={{
            backgroundColor: 'purple',
            height: '40px',
            width: '130px',
            borderRadius: '6px',
            color: 'white',
            fontWeight: 'bold'
          }}
          onClick={() => navigate(`/adoption-offers?search=${breed.name}`,{ state: { search: breed.name } })}
        >
          Adoption Offer
        </button>
      </div>
    ));

  const breedsToRender = error ? applyFilters(manualBreeds) : applyFilters(breedsInfo);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-neutral-700 drop-shadow-lg">
          Dog Breeds Directory
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 shadow-sm"
          />

          <select
            value={filters.breed_group}
            onChange={(e) => setFilters({ ...filters, breed_group: e.target.value })}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 shadow-sm"
          >
            <option value="">All Groups</option>
            {breedGroups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Bred for..."
            value={filters.bred_for}
            onChange={(e) => setFilters({ ...filters, bred_for: e.target.value })}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 shadow-sm"
          />

          <input
            type="text"
            placeholder="Origin"
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 shadow-sm"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {Object.entries(filters).map(
            ([key, value]) =>
              value && (
                <span
                  key={key}
                  onClick={() => removeFilter(key)}
                  className="bg-neutral-200 text-neutral-700 px-4 py-1 rounded-full cursor-pointer hover:bg-neutral-300"
                >
                  {key}: {value} &times;
                </span>
              )
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-lg text-gray-500">Loading...</p>
          ) : breedsToRender.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-400">No breeds found.</p>
          ) : (
            renderBreedCards(breedsToRender)
          )}
        </div>
      </div>
    </>
  );
}
