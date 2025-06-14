import React, { useState } from 'react';
import { Search, Calendar, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/homepage/card';
import Header from '../../components/header/header';
import axiosInstance from '../../utils/axiosInstance';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real auth logic
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // or 'signup'
  const navigate = useNavigate();

  const handleUserAccountClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate('/pet-account');
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#fffefc] to-[#f0f4ff] min-h-screen font-sans text-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <Card
            title="Breeds Info"
            description="Discover dog and cat breeds, learn about traits and fun facts."
            icon={<Search className="w-7 h-7" strokeWidth={2.5} />}
            iconColor="#3B82F6"
            buttonLabel="Explore Breeds"
            onClick={() => navigate('/breeds')}
          />

          <Card
            title="User Account"
            description="Manage your pet’s records, appointments, and care routines."
            icon={<Calendar className="w-7 h-7" strokeWidth={2.5} />}
            iconColor="#22C55E"
            buttonLabel="Manage Pets"
            onClick={handleUserAccountClick}
          />

          <Card
            title="Adoption Offers"
            description="Browse adorable pets waiting for their forever home."
            icon={<Heart className="w-7 h-7" strokeWidth={2.5} />}
            iconColor="#EC4899"
            buttonLabel="View Offers"
            onClick={() => navigate('/adoption-offers')}
          />
        </div>

        {/* Why Choose Section */}
        <section className="mt-28 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose PawApp?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: '🐶', title: 'Smart Matching', desc: 'Find pets that fit your personality and space.' },
              { icon: '🧠', title: 'Care Reminders', desc: 'Track vet visits, vaccines, and grooming.' },
              { icon: '🌐', title: 'Local Offers', desc: 'Discover pets near you ready for adoption.' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Auth Modal */}
{showAuthModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Dimmed + blurred background (visible content underneath) */}
    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm transition-opacity duration-300"></div>

    {/* Modal content on top */}
    <div className="relative z-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
      <button
        onClick={() => setShowAuthModal(false)}
        className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-gray-800"
      >
        &times;
      </button>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setAuthMode('login')}
          className={`font-semibold px-4 py-2 border-b-2 ${
            authMode === 'login' ? 'border-blue-600' : 'border-transparent'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setAuthMode('signup')}
          className={`font-semibold px-4 py-2 border-b-2 ${
            authMode === 'signup' ? 'border-blue-600' : 'border-transparent'
          }`}
        >
          Sign Up
        </button>
      </div>

      {authMode === 'login' ? <LoginForm /> : <SignupForm />}
    </div>
  </div>
)}

      </main>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post('/api/users/login', { email, password });
    navigate('/user-dashboard');
  } catch (err) {
    console.error('Login error:', err);

    // Check if the error is because the server is unreachable
    if (err.code === 'ERR_NETWORK' || !err.response) {
      alert('No server connection — continuing in offline mode.');
      navigate('/user-dashboard'); // Simulate login success
    } else {
      alert('Login failed. Please check your credentials.');
    }
  }
};


  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
      <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />

      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-green-700 transition">Login</button>
    </form>
  );
}

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/users/signup', { name, email, password, address })
alert(res.data.message || 'Inscription réussie !');

    } catch (err) {
      console.error('Signup error:', err);
      alert('Server error during signup');
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
      <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
      <input type="text" placeholder="Address" required value={address} onChange={e => setAddress(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
      <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="border border-gray-300 rounded px-3 py-2" />

      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Create Account</button>
    </form>
  );
}

