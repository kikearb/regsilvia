import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const goToPrueba = () => {
    navigate({ to: "/prueba" });
  };

  useEffect(() => {
    const firstTimer = window.setTimeout(() => setShowFirst(true), 2200);
    const secondTimer = window.setTimeout(() => setShowSecond(true), 3600);
    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(secondTimer);
    };
  }, []);

  return (
    <div className="home-bg relative flex min-h-screen w-full items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-4 text-center text-white">
        <p
          className={`text-base sm:text-lg ${
            showFirst ? "fade-in" : "opacity-0"
          }`}
          aria-hidden={!showFirst}
        >
          Un momento, ¿qué haces aquí?¿Cómo has descubierto esto?
        </p>
        <p
          className={`text-base sm:text-lg ${
            showSecond ? "fade-in" : "opacity-0"
          }`}
          aria-hidden={!showSecond}
        >
          Ya que lo has encontrado, te mereces un premio
        </p>
        <div
          className={showSecond ? "fade-in" : "opacity-0 pointer-events-none"}
          aria-hidden={!showSecond}
        >
          <Button onClick={goToPrueba} disabled={!showSecond}>
            ¡Vamos a ello!
          </Button>
        </div>
      </div>
    </div>
  );
};
