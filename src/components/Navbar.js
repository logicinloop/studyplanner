import { Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation();

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div
      className={`flex items-center justify-between px-6 py-4 shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-purple-200 text-purple-900"
      }`}
    >
      <div className="text-2xl font-bold flex items-center gap-2">
        📘 Student Planner
      </div>

      <div className="flex gap-6 items-center">
        {["/", "/dashboard", "/planner", "/assignments","/pomodoro"].map((path, i) => {
          const labels = ["Home", "Dashboard", "Planner", "Assignments","Pomodoro"];
          return (
            <Link
              key={path}
              to={path}
              className={`font-medium hover:underline ${
                location.pathname === path
                  ? "underline underline-offset-4 font-semibold"
                  : ""
              }`}
            >
              {labels[i]}
            </Link>
          );
        })}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-purple-300 dark:hover:bg-gray-700 transition duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
