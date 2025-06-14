import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PetAccountPage from './PetAccountPage';
import BreedInfoPage from './pages/Breeds/BreedInfoPage';
import AdoptionOffersPage from './AdoptionOffersPage';
import UserDashboard from './pages/UserDashboard/UserDashboard'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path='/user-dashboard' element={<UserDashboard />}   />
        <Route path="/pet-account" element={<PetAccountPage />} />
        <Route path="/breeds" element={<BreedInfoPage />} />
        <Route path="/adoption-offers" element={<AdoptionOffersPage />} />
      </Routes>
    </Router>
  );
}
