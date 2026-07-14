export interface TeamStats {
  id: string;
  name: string;
  flag: string;
  played: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  forRuns: number;
  forOvers: number;
  againstRuns: number;
  againstOvers: number;
  nrr: number;
}

export interface MatchResult {
  id: string;

  team1: string;
  team2: string;

  winner: string | 'nr';

  team1Runs: number;
  team1Wickets: number;
  team1Overs: number;

  team2Runs: number;
  team2Wickets: number;
  team2Overs: number;

  date: string;
}

export interface PlayoffMatch {
  id: string;
  stage: 'Qualifier 1' | 'Eliminator' | 'Qualifier 2' | 'Final';
  team1: string;
  team2: string;
  status: 'Upcoming' | 'Completed';
  winner?: string;
  result?: string;
}