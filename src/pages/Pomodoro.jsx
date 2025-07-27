
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const Pomodoro = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const total = hours * 3600 + minutes * 60 + seconds;
    setTotalSeconds(total);
    setElapsed(0);
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (running && totalSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => {
          if (prev + 1 >= totalSeconds) {
            clearInterval(intervalRef.current);
            setRunning(false);
            triggerConfetti();
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, totalSeconds]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  const resetTimer = () => {
    setRunning(false);
    setElapsed(0);
  };

  const toggleTimer = () => {
    setRunning(!running);
  };

  const getRemainingTime = () => {
    const remaining = totalSeconds - elapsed;
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const fillPercentage = (elapsed / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 text-purple-900">
      <h1 className="text-4xl font-bold mb-4">Pomodoro Timer</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="w-20 p-2 rounded bg-white border"
          placeholder="Hrs"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          disabled={running}
        />
        <input
          type="number"
          className="w-20 p-2 rounded bg-white border"
          placeholder="Min"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          disabled={running}
        />
        <input
          type="number"
          className="w-20 p-2 rounded bg-white border"
          placeholder="Sec"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          disabled={running}
        />
      </div>

      <div className="text-5xl font-mono mb-4">{getRemainingTime()}</div>

      <div className="flex gap-4 mb-6">
        <button
          className="px-6 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={toggleTimer}
        >
          {running ? 'Pause' : 'Start'}
        </button>
        <button
          className="px-6 py-2 bg-gray-300 text-purple-800 rounded hover:bg-gray-400"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>

      <div className="relative w-[300px] h-[250px] border-4 border-purple-500 rounded-xl overflow-hidden bg-white shadow-lg">
        <div
          className="absolute bottom-0 left-0 w-full bg-purple-300 transition-all duration-500"
          style={{ height: `${fillPercentage}%` }}
        ></div>
        {/* Raindrops */}
        {running &&
          Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-5 bg-blue-300 rounded-full animate-fall"
              style={{
                left: `${30 + Math.random() * 40}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
      </div>

      {/* Raindrop animation */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(250px); opacity: 0; }
        }

        .animate-fall {
          animation: fall 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Pomodoro;
