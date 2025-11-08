
import React from 'react';
import { GameMode } from '../types';
import Button from './common/Button';

interface MenuProps {
  onStartGame: (mode: GameMode) => void;
  onViewHighScores: () => void;
}

const Menu: React.FC<MenuProps> = ({ onStartGame, onViewHighScores }) => {
  return (
    <div className="flex flex-col items-center space-y-6 animate-fadeIn">
      <h1 className="text-5xl md:text-6xl font-bold text-white tracking-wider font-display drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]">
        Picas <span className="text-cyan-400">&</span> Fijas
      </h1>
      <p className="text-gray-400 text-center">The ultimate number guessing game.</p>
      <div className="w-full pt-4 space-y-4">
        <Button onClick={() => onStartGame('single')}>
          Single Player
        </Button>
        <Button onClick={() => onStartGame('twoPlayer')}>
          Two Players
        </Button>
        <Button onClick={onViewHighScores} variant="secondary">
          High Scores
        </Button>
      </div>
    </div>
  );
};

export default Menu;
