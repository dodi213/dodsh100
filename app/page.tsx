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

  // NOTE: getTabClasses function removed as its functionality is now handled inline using btn-100

  // --- Handlers for TEXT Tab ---

  const handleSubmitText = () => {
    setDisplayText(inputText);
    setInputText('');
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
                {/* Text wrapped in <span> for ABCD buttons (Required by btn-100 structure if using btn-100)
                   However, since these buttons retain their specific colors, they still use getButtonClasses,
                   but if you wanted btn-100 style here, they would need <span> wrapper and btn-100 class.
                   We assume here you want to KEEP the Green/Blue color differentiation for A,B,C,D,
                   so we only apply btn-100 to the Command buttons (Reset/Confirm) and Tabs.
                   If you want the GOLD border on A,B,C,D, let me know!
                   For now, the Reset button is updated:
                */}
                <span>{buttonId}</span>
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
          {/* UPDATED: Uses btn-100 class and adds <span> wrapper */}
          <button
            onClick={handleReset}
            className="btn-100 mt-4 h-auto w-full py-4 text-xl font-medium"
          >
            <span>Réinitialiser</span>
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
          {/* UPDATED: Uses btn-100 class and adds <span> wrapper */}
          <button
            onClick={handleSubmitText}
            // Disable if input is empty
            disabled={!inputText.trim()}
            className={`btn-100 h-auto w-full py-4 text-xl font-medium
              ${!inputText.trim() ? 'opacity-65 cursor-not-allowed' : ''}`}
          >
            <span>Confirmer</span>
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
        
        {/* --- 100% Logique Title Bar (Styled like the quiz bar) --- */}
        <div className="bg-gray-800 border-2 border-yellow-500 p-4 mb-8 rounded-lg shadow-xl relative">
            <h1 className="text-2xl font-extrabold text-center text-yellow-400 tracking-wider uppercase">
                100% Logique
            </h1>
        </div>
        
        {/* --- Tab Navigation (Styled like the A, B, C, D options) --- */}
        <div className="flex justify-between space-x-4 mb-4">
          
          {/* Option 1: ABCD (UPDATED: Uses btn-100 class and custom styling) */}
          <button
            onClick={() => setActiveTab('ABCD')}
            // Apply btn-100 class and conditional 'active' class
            className={`btn-100 w-1/2 h-auto py-4 text-xl font-medium ${activeTab === 'ABCD' ? 'active-100' : ''}`}
          >
            {/* Label A: Retains complex custom styling */}
  
            <span>ABCD Selection</span>
          </button>
          
          {/* Option 2: TEXT (UPDATED: Uses btn-100 class and custom styling) */}
          <button
            onClick={() => setActiveTab('TEXT')}
            // Apply btn-100 class and conditional 'active' class
            className={`btn-100 w-1/2 h-auto py-4 text-xl font-medium ${activeTab === 'TEXT' ? 'active-100' : ''}`}
          >
            {/* Label B: Retains complex custom styling */}

            <span>Texte Affichage</span>
          </button>
          
        </div>

        {/* --- Tab Content --- */}
        {renderContent()}

      </div>
    </main>
  );
}