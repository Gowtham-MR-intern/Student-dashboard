import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

interface LinkItem {
  label: string;
  path: string;
}

const links: LinkItem[] = [
  { label: "StudyTrack", path: "/dashboard" },
  { label: "E-commerce", path: "/ecommerce" },
];

const Dropdown: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("Exercise");

  const handleSelect = (label: string) => {
    setSelectedLabel(label);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex rounded cursor-pointer px-4 py-2 text-gray-900 bg-gray-300 hover:bg-gray-50"
      >
        {selectedLabel}
        <ChevronDownIcon className="w-6 h-6 text-gray-400 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-10 w-56 bg-white shadow-lg rounded-md transition-opacity">
          <ul className="py-1">
            {links.map((link, index) => (
              <li key={index} className="p-2 text-black text-sm hover:bg-gray-200 cursor-pointer">
                <Link to={link.path} className="block w-full" onClick={() => handleSelect(link.label)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;