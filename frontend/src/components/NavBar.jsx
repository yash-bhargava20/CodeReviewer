import React, { useEffect, useState } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/Slice/authSlice";

const NavBar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <div className="bg-base-300 shadow-md px-5 py-3  ">
        <div className="max-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-ghost">CodeScan</h1>

          <div className="flex items-center gap-4">
            <button
              className="btn btn-ghost btn-circle"
              on
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5 " />
              )}
            </button>
            <button className="btn btn-ghost btn-circle" onClick={handleLogout}>
              <LogOut className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
