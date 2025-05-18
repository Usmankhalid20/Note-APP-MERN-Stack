import React from "react";
import { Link } from "react-router-dom";
import  { useAuth }  from "../Context/ContextProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">NoteApp</Link>
        </div>
        <input
          type="text"
          className="bg-grey-800 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search Notes"
        />

        <div>
          {!user ? (
            <>
              <Link to="/Login" className="bg-blue-500 px-4 py-2 rounded mr-4 cursor-pointer">  Login </Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded mr-2 cursor-pointer"> Sign up </Link>
            </>
          ) : (
            <>
              <span className="mr-4">{ user.name }</span>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded cursor-pointer ">Logout</button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
