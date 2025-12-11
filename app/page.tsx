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
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  // Define the labels for the four main buttons
  const buttons: ButtonSelection[] = ['A', 'B', 'C', 'D'];

  // --- Handlers for ABCD Tab ---

  const handleButtonClick = (buttonId: ButtonSelection) => {
    setSelectedButton(prev => (prev === buttonId ? null : buttonId));
  };

  const handleReset = () => {
    setSelectedButton(null);
  };

  // Helper function to determine the dynamic classes based on selection
  const getButtonClasses = (buttonId: ButtonSelection) => {
    // Base classes for large buttons
    const baseClasses = 'text-white text-4xl font-bold py-12 transition-colors duration-200 ease-in-out w-full rounded-lg';

    if (selectedButton === buttonId) {
      // Selected: Green 
      return `${baseClasses} bg-green-500 hover:bg-green-400`;
    } else {
      // Not Selected: Dark Blue 
      return `${baseClasses} bg-blue-700 hover:bg-blue-600`;
    }
  };

  // --- Handlers for TEXT Tab ---

  const handleSubmitText = () => {
    setDisplayText(inputText);
    setInputText('');
  };

  // Helper function for tab button styling (Styled like the A, B, C, D options)
  const getTabClasses = (tabId: TabSelection) => {
    // Styling base: Dark background, border-gold, rounded
    const baseClasses = 'relative w-1/2 py-4 px-2 text-center text-xl font-medium transition-colors duration-200 cursor-pointer rounded-lg border-2';
    
    // Label styling (A, B, C, D label)
    const labelClasses = 'absolute -top-3 left-1/2 transform -translate-x-1/2 text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full border-2';

    if (activeTab === tabId) {
      // Active tab: Bright Gold border, Gold text, Gold label background
      return {
          tab: `${baseClasses} bg-gray-800 border-yellow-400 text-yellow-400`,
          label: `${labelClasses} bg-yellow-400 border-yellow-400 text-gray-900`
      };
    } else {
      // Inactive tab: Darker border, Gray text, Dark label background
      return {
          tab: `${baseClasses} bg-gray-900 border-gray-700 text-gray-400 hover:border-yellow-400`,
          label: `${labelClasses} bg-gray-700 border-gray-700 text-gray-400`
      };
    }
  };


  // --- Render Components based on Active Tab ---

  const renderContent = () => {
    if (activeTab === 'ABCD') {
      return (
        <div className="flex flex-col space-y-4 w-full pt-4">
          
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
            className="mt-4 text-gray-900 text-xl font-medium py-4 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200 ease-in-out rounded-lg"
          >
            Réinitialiser
          </button>
        </div>
      );
    } else if (activeTab === 'TEXT') {
      return (
        <div className="flex flex-col space-y-6 w-full pt-4">

          {/* --- Display Submitted Text --- */}
          <div className="text-center min-h-[5rem]">
            {displayText && (
              // Display Text: Green
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
            Confirmer
          </button>
        </div>
      );
    }
    return null; // Should not happen
  };

  // --- Main Component Structure ---

  // Get tab styles
  const tabABCD = getTabClasses('ABCD');
  const tabTEXT = getTabClasses('TEXT');

  return (
    // Main background: Dark Blue (bg-blue-950)
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-blue-950">
      <div className="flex flex-col w-full max-w-xl p-8 rounded-xl shadow-2xl bg-gray-900 border border-yellow-400/50">
        
        {/* --- 100% Logique Title Bar (Styled like the quiz bar) --- */}
        <div className="bg-gray-800 border-2 border-yellow-500 p-4 mb-8 rounded-lg shadow-xl relative">
            <h1 className="text-2xl font-extrabold text-center text-yellow-400 tracking-wider uppercase">
                100% Logique
            </h1>
            {/* You could add a style element like the 80% circle here if needed */}
        </div>
        
        {/* --- Tab Navigation (Styled like the A, B, C, D options) --- */}
        <div className="flex justify-between space-x-4 mb-4">
          
          {/* Option 1: ABCD */}
          <button
            onClick={() => setActiveTab('ABCD')}
            className={tabABCD.tab}
          >
            ABCD
          </button>
          
          {/* Option 2: TEXT */}
          <button
            onClick={() => setActiveTab('TEXT')}
            className={tabTEXT.tab}
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