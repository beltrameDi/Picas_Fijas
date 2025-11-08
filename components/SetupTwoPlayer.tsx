import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';

interface SetupTwoPlayerProps {
  onNumberSet: (number: string) => void;
  onBack: () => void;
}

const SetupTwoPlayer: React.FC<SetupTwoPlayerProps> = ({ onNumberSet, onBack }) => {
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value: string): string => {
    if (value.length !== 4) {
      return 'Number must be 4 digits long.';
    }
    if (!/^\d{4}$/.test(value)) {
      return 'Only digits are allowed.';
    }
    if (new Set(value).size !== 4) {
      return 'All digits must be unique.';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setNumber(value);
      if (error) {
        setError(validateInput(value));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateInput(number);
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      onNumberSet(number);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-fadeIn">
      <h2 className="text-3xl font-bold text-white font-display">Player 1: Set the Code</h2>
      <p className="text-gray-400 text-center">Enter a 4-digit number with unique digits. <br/> Don't let Player 2 see!</p>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          value={number}
          onChange={handleChange}
          maxLength={4}
          placeholder="••••"
          isError={!!error}
          autoFocus
        />
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <Button type="submit">
          Set Secret Number
        </Button>
        <Button onClick={onBack} variant="secondary">
          Back to Menu
        </Button>
      </form>
    </div>
  );
};

export default SetupTwoPlayer;