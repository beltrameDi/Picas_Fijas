
import React from 'react';
import { Score } from '../types';
import Button from './common/Button';

interface HighScoresProps {
  scores: Score[];
  onBack: () => void;
}

const HighScores: React.FC<HighScoresProps> = ({ scores, onBack }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-fadeIn w-full">
      <h2 className="text-4xl font-bold text-white font-display">High Scores</h2>
      
      <div className="w-full h-80 overflow-y-auto pr-2">
        {scores.length === 0 ? (
          <p className="text-gray-500 text-center pt-10">No scores yet. Be the first!</p>
        ) : (
          <ol className="space-y-3">
            {scores.map((score, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg border-l-4 border-cyan-500">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-cyan-400 w-8">{index + 1}.</span>
                  <div>
                    <p className="text-white">{score.attempts} attempts in {formatTime(score.time)}</p>
                    <p className="text-xs text-gray-400">{score.mode === 'single' ? 'Single Player' : 'Two Players'} - {new Date(score.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="w-full">
        <Button onClick={onBack} variant="secondary">
          Back to Menu
        </Button>
      </div>
    </div>
  );
};

export default HighScores;
