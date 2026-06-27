import React, { useState } from 'react';

/**
 * Tabs component supporting both uncontrolled (defaultTab) and controlled (activeTab + onChange) modes.
 *
 * @param {Object} props
 * @param {Array<{label: string, content: React.ReactNode}>} props.tabs - Tab definitions
 * @param {number} [props.defaultTab=0] - Initial active index (uncontrolled)
 * @param {number} [props.activeTab] - Controlled active index
 * @param {Function} [props.onChange] - Called with the new index when a tab is selected
 */
const Tabs = ({ tabs, defaultTab = 0, activeTab: controlledTab, onChange }) => {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const isControlled = controlledTab !== undefined;
  const activeTab = isControlled ? controlledTab : internalTab;

  const handleSelect = (index) => {
    if (!isControlled) setInternalTab(index);
    onChange?.(index);
  };

  return (
    <div className="w-full" role="tablist" aria-label="Tabs">
      <div className="flex border-b border-gray-700 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
            className={`py-2 px-4 transition-colors font-medium text-sm flex-1 sm:flex-none ${
              activeTab === index
                ? 'border-b-2 border-indigo-500 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => handleSelect(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`tab-panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
