import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValePage } from "@/pages/ValePage";
import "./index.css";

const VALE_ROUTES = new Set(["/", "/vale", "/gift"]);

export function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (VALE_ROUTES.has(pathname)) {
    return <ValePage />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Ruta no encontrada</CardTitle>
          <CardDescription>
            Usa el enlace para ir al mini juego.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <a href="/vale">Ir a /vale</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
