export type Choice = 'rock' | 'paper' | 'scissors' | null;
export type Result = 'win' | 'lose' | 'tie' | null;

export interface HistoryEntry {
  round: number;
  playerChoice: Choice;
  opponentChoice: Choice;
  result: Result;
}

export interface PvPRoom {
  id: string;
  wallet: string;
  stakedPool: number;
  timestamp: string;
  status: 'open' | 'in-progress' | 'completed';
}