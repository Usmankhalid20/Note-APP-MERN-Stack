// import React from "react";
// import { Link } from "react-router-dom";
// import  { useAuth }  from "../Context/ContextProvider";

// const Navbar = ({ setQuery }) => {
//   const { user, logout } = useAuth();
//   return (
//     <>
//       <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
//         <div className="text-xl font-bold">
//           <Link to="/">NoteApp</Link>
//         </div>
//         <input
//           type="text"
//           className="bg-grey-800 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Search Notes"
//           onChange={(e) => setQuery(e.target.value)}
//         />

//         <div>
//           {!user ? (
//             <>
//               <Link to="/Login" className="bg-blue-500 px-4 py-2 rounded mr-4 cursor-pointer">  Login </Link>
//               <Link to="/register" className="bg-green-500 px-4 py-2 rounded mr-2 cursor-pointer"> Sign up </Link>
//             </>
//           ) : (
//             <>
//               <span className="mr-4">{ user.name }</span>
//               <button onClick={logout} className="bg-red-500 px-4 py-2 rounded cursor-pointer ">Logout</button>
//             </>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="text-xl font-bold">
            <Link to="/" className="hover:text-gray-300">NoteApp</Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded hover:bg-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu (hidden on desktop) */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:w-auto`}>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-4 md:mt-0">
            <input
              type="text"
              className="bg-gray-700 px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-300 w-full md:w-auto"
              placeholder="Search Notes"
              onChange={(e) => setQuery(e.target.value)}
            />

            {!user ? (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <Link 
                  to="/Login" 
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-center transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-center transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <span className="text-gray-300">Welcome, {user.name}</span>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
