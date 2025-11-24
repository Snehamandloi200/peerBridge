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
import AddPost from './AddPost/AddPost';
import SellItem from './AddPost/SellItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import SellEdit from './Sell/SellEdit';
import Dashboard from './Dashboard/Dashboard';
import LostAndFoundEdit from './LostAndFound/LostFoundEdit';
import HackathonEdit from './Hackathon/HackathonEdit';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path="/hackathon" element={<Hackathon />} />
        <Route path="/hackathon/:id" element={<HackathonShow />} />
        <Route path='/hackathonedit/:id' element={<HackathonEdit/>} />
        <Route path='/profile' element={<Dashboard/>} />
        <Route path="/sell" element={<Sell/>} />
        <Route path="/sell/:id" element={<SellShow />} />
        <Route path='/selledit/:id' element={<SellEdit />} />
        <Route path="/lostandfound" element={<LostAndFound />} />
        <Route path="/lostandfound/:id" element={<LostAndFoundShow />} />
        <Route path='/lostandfoundedit/:id' element={<LostAndFoundEdit/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
