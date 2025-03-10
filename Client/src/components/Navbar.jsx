import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();  // Hook to get current location

  const handleNavbar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  // Function to check if the current path matches the link
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "rounded-md px-8 py-2 font-bold text-glow text-black bg-purple-200 bg-opacity-80 transition-color duration-1000 transform hover:scale-105 shadow-inner  shadow-[inset_0px_0px_10px_rgba(0,0,0,0.3),_inset_0px_10px_100px_rgba(255,255,255,0.3)]"
      : "rounded-md px-3 py-2 text-sm font-medium hover:bg-purple-200 hover:text-black transition-all duration-500 transform hover:scale-105";
  };


  return (
    <nav className="fixed  top-0 left-0 w-full z-50 backdrop-blur-sm  shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button - Only visible on small screens */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-[#DBE2EF] hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen ? "true" : "false"}
              onClick={handleNavbar}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="flex flex-1 items-center justify-between">
            {/* Logo/Title - Left on desktop */}
            <div className="flex-shrink-0">
              <Link to="/dashboard">
                <div className="w-1/3 ">
                  <img src="../../../public/logo-black.png" alt="SpendWise" />
                </div>
              </Link>
            </div>

            {/* Navigation Links - Centered on desktop */}
            <div className="hidden sm:block flex-1">
              <div className="flex  justify-center space-x-4">
                <Link
                  to="/dashboard"
                  className={`  rounded-md px-3 py-2 text-sm font-medium text-black ${getLinkClass("/dashboard")}`}
                  aria-current="page"
                >
                  Dashboard
                </Link>
                <Link
                  to="/income"
                  className={` rounded-md px-3 py-2 text-sm  font-medium text-black ${getLinkClass("/income")}`}
                >
                  Income
                </Link>
                <Link
                  to="/expense"
                  className={`rounded-md px-3 py-2 text-sm font-medium text-black ${getLinkClass("/expense")}`}
                >
                  Expense
                </Link>

              </div>
            </div>

            {/* Profile Menu - Right on desktop */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={handleProfileMenu}
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="../../public/profile.png"
                    alt="User"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Settings
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              to="/dashobard"
              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#DBE2EF] hover:text-black"
            >
              Dashboard
            </Link>
            <Link
              to="/income"
              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#DBE2EF] hover:text-black"
            >
              Income
            </Link>
            <Link
              to="/expense"
              className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-[#DBE2EF] hover:text-black"
            >
              Expense
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
