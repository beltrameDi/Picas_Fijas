import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameMode, Guess, Score } from '../types';
import Button from './common/Button';
import Input from './common/Input';

interface GameBoardProps {
  mode: GameMode;
  secretNumber: string;
  onGameOver: (score: Score) => void;
}

const generateSecretNumber = (): string => {
  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let secret = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    secret += digits.splice(randomIndex, 1)[0];
  }
  return secret;
};

const GameBoard: React.FC<GameBoardProps> = ({ mode, secretNumber: initialSecretNumber, onGameOver }) => {
  const [secret, setSecret] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  const guessInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === 'single') {
      setSecret(generateSecretNumber());
    } else {
      setSecret(initialSecretNumber);
    }
    setStartTime(Date.now());
    if (guessInputRef.current) {
        guessInputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, initialSecretNumber]);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime]);

  const calculatePicasFijas = useCallback((guess: string, secretNum: string): { picas: number; fijas: number } => {
    let fijas = 0;
    let picas = 0;
    const secretChars = secretNum.split('');
    const guessChars = guess.split('');

    for (let i = 0; i < 4; i++) {
      if (guessChars[i] === secretChars[i]) {
        fijas++;
      } else if (secretChars.includes(guessChars[i])) {
        picas++;
      }
    }
    return { picas, fijas };
  }, []);
  
  const validateInput = (value: string): string => {
    if (value.length !== 4) return 'Guess must be 4 digits long.';
    if (!/^\d{4}$/.test(value)) return 'Only digits are allowed.';
    if (new Set(value).size !== 4) return 'All digits must be unique.';
    return '';
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateInput(currentGuess);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    
    const { picas, fijas } = calculatePicasFijas(currentGuess, secret);
    const newGuesses = [...guesses, { guess: currentGuess, picas, fijas }];
    setGuesses(newGuesses);
    setCurrentGuess('');
    
    if (fijas === 4) {
      if (timerRef.current) clearInterval(timerRef.current);
      onGameOver({
        attempts: newGuesses.length,
        time: elapsedTime,
        mode,
        date: new Date().toISOString(),
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d{0,4}$/.test(value)) {
          setCurrentGuess(e.target.value);
          if(error) setError('');
      }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="w-full animate-fadeIn">
      <div className="flex justify-between items-center mb-4 text-white font-display">
        <div>Attempts: <span className="text-cyan-400">{guesses.length}</span></div>
        <div>Time: <span className="text-cyan-400">{formatTime(elapsedTime)}</span></div>
      </div>

      <div className="h-64 overflow-y-auto pr-2 bg-gray-900/50 rounded-lg mb-4">
        {guesses.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
                Your guess history will appear here.
            </div>
        ) : (
            <ul className="space-y-2">
            {[...guesses].reverse().map((g, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-800 p-3 rounded-md animate-slideIn">
                <span className="text-xl font-mono tracking-widest text-white">{g.guess}</span>
                <div className="flex gap-4 text-lg">
                    <span><span className="text-yellow-400 font-bold">{g.picas}</span> Picas</span>
                    <span><span className="text-green-400 font-bold">{g.fijas}</span> Fijas</span>
                </div>
                </li>
            ))}
            </ul>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Input 
            ref={guessInputRef}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            value={currentGuess}
            onChange={handleInputChange}
            placeholder="Enter guess"
            maxLength={4}
            isError={!!error}
            autoFocus
            />
            {error && <p className="text-red-400 text-center text-sm pt-2">{error}</p>}
        </div>
        <Button type="submit" className="w-full">Guess</Button>
      </form>
    </div>
  );
};

export default GameBoard;