import { useEffect, useState } from "react";

export const AnimatedSun = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none transition-all duration-700 ease-out z-0"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 w-40 h-40 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
        
        {/* Main sun */}
        <div className="relative w-24 h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full shadow-[0_0_80px_rgba(251,191,36,0.6)]">
          {/* Inner highlight */}
          <div className="absolute top-2 left-2 w-8 h-8 bg-amber-100/60 rounded-full blur-sm" />
        </div>
      </div>
    </div>
  );
};
