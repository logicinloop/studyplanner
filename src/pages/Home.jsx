import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const quotes = [
    "Success doesn’t come from what you do occasionally. It comes from what you do consistently.",
    "The secret of getting ahead is getting started.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Your future is created by what you do today, not tomorrow.",
    "It’s not about having time. It’s about making time.",
    "The expert in anything was once a beginner.",
    "Discipline is doing what needs to be done, even if you don’t want to.",
    "Push yourself, because no one else is going to do it for you.",
    "Small steps every day lead to big results.",
    "Focus on being productive instead of busy."
  ];

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🎓 Student Planner</h1>
      <p className="text-lg max-w-xl mb-6 text-gray-600 dark:text-gray-300">
        Organize your academic life with ease. Track assignments, plan tasks, stay motivated, and boost your productivity with smart tools — all in one place.
      </p>

      <blockquote className="italic text-gray-500 dark:text-gray-400 mb-6">
        “{quote}”
      </blockquote>

      <Link
        to="/planner"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Home;
