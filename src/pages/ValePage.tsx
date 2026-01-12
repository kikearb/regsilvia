import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { PaintByNumbers } from "../components/PaintByNumbers";

export const ValePage = () => {
  return (
    <main className="min-h-screen w-full bg-white px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl font-bold">
              Como sabemos que descubrir un regalo puede ser estresante...
            </CardTitle>
            <CardDescription className="text-base">
              Te hemos preparado esta medida antiestrés, para que lo resuelvas
              mientras intentas descubrirlo.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <PaintByNumbers />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
