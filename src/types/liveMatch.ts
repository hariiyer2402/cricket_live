export interface BatterStats {

  name: string;

  runs: number;

  balls: number;

  fours: number;

  sixes: number;

  strikeRate: number;

  out: boolean;
}

export interface BowlerStats {

  name: string;

  overs: number;

  maidens: number;

  runs: number;

  wickets: number;

  economy: number;
}

export interface LiveMatchData {

  id: string;

  team1: string;

  team2: string;

  battingTeam: string;

  bowlingTeam: string;

  score: number;

  wickets: number;

  overs: number;

  target: number;

  currentRR: number;

  requiredRR: number;

  status:
    | 'Upcoming'
    | 'Live'
    | 'Completed';

  striker: BatterStats;

  nonStriker: BatterStats;

  currentBowler: BowlerStats;

  batters: BatterStats[];

  bowlers: BowlerStats[];

  result?: string;
}