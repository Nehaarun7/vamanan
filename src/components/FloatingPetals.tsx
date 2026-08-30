import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const PETAL_EMOJIS = ['🌸', '🌼', '🪷', '🌺', '✨', '🌸', '🌼'];

export const FloatingPetals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 0.8 + Math.random() * 0.8,
      emoji: PETAL_EMOJIS[Math.floor(Math.random() * PETAL_EMOJIS.length)]
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {petals.map(petal => (
        <span
          key={petal.id}
          className="absolute petal select-none"
          style={{
            left: `${petal.x}%`,
            top: '-20px',
            fontSize: `${petal.size}rem`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`
          }}
        >
          {petal.emoji}
        </span>
      ))}
    </div>
  );
};
