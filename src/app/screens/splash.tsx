import { useEffect } from "react";
import { useNavigate } from "react-router";

const logoImage = new URL("../../assets/7ef9e6f1b12e2805bd264548da5a93835441e38b.png", import.meta.url).href;

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1E3A8A] rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <img 
          src={logoImage} 
          alt="ShadowTrace Logo" 
          className="w-80 h-80 object-contain drop-shadow-2xl" 
          onError={(e) => {
            console.error('Image failed to load:', logoImage);
            (e.target as HTMLImageElement).style.display = 'none'; 
          }}
        />
      </div>

      {/* Subtitle */}
      <p className="text-white/80 text-2xl mt-8 tracking-wide relative z-10">
        AI-Powered Insurance Fraud Detection
      </p>

      {/* Loading dots */}
      <div className="flex gap-3 mt-12 relative z-10">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-[#3B82F6] rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
