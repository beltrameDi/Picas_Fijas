
export type GameState = 'menu' | 'settingUp' | 'playing' | 'gameOver' | 'highScores';

export type GameMode = 'single' | 'twoPlayer';

export interface Guess {
  guess: string;
  picas: number;
  fijas: number;
}

export interface Score {
  attempts: number;
  time: number;
  mode: GameMode;
  date: string;
}
