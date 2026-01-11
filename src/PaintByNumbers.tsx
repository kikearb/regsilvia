import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

// Define the correct pattern for a larger heart shape
const correctPattern = [
  [false, false, false, true, true, false, false, false, false, false],
  [false, false, true, true, true, true, false, false, false, false],
  [false, true, true, true, true, true, true, false, false, false],
  [true, true, true, true, true, true, true, true, false, false],
  [true, true, true, true, true, true, true, true, false, false],
  [false, true, true, true, true, true, true, false, false, false],
  [false, false, true, true, true, true, false, false, false, false],
  [false, false, false, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false],
];

interface PaintByNumbersProps {
  onComplete: () => void;
}

export function PaintByNumbers({ onComplete }: PaintByNumbersProps) {
  const [colored, setColored] = useState<boolean[]>(
    Array(TOTAL_CELLS).fill(false)
  );

  const toggleColor = (index: number) => {
    const newColored = [...colored];
    newColored[index] = !newColored[index];
    setColored(newColored);
  };

  const isComplete = () => {
    for (let i = 0; i < TOTAL_CELLS; i++) {
      const row = Math.floor(i / GRID_SIZE);
      const col = i % GRID_SIZE;
      if (correctPattern[row]?.[col] !== colored[i]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg md:text-2xl font-bold mb-4">
        Pinta el corazón por números
      </h2>
      <div className="grid grid-cols-10 gap-1 mb-4 max-w-full overflow-auto">
        {Array.from({ length: TOTAL_CELLS }, (_, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          const number = index + 1;
          return (
            <div
              key={index}
              className={`w-6 h-6 md:w-10 md:h-10 border border-gray-300 flex items-center justify-center cursor-pointer text-xs md:text-sm font-bold ${
                colored[index] ? "bg-red-500" : "bg-white"
              }`}
              onClick={() => toggleColor(index)}
            >
              {number}
            </div>
          );
        })}
      </div>
      {isComplete() && (
        <Button onClick={onComplete} className="mt-4">
          ¿Lista para el de verdad?
        </Button>
      )}
    </div>
  );
}
