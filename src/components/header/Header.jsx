import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route == location.pathname) {
      return true;
    }
  }
  const auth = getAuth();
  const [pageState, setPageState] = useState("Sign In");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("sign-in");
      }
    });
  }, [auth]);

  return (
    <>
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <header className="w-[80%] mx-auto flex justify-between items-center">
          <div className="text-xl relative cursor-pointer" onClick={() => navigate("/")}>
            <span className="text-red-600 h-5 cursor-pointer ">AJ</span>States.com <span className="text-sm absolute right-[-10px] top-[-1.5px] cursor-pointer">&reg;</span>
          </div>
          <div>
            <ul className="flex space-x-10">
              <li
                className={`text-sm cursor-pointer py-3 border-b-[3px] border-b-transparent text-gray-400 font-semibold ${pathMatchRoute(
                  "/"
                )}`}
              >
                <NavLink to="/"> Home</NavLink>
              </li>
              <li
                className={`text-sm py-3 cursor-pointer border-b-[3px] border-b-transparent text-gray-400 font-semibold ${pathMatchRoute(
                  "/offers"
                )}`}
              >
                <NavLink to="/offers"> Offers</NavLink>
              </li>
              <li
                className={`text-sm cursor-pointer py-3 border-b-[3px] border-b-transparent text-gray-400 font-semibold ${
                  (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                  "border-b-red-500 text-black"
                }`}
              >
                <NavLink to={pageState}>{pageState}</NavLink>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
