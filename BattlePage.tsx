import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Choice, Result, HistoryEntry } from '../types';

const getCardImage = (choice: Choice) => {
  if (!choice) return null;
  const images = {
    rock: 'https://i.imghippo.com/files/sDF1476ykA.png',
    paper: 'https://i.imghippo.com/files/TpqE9167jmg.png',
    scissors: 'https://i.imghippo.com/files/bSL2593I.png'
  };
  return images[choice];
};

function BattlePage() {
  const { roomId } = useParams();
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [lastResult, setLastResult] = useState<Result>(null);
  const [clickedButton, setClickedButton] = useState<Choice>(null);
  const [currentBattle, setCurrentBattle] = useState<{ player: Choice; opponent: Choice }>({
    player: null,
    opponent: null
  });

  const determineWinner = (player: Choice, opponent: Choice): Result => {
    if (!player || !opponent) return null;
    if (player === opponent) return 'tie';
    if (
      (player === 'rock' && opponent === 'scissors') ||
      (player === 'paper' && opponent === 'rock') ||
      (player === 'scissors' && opponent === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handleChoice = (choice: Choice) => {
    setClickedButton(choice);
    const choices: Choice[] = ['rock', 'paper', 'scissors'];
    const opponentChoice = choices[Math.floor(Math.random() * choices.length)];
    
    setCurrentBattle({
      player: choice,
      opponent: opponentChoice
    });
    
    const result = determineWinner(choice, opponentChoice);

    if (result === 'win') setPlayerScore(prev => prev + 1);
    if (result === 'lose') setOpponentScore(prev => prev + 1);

    setHistory(prev => [...prev, {
      round: currentRound,
      playerChoice: choice,
      opponentChoice,
      result
    }]);

    setCurrentRound(prev => prev + 1);
    setLastResult(result);

    setTimeout(() => {
      setClickedButton(null);
    }, 1000);
  };

  const getResultClass = (result: Result) => {
    switch (result) {
      case 'win': return 'bg-green-800';
      case 'lose': return 'bg-red-800';
      case 'tie': return 'bg-yellow-800';
      default: return '';
    }
  };

  return (
    <div className="p-4">
      {/* Battle Info */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <span>Battle Against</span>
          <code className="bg-gray-800 px-2 py-1 rounded">0x8423...9F12</code>
          <span className="bg-purple-900 px-2 py-1 rounded">1.5 SOL Staked</span>
        </div>

        {/* Score */}
        <div className="flex justify-center items-center gap-8">
          <div className="text-4xl">{playerScore}</div>
          <div className="text-xl">VS</div>
          <div className="text-4xl">{opponentScore}</div>
        </div>

        <div className="mt-4">Round {currentRound}</div>
      </div>

      {/* Current Battle Display */}
      <div className="flex justify-center items-center gap-20 mb-12">
        <div className="text-center">
          <p className="mb-2">Your Choice</p>
          <div className="w-40 h-40 border-2 border-blue-400 rounded-lg overflow-hidden">
            {currentBattle.player ? (
              <img
                src={getCardImage(currentBattle.player)}
                alt={currentBattle.player}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">Choose below</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="text-4xl font-bold">VS</div>
        
        <div className="text-center">
          <p className="mb-2">Opponent's Choice</p>
          <div className="w-40 h-40 border-2 border-red-400 rounded-lg overflow-hidden">
            {currentBattle.opponent ? (
              <img
                src={getCardImage(currentBattle.opponent)}
                alt={currentBattle.opponent}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">Waiting...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="text-center mb-8">
        <div className="text-lg mb-4">Please choose your battle</div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleChoice('rock')}
            className="w-32 h-32 border-2 border-gray-600 rounded-lg hover:border-blue-400 transition-colors"
            disabled={clickedButton !== null}
          >
            <img
              src="https://i.imghippo.com/files/sDF1476ykA.png"
              alt="Rock"
              className={`w-full h-full object-cover rounded-lg transition-all duration-200 ${
                clickedButton === 'rock' ? 'grayscale' : ''
              }`}
            />
          </button>
          <button
            onClick={() => handleChoice('paper')}
            className="w-32 h-32 border-2 border-gray-600 rounded-lg hover:border-blue-400 transition-colors"
            disabled={clickedButton !== null}
          >
            <img
              src="https://i.imghippo.com/files/TpqE9167jmg.png"
              alt="Paper"
              className={`w-full h-full object-cover rounded-lg transition-all duration-200 ${
                clickedButton === 'paper' ? 'grayscale' : ''
              }`}
            />
          </button>
          <button
            onClick={() => handleChoice('scissors')}
            className="w-32 h-32 border-2 border-gray-600 rounded-lg hover:border-blue-400 transition-colors"
            disabled={clickedButton !== null}
          >
            <img
              src="https://i.imghippo.com/files/bSL2593I.png"
              alt="Scissors"
              className={`w-full h-full object-cover rounded-lg transition-all duration-200 ${
                clickedButton === 'scissors' ? 'grayscale' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Battle History */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl mb-4">Battle History</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Round</th>
              <th className="pb-2">Your Choice</th>
              <th className="pb-2">Opponent's Choice</th>
              <th className="pb-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">{entry.round}</td>
                <td className="py-2 capitalize">{entry.playerChoice}</td>
                <td className="py-2 capitalize">{entry.opponentChoice}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded ${getResultClass(entry.result)} capitalize`}>
                    {entry.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BattlePage;