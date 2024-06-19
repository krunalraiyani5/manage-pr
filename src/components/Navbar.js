"use client";
import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">MyNavbar</div>
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex space-x-4">
            <li>
              <a href="#home" className="text-white hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-white hover:text-gray-300">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-white hover:text-gray-300">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-gray-300">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-4 mt-10">
          <li>
            <a href="#home" className="text-white text-lg hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-white text-lg hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="text-white text-lg hover:text-gray-300"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white text-lg hover:text-gray-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
