import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swords, Timer, Wallet } from 'lucide-react';
import type { PvPRoom } from '../types';

const mockRooms: PvPRoom[] = [
  {
    id: '1',
    wallet: '0x7423...1F52',
    stakedPool: 2.5,
    timestamp: '2 min ago',
    status: 'open'
  },
  {
    id: '2',
    wallet: '0x3456...8A9B',
    stakedPool: 1.8,
    timestamp: '5 min ago',
    status: 'open'
  },
  {
    id: '3',
    wallet: '0x9876...4E21',
    stakedPool: 3.2,
    timestamp: '7 min ago',
    status: 'open'
  },
  {
    id: '4',
    wallet: '0x2345...7C89',
    stakedPool: 1.5,
    timestamp: '10 min ago',
    status: 'open'
  }
];

function PvPRoomPage() {
  const navigate = useNavigate();

  const handleBattle = (room: PvPRoom) => {
    navigate(`/battle/${room.id}`);
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Swords className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold">Available Battles</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRooms.map((room) => (
          <div
            key={room.id}
            className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors border border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-gray-400" />
                  <code className="bg-gray-900 px-2 py-1 rounded text-sm">
                    {room.wallet}
                  </code>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Timer className="w-4 h-4" />
                  <span>{room.timestamp}</span>
                </div>
              </div>
              <div className="bg-purple-900/50 px-3 py-1 rounded-full text-purple-300 font-medium">
                {room.stakedPool} SOL
              </div>
            </div>

            <button
              onClick={() => handleBattle(room)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              Battle Now
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mx-auto">
          <Wallet className="w-5 h-5" />
          Create New Battle Room
        </button>
      </div>
    </div>
  );
}

export default PvPRoomPage;