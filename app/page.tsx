'use client';

import { useState } from 'react';

// Define the type for the possible selected button values in the 'ABCD' tab
type ButtonSelection = 'A' | 'B' | 'C' | 'D' | null;

// Define the type for the tabs
type TabSelection = 'ABCD' | 'TEXT';

export default function Home() {
  // 1. Tab State: Tracks the currently active tab (default to 'ABCD')
  const [activeTab, setActiveTab] = useState<TabSelection>('ABCD');

  // 2. ABCD Tab State: Tracks the currently selected button in the 'ABCD' tab
  const [selectedButton, setSelectedButton] = useState<ButtonSelection>(null);

  // 3. TEXT Tab States:
  // Tracks the current value of the text input field
  const [inputText, setInputText] = useState('');
  // Tracks the submitted text to be displayed
  const [displayText, setDisplayText] = useState('');

  // Define the labels for the four main buttons
  const buttons: ButtonSelection[] = ['A', 'B', 'C', 'D'];

  // --- Handlers for ABCD Tab ---

  const handleButtonClick = (buttonId: ButtonSelection) => {
    // Toggle behavior
    setSelectedButton(prev => (prev === buttonId ? null : buttonId));
  };

  const handleReset = () => {
    setSelectedButton(null);
  };

  // Helper function to determine the dynamic classes based on selection
  const getButtonClasses = (buttonId: ButtonSelection) => {
    // Base classes for large buttons
    const baseClasses = 'text-white text-4xl font-bold py-12 transition-colors duration-200 ease-in-out w-full';

    if (selectedButton === buttonId) {
      // Selected: Green (Kept as requested)
      return `${baseClasses} bg-green-500 hover:bg-green-400`;
    } else {
      // Not Selected: Dark Blue (Theme color)
      return `${baseClasses} bg-blue-700 hover:bg-blue-600`;
    }
  };

  // --- Handlers for TEXT Tab ---

  const handleSubmitText = () => {
    // Set the submitted text and clear the input field
    setDisplayText(inputText);
    setInputText('');
  };

  // Helper function for tab button styling
  const getTabClasses = (tabId: TabSelection) => {
    const baseClasses = 'py-2 px-4 text-xl font-medium transition-colors duration-200';
    if (activeTab === tabId) {
      // Active tab: Gold text, Gold border
      return `${baseClasses} text-yellow-400 border-b-4 border-yellow-400`;
    } else {
      // Inactive tab: Gray text
      return `${baseClasses} text-gray-400 hover:text-yellow-400 border-b-4 border-transparent`;
    }
  };


  // --- Render Components based on Active Tab ---

  const renderContent = () => {
    if (activeTab === 'ABCD') {
      return (
        <div className="flex flex-col space-y-4 w-full">
          {/* --- 4 Big Buttons (A, B, C, D) --- */}
          <div className="grid grid-cols-2 gap-4">
            {buttons.map((buttonId) => (
              <button
                key={buttonId}
                onClick={() => handleButtonClick(buttonId)}
                className={getButtonClasses(buttonId)}
              >
                {buttonId}
              </button>
            ))}
          </div>

          {/* --- Selected Indicator --- */}
          <div className="text-center mt-6 text-lg font-medium text-gray-300">
            Votre sélection: <span className="font-bold text-green-500">
              {selectedButton ? selectedButton : 'Aucune'} 
            </span>
          </div>

          {/* --- Reset Button --- */}
          <button
            onClick={handleReset}
            // Reset button theme: Gold/Yellow with Dark text
            className="mt-4 text-gray-900 text-xl font-medium py-4 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 ease-in-out"
          >
            Réinitialiser
          </button>
        </div>
      );
    } else if (activeTab === 'TEXT') {
      return (
        <div className="flex flex-col space-y-6 w-full">
          {/* --- Display Submitted Text --- */}
          <div className="text-center min-h-[5rem]">
            {displayText && (
              // Display Text: Green (Kept as requested)
              <p className="text-5xl font-extrabold text-green-500">
                {displayText}
              </p>
            )}
          </div>

          {/* --- Input Field --- */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            // Placeholder in French
            placeholder="Écrivez votre texte ici..."
            // Input styling updated for dark theme
            className="p-4 border-2 border-gray-700 focus:border-yellow-400 outline-none text-xl rounded-lg bg-gray-800 text-white"
          />

          {/* --- Submit Button --- */}
          <button
            onClick={handleSubmitText}
            // Disable if input is empty
            disabled={!inputText.trim()}
            className={`text-gray-900 text-xl font-medium py-4 rounded-lg transition-colors duration-200 ease-in-out
              ${inputText.trim()
                // Submit button theme: Gold/Yellow
                ? 'bg-yellow-500 hover:bg-yellow-400'
                : 'bg-gray-600 cursor-not-allowed text-gray-400'
              }`}
          >
            Confimer
          </button>
        </div>
      );
    }
    return null; // Should not happen
  };

  // --- Main Component Structure ---

  return (
    // Main background: Dark Blue (bg-blue-950)
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-blue-950">
      <div className="flex flex-col w-full max-w-xl p-8 rounded-xl shadow-2xl bg-gray-900 border border-yellow-400/50">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          100% Logique
        </h1>

        {/* --- Tab Navigation --- */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            onClick={() => setActiveTab('ABCD')}
            className={getTabClasses('ABCD')}
          >
            ABCD
          </button>
          <button
            onClick={() => setActiveTab('TEXT')}
            className={getTabClasses('TEXT')}
          >
            Texte
          </button>
        </div>

        {/* --- Tab Content --- */}
        {renderContent()}

      </div>
    </main>
  );
}