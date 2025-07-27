import React, { useEffect, useRef } from 'react';

const RaindropProgress = ({ progress }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      containerRef.current.appendChild(drop);

      // Clean up drops after they fall
      setTimeout(() => {
        drop.remove();
      }, 3000);
    }, 300); // Drop every 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-40 h-80 mt-6">
      {/* Pipe */}
      <div className="absolute top-0 left-1/2 w-4 h-6 bg-gray-500 -translate-x-1/2 rounded-t" />

      {/* Raindrop Container */}
      <div
        ref={containerRef}
        className="absolute top-6 left-1/2 w-1 h-full -translate-x-1/2 pointer-events-none overflow-hidden"
      />

      {/* Bucket */}
      <div className="absolute bottom-0 left-1/2 w-32 h-32 border-4 border-blue-800 rounded-b-xl -translate-x-1/2 overflow-hidden">
        {/* Water Fill */}
        <div
          className="absolute bottom-0 left-0 w-full bg-blue-400 transition-all duration-500"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Percentage Text */}
      <div className="absolute bottom-36 left-1/2 -translate-x-1/2 text-lg font-bold">
        {progress}%
      </div>

      {/* CSS for Raindrops */}
      <style>{`
        .raindrop {
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 12px;
          background-color: #60a5fa;
          border-radius: 50%;
          animation: fall 2s linear forwards;
        }

        @keyframes fall {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(300px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default RaindropProgress;
