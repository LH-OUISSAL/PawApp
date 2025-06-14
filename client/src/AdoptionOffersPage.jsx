import React, { useState, useEffect } from 'react';
import Header from './components/header/header';
import { useLocation } from "react-router-dom";


export default function AdoptionOffersPage() {
  const location = useLocation();
const initialSearch = location.state?.search || '';
const [searchTerm, setSearchTerm] = useState(initialSearch);


  const fakeData = [
    {
      id: 1,
      name: 'Bella',
      breed: 'Labrador Retriever',
      city: 'Casablanca',
      description: 'Chienne douce et joueuse, parfaite pour une famille.',
      image: 'OIP.webp'
    },
    {
      id: 2,
      name: 'Milo',
      breed: 'Siamese Cat',
      city: 'Rabat',
      description: 'Chat calme, aime les caresses et très propre.',
      image: '4.webp'
    },
    {
      id: 3,
      name: 'Rocky',
      breed: 'German Shepherd',
      city: 'Tanger',
      description: 'Chien fidèle, idéal pour la garde et la compagnie.',
      image: 'https://place-puppy.com/301x200'
    },
    {
      id: 4,
      name: 'Luna',
      breed: 'Persian Cat',
      city: 'Fès',
      description: 'Très affectueuse et parfaite pour la vie en appartement.',
      image: '6.webp'
    },
    {
      id: 5,
      name: 'Max',
      breed: 'Golden Retriever',
      city: 'Marrakech',
      description: 'Énergique, adore les enfants et les longues balades.',
      image: '5.webp'
    },
    {
      id: 6,
      name: 'Nala',
      breed: 'British Shorthair',
      city: 'Agadir',
      description: 'Calme, affectueuse, idéale pour les appartements.',
      image: '/2.webp'
    }
  ];

  const filteredOffers = fakeData.filter((offer) => {
    const value = searchTerm.toLowerCase();
    return (
      offer.name.toLowerCase().includes(value) ||
      offer.breed.toLowerCase().includes(value) ||
      offer.city.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
                <Header />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Offres d'adoption disponibles</h1>
      <input
        type="text"
        placeholder="Rechercher par nom, race ou ville"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <img src={offer.image} alt={offer.name} className="w-full h-80 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{offer.name}</h2>
              <p className="text-xl text-gray-700">Race : {offer.breed}</p>
              <p className="text-xl text-black-500">Ville : {offer.city}</p>
              <p className="mt-5 text-gray-600 text-l">{offer.description}</p>
              <button className="mt-4 bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-green-700 transition">
                Demander l'adoption
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}