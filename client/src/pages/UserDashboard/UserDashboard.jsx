import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  PawPrint,
  CalendarCheck,
  List,
  LogOut,
  AlarmClock,
  PawPrintIcon
} from 'lucide-react';
import Header from '../../components/header/header';

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Utilisateur' };

  const [activeSection, setActiveSection] = useState('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <UserProfile />;
      case 'createPet':
        return <CreatePetProfile />;
      case 'myPets':
        return <PetList />;
      case 'mealPlan':
        return <MealPlanner />;
      case 'adopt' :
        return  <CreateAdoptionOffer/>

          case 'rappel':
        return <ReminderSection />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />

      <div className="flex flex-1 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-blue-100 p-6 space-y-4 shadow-md">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-4 tracking-wide">🐾 PawApp</h2>
          <SidebarButton
            icon={<User />} label="Mon Profil" section="profile"
            active={activeSection} onClick={() => setActiveSection('profile')}
          />
          <SidebarButton
            icon={<PawPrint />} label="Créer un profil animal" section="createPet"
            active={activeSection} onClick={() => setActiveSection('createPet')}
          />
          <SidebarButton
            icon={<List />} label="Mes animaux" section="myPets"
            active={activeSection} onClick={() => setActiveSection('myPets')}
          />
          {/* <SidebarButton
            icon={<CalendarCheck />} label="Planification des repas" section="mealPlan"
            active={activeSection} onClick={() => setActiveSection('mealPlan')}
          /> */}
          <SidebarButton
            icon={<AlarmClock />} label="Rappel Vaccins" section="rappel"
            active={activeSection} onClick={() => setActiveSection('rappel')}
          />
          <SidebarButton
            icon={<PawPrint />} label="Créer un offre" section="adopt"
            active={activeSection} onClick={() => setActiveSection('adopt')}
          />
          <SidebarButton
            icon={<LogOut />} label="Déconnexion" section="logout"
            active={activeSection} onClick={() => alert('Déconnexion')}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Bienvenue, <span className="text-blue-600">{user.name}</span>
          </h1>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}

