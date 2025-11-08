
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, GameMode, Score } from './types';
import Menu from './components/Menu';
import GameBoard from './components/GameBoard';
import HighScores from './components/HighScores';
import SetupTwoPlayer from './components/SetupTwoPlayer';
import GameOver from './components/GameOver';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('single');
  const [secretNumber, setSecretNumber] = useState<string>('');
  const [highScores, setHighScores] = useState<Score[]>([]);
  const [lastScore, setLastScore] = useState<Score | null>(null);

  useEffect(() => {
    try {
      const storedScores = localStorage.getItem('picasYFijasHighScores');
      if (storedScores) {
        setHighScores(JSON.parse(storedScores));
      }
    } catch (error) {
      console.error("Failed to load high scores from localStorage", error);
    }
  }, []);

  const handleStartGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    if (mode === 'single') {
      setGameState('playing');
    } else {
      setGameState('settingUp');
    }
  }, []);

  const handleSetSecretNumber = useCallback((number: string) => {
    setSecretNumber(number);
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((score: Score) => {
    setLastScore(score);
    const newHighScores = [...highScores, score]
      .sort((a, b) => {
        if (a.attempts !== b.attempts) {
          return a.attempts - b.attempts;
        }
        return a.time - b.time;
      })
      .slice(0, 10);
    
    setHighScores(newHighScores);
    try {
      localStorage.setItem('picasYFijasHighScores', JSON.stringify(newHighScores));
    } catch (error) {
      console.error("Failed to save high scores to localStorage", error);
    }
    
    setGameState('gameOver');
  }, [highScores]);

  const handleViewHighScores = useCallback(() => {
    setGameState('highScores');
  }, []);

  const handleBackToMenu = useCallback(() => {
    setGameState('menu');
    setSecretNumber('');
    setLastScore(null);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case 'menu':
        return <Menu onStartGame={handleStartGame} onViewHighScores={handleViewHighScores} />;
      case 'settingUp':
        return <SetupTwoPlayer onNumberSet={handleSetSecretNumber} onBack={handleBackToMenu} />;
      case 'playing':
        return <GameBoard mode={gameMode} secretNumber={secretNumber} onGameOver={handleGameOver} />;
      case 'gameOver':
        return lastScore && <GameOver score={lastScore} secretNumber={secretNumber} onPlayAgain={() => handleStartGame(gameMode)} onBackToMenu={handleBackToMenu} />;
      case 'highScores':
        return <HighScores scores={highScores} onBack={handleBackToMenu} />;
      default:
        return <Menu onStartGame={handleStartGame} onViewHighScores={handleViewHighScores} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-cyan-300 flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 border border-cyan-500/20 overflow-hidden">
        <div className="p-6 md:p-8">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
