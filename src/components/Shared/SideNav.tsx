import React from "react";

const SideNav = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const navItems = ["profile", "password", "orders", "manage orders", "logout"];
  return (
    <nav className="w-48 border-r border-gray-200 p-4">
      <ul>
        {navItems.map((tab) => (
          <li key={tab}>
            <button
              className={`block w-full text-left p-2 rounded ${
                activeTab === tab
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