function SidebarButton({ icon, label, section, active, onClick }) {
  const isActive = active === section;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 w-full px-5 py-3 rounded-xl transition font-bold text-m
        ${isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-800 hover:bg-gray-300 hover:text-white-700'
        }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

// --- Example Sections ---


 function CreatePetProfile() {
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profil de l'animal enregistré (simulé).");
    console.log("🐾 Données de l'animal :", petData);
  };

  const breedOptions = {
    chien: ['Berger Allemand', 'Labrador', 'Chihuahua', 'Bouledogue'],
    chat: ['Siamois', 'Persan', 'Maine Coon', 'Sphynx'],
    lapin: ['Bélier', 'Angora', 'Nain', 'Rex'],
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Créer un profil animal</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Nom de l'animal" name="name" value={petData.name} onChange={handleChange} />


        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Race</label>
          <select
            name="breed"
            value={petData.breed}
            onChange={handleChange}
            disabled={!petData.species}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          >
            <option value="">-- Sélectionner une race --</option>
            {breedOptions[petData.species]?.map((race, index) => (
              <option key={index} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>

        <Input label="Âge (en années)" name="age" type="number" value={petData.age} onChange={handleChange} />
        <Input label="Poids (kg)" name="weight" type="number" value={petData.weight} onChange={handleChange} />

 

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        required
      />
    </div>
  );
}



//PetList


 function PetList() {
  const [selectedPet, setSelectedPet] = useState(null);

  const pets = [
    { id: 1, name: 'Rex', weight: 12, age: 3, species: 'Chien' },
    { id: 2, name: 'Bella', weight: 8, age: 2, species: 'Chien' }
  ];

  return (
    <div className="p-6">
      {!selectedPet ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pets.map(pet => (
            <div
              key={pet.id}
              onClick={() => setSelectedPet(pet)}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
            >
              <h2 className="text-xl font-bold text-blue-700">{pet.name}</h2>
              <p className="text-gray-600">⚖️ {pet.weight} kg</p>
              <p className="text-gray-600">📅 {pet.age} ans</p>
              <p className="text-gray-600">🐾 {pet.species}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedPet(null)}
            className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-xl"
          >
            ⬅️ Retour à la liste
          </button>
          <PetDetails pet={selectedPet} />
        </div>
      )}
    </div>
  );
}

const dummyPlans = [
  { hour: '06:00', meal: 'Croquettes au poulet' },
  { hour: '10:00', meal: 'Friandises' },
  { hour: '18:00', meal: 'Riz + Viande blanche' }
];

function PetDetails({ pet }) {
  const [showPlanner, setShowPlanner] = useState(false);
  const [plans, setPlans] = useState(dummyPlans);
  const [newHour, setNewHour] = useState('');
  const [newMeal, setNewMeal] = useState('');

  const handleAddPlan = () => {
    if (!newHour || !newMeal) return;
    setPlans(prev => [...prev, { hour: newHour, meal: newMeal }]);
    setNewHour('');
    setNewMeal('');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-2">{pet.name}</h2>
      <p className="text-gray-600 mb-1">🐾 Espèce : {pet.species}</p>
      <p className="text-gray-600 mb-1">⚖️ Poids : {pet.weight} kg</p>
      <p className="text-gray-600 mb-4">📅 Âge : {pet.age} ans</p>

      <button
        onClick={() => setShowPlanner(!showPlanner)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
      >
        {showPlanner ? 'Fermer le planificateur' : 'Planifier un repas'}
      </button>

      {showPlanner && (
        <div className="space-y-4">
          {/* Liste des repas planifiés */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">🕒 Repas planifiés :</h3>
            {plans.length === 0 ? (
              <p className="text-gray-500">Aucune planification pour le moment.</p>
            ) : (
              <ul className="space-y-1">
                {plans
                  .sort((a, b) => a.hour.localeCompare(b.hour))
                  .map((plan, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-600 font-semibold">{plan.hour}</span>
                      <span>→ {plan.meal}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* Ajouter une nouvelle planification */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Ajouter un repas</h4>
            <div className="flex gap-2">
              <input
                type="time"
                value={newHour}
                onChange={e => setNewHour(e.target.value)}
                className="px-3 py-2 border rounded-xl"
              />
              <input
                type="text"
                placeholder="Nom du repas"
                value={newMeal}
                onChange={e => setNewMeal(e.target.value)}
                className="px-3 py-2 border rounded-xl flex-1"
              />
              <button
                onClick={handleAddPlan}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//MealPlaner
import { CalendarDays, UtensilsCrossed } from 'lucide-react';

function MealPlanner({ mealPlans, setMealPlans }) {
  const [selectedDate, setSelectedDate] = useState(getToday()); // fonction pour avoir la date du jour
  const [newMeal, setNewMeal] = useState({ time: '', meal: '' });

  const plansForDate = mealPlans[selectedDate] || [];

  const addMealPlan = () => {
    if (!newMeal.time || !newMeal.meal) return;

    const newEntry = {
      id: Date.now(), // id simple
      ...newMeal,
    };

    setMealPlans(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEntry],
    }));

    setNewMeal({ time: '', meal: '' });
  };

  const removeMealPlan = (id) => {
    setMealPlans(prev => ({
      ...prev,
      [selectedDate]: prev[selectedDate].filter(plan => plan.id !== id),
    }));
  };

  return (
    <div>
      <input 
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
      />

      <ul>
        {plansForDate.map(plan => (
          <li key={plan.id}>
            {plan.time} - {plan.meal}
            <button onClick={() => removeMealPlan(plan.id)}>❌</button>
          </li>
        ))}
      </ul>

      <input
        type="time"
        value={newMeal.time}
        onChange={e => setNewMeal({...newMeal, time: e.target.value})}
      />
      <input
        type="text"
        placeholder="Repas"
        value={newMeal.meal}
        onChange={e => setNewMeal({...newMeal, meal: e.target.value})}
      />
      <button onClick={addMealPlan}>Ajouter</button>

      {/* Ici tu pourrais ajouter un bouton "Copier vers plusieurs jours" */}
    </div>
  );
}


function ReminderSection() {
  const [reminders, setReminders] = useState([
    {
      petName: 'Rex',
      dateTime: '2025-06-15T09:00',
      description: 'Vaccin rage',
    },
  ]);

  const [newReminder, setNewReminder] = useState({
    petName: '',
    dateTime: '',
    description: '',
  });

  const handleAddReminder = () => {
    if (!newReminder.petName || !newReminder.dateTime) {
      alert('Merci de remplir le nom de l’animal et la date/heure');
      return;
    }
    setReminders(prev => [...prev, newReminder]);
    setNewReminder({ petName: '', dateTime: '', description: '' });
  };

  const handleDelete = (index) => {
    setReminders(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Rappels de Vaccins</h2>

      {/* Formulaire d'ajout */}
      <div className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nom de l’animal"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newReminder.petName}
          onChange={e => setNewReminder({ ...newReminder, petName: e.target.value })}
        />
        <input
          type="datetime-local"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newReminder.dateTime}
          onChange={e => setNewReminder({ ...newReminder, dateTime: e.target.value })}
        />
        <textarea
          placeholder="Description (ex: rappel vaccin rage)"
          className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          value={newReminder.description}
          onChange={e => setNewReminder({ ...newReminder, description: e.target.value })}
        />
        <button
          onClick={handleAddReminder}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter un rappel
        </button>
      </div>

      {/* Liste des rappels */}
      <div>
        {reminders.length === 0 ? (
          <p className="text-gray-500 italic">Aucun rappel planifié.</p>
        ) : (
          reminders.map((r, i) => (
            <div key={i} className="mb-3 p-3 border rounded shadow-sm bg-blue-50 flex justify-between items-center">
              <div>
                <p className="font-semibold text-blue-900">{r.petName}</p>
                <p className="text-gray-700 text-sm">
                  {new Date(r.dateTime).toLocaleString()}
                </p>
                {r.description && <p className="text-gray-600 text-sm">{r.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-500 font-bold hover:text-red-700"
                title="Supprimer ce rappel"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CreateAdoptionOffer() {
  const [formData, setFormData] = useState({
    petName: '',
    age: '',
    weight: '',
    vaccines: '',
    city: '',
    address: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoyer formData au backend (FormData si image)
    console.log('Submitting Adoption Offer:', formData);
    alert("Offre d'adoption soumise !");
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg p-8 rounded-xl">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Créer une offre d’adoption</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Image upload */}
        <div>
          <label className="block font-semibold mb-1">Photo de l’animal</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && <img src={preview} alt="Preview" className="mt-3 h-40 object-cover rounded-lg border" />}
        </div>

        {/* Nom */}
        <div>
          <label className="block font-semibold mb-1">Nom de l’animal</label>
          <input
            type="text"
            name="petName"
            className="w-full border rounded px-3 py-2"
            value={formData.petName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Âge */}
        <div>
          <label className="block font-semibold mb-1">Âge (en mois ou années)</label>
          <input
            type="text"
            name="age"
            className="w-full border rounded px-3 py-2"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        {/* Poids */}
        <div>
          <label className="block font-semibold mb-1">Poids (kg)</label>
          <input
            type="number"
            name="weight"
            step="0.1"
            className="w-full border rounded px-3 py-2"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>

        {/* Vaccinations */}
        <div>
          <label className="block font-semibold mb-1">Vaccinations effectuées</label>
          <textarea
            name="vaccines"
            className="w-full border rounded px-3 py-2"
            rows="3"
            placeholder="Ex: Vaccin contre la rage, typhus..."
            value={formData.vaccines}
            onChange={handleChange}
          />
        </div>

        {/* Ville */}
        <div>
          <label className="block font-semibold mb-1">Ville</label>
          <input
            type="text"
            name="city"
            className="w-full border rounded px-3 py-2"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        {/* Adresse */}
        <div>
          <label className="block font-semibold mb-1">Adresse complète</label>
          <input
            type="text"
            name="address"
            className="w-full border rounded px-3 py-2"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Publier l’offre
          </button>
        </div>
      </form>
    </div>
  );
}

 function UserProfile() {
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    address: '123 Main St, City',
    profilePicture: '',
  });

  const [newProfilePic, setNewProfilePic] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!newProfilePic) {
      setPreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(newProfilePic);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [newProfilePic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await new Promise(res => setTimeout(res,700)); // fake delay
    if (newProfilePic) {
      const picUrl = preview;
      setUser(prev => ({ ...prev, profilePicture: picUrl }));
      setNewProfilePic(null);
      setPreview('');
    }
    alert('Profile updated!');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-2">
            {preview ? (
              <img src={preview} alt="New Profile Preview" className="object-cover w-full h-full" />
            ) : user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500 flex items-center justify-center h-full">No Photo</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProfilePic(e.target.files[0])}
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          disabled
          className="border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
        />
        <input
          type="text"
          placeholder="Address"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}