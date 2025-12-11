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
    const baseClasses = 'text-white text-4xl font-bold py-12 transition-colors duration-200 ease-in-out w-full';

    if (selectedButton === buttonId) {
      // Selected (Green background, White text)
      return `${baseClasses} bg-green-500 hover:bg-green-600`;
    } else {
      // Not Selected (Gray background, White text)
      return `${baseClasses} bg-gray-500 hover:bg-gray-600`;
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
      // Active tab: bold text, light border
      return `${baseClasses} text-indigo-700 border-b-4 border-indigo-700`;
    } else {
      // Inactive tab: gray text, hover effect
      return `${baseClasses} text-gray-500 hover:text-gray-700 border-b-4 border-transparent`;
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
          <div className="text-center mt-6 text-lg font-medium text-gray-700">
            Currently Selected: <span className="font-bold text-green-600">
              {/* FIX APPLIED HERE: Use the state variable selectedButton */}
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
      );
    } else if (activeTab === 'TEXT') {
      return (
        <div className="flex flex-col space-y-6 w-full">
          {/* --- Display Submitted Text --- */}
          <div className="text-center min-h-[5rem]">
            {displayText && (
              <p className="text-5xl font-extrabold text-green-600 animate-fadeIn">
                {displayText}
              </p>
            )}
          </div>

          {/* --- Input Field --- */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text here..."
            className="p-4 border-2 border-gray-300 focus:border-indigo-500 outline-none text-xl rounded-lg"
          />

          {/* --- Submit Button --- */}
          <button
            onClick={handleSubmitText}
            // Disable if input is empty
            disabled={!inputText.trim()}
            className={`text-white text-xl font-medium py-4 rounded-lg transition-colors duration-200 ease-in-out
              ${inputText.trim()
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Submit Text
          </button>
        </div>
      );
    }
    return null; // Should not happen
  };

  // --- Main Component Structure ---

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gray-100">
      <div className="flex flex-col w-full max-w-xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Interactive App
        </h1>

        {/* --- Tab Navigation --- */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('ABCD')}
            className={getTabClasses('ABCD')}
          >
            Tab One (A, B, C, D)
          </button>
          <button
            onClick={() => setActiveTab('TEXT')}
            className={getTabClasses('TEXT')}
          >
            Text Input Tab
          </button>
        </div>

        {/* --- Tab Content --- */}
        {renderContent()}

      </div>
    </main>
  );
}