import React, { useEffect, useState } from "react";

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-500 to-blue-100">
      <img src="https://egeizyapi.com/images/logo.png" alt="Logo" className="mb-8 -mt-32" />

      <div className="relative w-64 h-4 bg-gray-300 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-4 text-white">{`${progress}%`}</p>
    </div>
  );
};

export default SplashScreen;
