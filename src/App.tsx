import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaintByNumbers } from "./PaintByNumbers";
import "./index.css";

type View = "landing" | "test" | "gift";

export function App() {
  const [currentView, setCurrentView] = useState<View>("landing");

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return (
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                ¡Hola Silvia!
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Tienes que superar una prueba para descubrir tu regalo especial.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={() => setCurrentView("test")}>
                Empezar la prueba
              </Button>
            </CardContent>
          </Card>
        );
      case "test":
        return (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <PaintByNumbers onComplete={() => setCurrentView("gift")} />
            </CardContent>
          </Card>
        );
      case "gift":
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                ¡Felicidades Silvia!
              </CardTitle>
              <CardDescription className="text-center text-lg">
                Has superado la prueba. Tu regalo es... ¡un abrazo virtual y
                mucho cariño para todos! 🎉❤️
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl">
                Espero que les haya gustado esta sorpresa. ¡Los quiero mucho a
                todos!
              </p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container p-8 text-center relative z-10 min-h-screen flex items-center justify-center">
      {renderView()}
    </div>
  );
}

export default App;
