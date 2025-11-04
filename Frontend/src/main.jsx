import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';


import Navbar from './Navbar';
import Footer from './Footer';
import Sell from './Sell/Sell';
import SellShow from './Sell/SellShow';
import LostAndFound from './LostAndFound/LostAndFound';
import LostAndFoundShow from './LostAndFound/LostAndFoundShow';
import Hackathon from './Hackathon/Hackathon';
import HackathonShow from './Hackathon/HackathonShow';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import AboutPage from './About/AboutPage';
import HomePage from './Home/HomePage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hackathon" element={<Hackathon />} />
        <Route path="/hackathon/:id" element={<HackathonShow />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/sell/:id" element={<SellShow />} />
        <Route path="/lostandfound" element={<LostAndFound />} />
        <Route path="/lostandfound/:id" element={<LostAndFoundShow />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
