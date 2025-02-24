import React from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  wallet: string;
  winRate: number;
  stakedPool: number;
  totalWins: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, wallet: "0x7423...1F52", winRate: 78.5, stakedPool: 5.0, totalWins: 157 },
  { rank: 2, wallet: "0x9876...4E21", winRate: 75.2, stakedPool: 4.2, totalWins: 143 },
  { rank: 3, wallet: "0x3456...8A9B", winRate: 72.8, stakedPool: 3.8, totalWins: 138 },
  { rank: 4, wallet: "0x2345...7C89", winRate: 70.1, stakedPool: 3.5, totalWins: 129 },
  { rank: 5, wallet: "0x8765...2D34", winRate: 68.9, stakedPool: 3.0, totalWins: 125 },
  { rank: 6, wallet: "0x5432...9E87", winRate: 67.5, stakedPool: 2.8, totalWins: 120 },
  { rank: 7, wallet: "0x1234...5F67", winRate: 65.2, stakedPool: 2.5, totalWins: 118 },
  { rank: 8, wallet: "0x4321...6G78", winRate: 63.8, stakedPool: 2.2, totalWins: 115 },
  { rank: 9, wallet: "0x6789...3H45", winRate: 62.4, stakedPool: 2.0, totalWins: 112 },
  { rank: 10, wallet: "0x9876...1I23", winRate: 61.0, stakedPool: 1.8, totalWins: 109 },
];

function LeaderboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h1 className="text-3xl font-bold">Top Players</h1>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Wallet</th>
              <th className="px-6 py-4 text-right">Win Rate</th>
              <th className="px-6 py-4 text-right">Staked Pool</th>
              <th className="px-6 py-4 text-right">Total Wins</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => (
              <tr key={entry.rank} className="border-t border-gray-700 hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {entry.rank <= 3 && (
                      <span className={`text-2xl ${
                        entry.rank === 1 ? 'text-yellow-400' :
                        entry.rank === 2 ? 'text-gray-400' :
                        'text-amber-700'
                      }`}>
                        {entry.rank === 1 ? '👑' : entry.rank === 2 ? '🥈' : '🥉'}
                      </span>
                    )}
                    <span className={entry.rank <= 3 ? 'font-bold' : ''}>#{entry.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="bg-gray-900 px-2 py-1 rounded">{entry.wallet}</code>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`${entry.winRate >= 70 ? 'text-green-400' : ''}`}>
                    {entry.winRate}%
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-purple-400">{entry.stakedPool} SOL</span>
                </td>
                <td className="px-6 py-4 text-right">{entry.totalWins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderboardPage;