
import React from 'react';
import { Score } from '../types';
import Button from './common/Button';

interface GameOverProps {
  score: Score;
  secretNumber: string;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, secretNumber, onPlayAgain, onBackToMenu }) => {
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-fadeIn">
      <h2 className="text-4xl font-bold text-cyan-400 font-display">You Got It!</h2>
      <p className="text-lg text-white">The secret number was <span className="font-bold text-2xl tracking-widest font-mono text-green-400">{secretNumber}</span></p>
      
      <div className="flex justify-around w-full p-4 bg-gray-900/50 rounded-lg">
        <div>
            <p className="text-gray-400">Attempts</p>
            <p className="text-3xl font-bold text-white">{score.attempts}</p>
        </div>
        <div>
            <p className="text-gray-400">Time</p>
            <p className="text-3xl font-bold text-white">{formatTime(score.time)}</p>
        </div>
      </div>

      <div className="w-full pt-4 space-y-4">
        <Button onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button onClick={onBackToMenu} variant="secondary">
          Main Menu
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
