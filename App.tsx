import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import BattlePage from './components/BattlePage';
import LeaderboardPage from './components/LeaderboardPage';
import PvPRoomPage from './components/PvPRoomPage';

function Header() {
  const location = useLocation();
  
  return (
    <header className="flex justify-between items-center mb-8 px-4 py-4">
      <div className="flex items-center gap-2">
        <Link to="/rooms">
          <img 
            src="https://i.imghippo.com/files/Ud8563OgQ.png" 
            alt="RPX Logo" 
            className="h-8"
          />
        </Link>
      </div>
      <nav className="flex gap-6">
        <Link 
          to="/rooms" 
          className={`hover:text-blue-400 transition-colors ${location.pathname === '/rooms' ? 'text-blue-400' : ''}`}
        >
          Battles
        </Link>
        <Link 
          to="/leaderboard" 
          className={`hover:text-blue-400 transition-colors ${location.pathname === '/leaderboard' ? 'text-blue-400' : ''}`}
        >
          Leaderboard
        </Link>
      </nav>
      <button className="bg-black px-4 py-2 rounded hover:bg-gray-900">
        Connect Wallet
      </button>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a192f] text-white">
        <Header />
        <Routes>
          <Route path="/" element={<PvPRoomPage />} />
          <Route path="/rooms" element={<PvPRoomPage />} />
          <Route path="/battle/:roomId" element={<BattlePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;