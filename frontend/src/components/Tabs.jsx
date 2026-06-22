import React, { useState } from 'react';

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-700 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 transition-colors font-medium text-sm flex-1 sm:flex-none ${
              activeTab === index 
                ? 'border-b-2 border-indigo-500 text-white' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
