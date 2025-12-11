'use client';

import { useState } from 'react';

// Define the type for the possible selected button values
type ButtonSelection = 'A' | 'B' | 'C' | 'D' | null;

export default function Home() {
  // 1. State Management: Tracks the currently selected button
  const [selectedButton, setSelectedButton] = useState<ButtonSelection>(null);

  // Define the labels for the four main buttons
  const buttons: ButtonSelection[] = ['A', 'B', 'C', 'D'];

  // Handler function when one of the main buttons is clicked
  const handleButtonClick = (buttonId: ButtonSelection) => {
    // If the button is already selected, deselect it (optional toggle behavior)
    if (selectedButton === buttonId) {
      setSelectedButton(null);
    } else {
      // Otherwise, set the new button as selected
      setSelectedButton(buttonId);
    }
  };

  // Handler function for the Reset button
  const handleReset = () => {
    setSelectedButton(null);
  };

  // Helper function to determine the dynamic classes based on selection
  const getButtonClasses = (buttonId: ButtonSelection) => {
    const baseClasses = 'text-white text-4xl font-bold py-12 transition-colors duration-200 ease-in-out w-full';

    if (selectedButton === buttonId) {
      // 2. Conditional Styling: Selected (Green background, White text)
      return `${baseClasses} bg-green-500 hover:bg-green-600`;
    } else {
      // 2. Conditional Styling: Not Selected (Gray background, White text)
      return `${baseClasses} bg-gray-500 hover:bg-gray-600`;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="flex flex-col space-y-4 w-full max-w-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Select One Option
        </h1>

        {/* --- 4 Big Buttons (A, B, C, D) --- */}
        <div className="grid grid-cols-2 gap-4">
          {buttons.map((buttonId) => (
            <button
              key={buttonId}
              onClick={() => handleButtonClick(buttonId)}
              // Apply dynamic classes
              className={getButtonClasses(buttonId)}
            >
              {buttonId}
            </button>
          ))}
        </div>

        {/* --- Selected Indicator (Optional) --- */}
        <div className="text-center mt-6 text-lg font-medium text-gray-700">
          Currently Selected: <span className="font-bold text-green-600">
            {selectedButton ? selectedButton : 'None'}
          </span>
        </div>

        {/* --- Reset Button --- */}
        <button
          onClick={handleReset}
          className="mt-4 text-white text-xl font-medium py-4 bg-red-500 hover:bg-red-600 transition-colors duration-200 ease-in-out"
        >
          Reset Selection
        </button>
      </div>
    </main>
  );
}