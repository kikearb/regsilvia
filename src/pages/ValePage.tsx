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
              ¿Te han regalado algo?
            </CardTitle>
            <CardDescription className="text-base">
              ¡Ay! ¿Qué será?
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
