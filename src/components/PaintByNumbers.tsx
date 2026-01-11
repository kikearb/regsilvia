import React, { useRef, useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Painting } from "./Painting";

type UndoAction = {
  colorId: string;
};

const COLORS = [
  { num: 1, label: "1", value: "#2a2623" },
  { num: 2, label: "2", value: "#8a6d56" },
  { num: 3, label: "3", value: "#d9c5b2" },
  { num: 4, label: "4", value: "#a99886" },
  { num: 5, label: "5", value: "#544d45" },
  { num: 6, label: "6", value: "#5f757d" },
  { num: 7, label: "7", value: "#87b7cb" },
  { num: 8, label: "8", value: "#bfdaf3" },
  { num: 9, label: "9", value: "#98c2eb" },
  { num: 10, label: "10", value: "#79a8dc" },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function PaintByNumbers() {
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [paintedColorIds, setPaintedColorIds] = useState<string[]>([]);
  const [history, setHistory] = useState<UndoAction[]>([]);
  const revealButtonRef = useRef<HTMLButtonElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef({
    isDragging: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const isComplete =
    paintedColorIds.length > 0 && paintedColorIds.length === COLORS.length;

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.length === 0) {
        return prev;
      }

      const last = prev[prev.length - 1];
      setPaintedColorIds((current) =>
        current.filter((id) => id !== last?.colorId)
      );

      return prev.slice(0, -1);
    });
  };

  const handleReset = () => {
    setPaintedColorIds([]);
    setHistory([]);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as Element | null;
    if (target && target.closest("path")) {
      return;
    }
    dragState.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) {
      return;
    }
    if (dragState.current.pointerId !== event.pointerId) {
      return;
    }
    const deltaX = event.clientX - dragState.current.startX;
    const deltaY = event.clientY - dragState.current.startY;
    setPan({
      x: dragState.current.originX + deltaX,
      y: dragState.current.originY + deltaY,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.pointerId === event.pointerId) {
      dragState.current.isDragging = false;
    }
  };

  const zoomIn = () => setZoom((value) => clamp(value + 0.2, 0.6, 3));
  const zoomOut = () => setZoom((value) => clamp(value - 0.2, 0.6, 3));

  const handleFill = () => {
    const colorId = selectedNumber.toString();
    setPaintedColorIds((prev) => {
      if (prev.includes(colorId)) {
        return prev;
      }
      setHistory((historyPrev) => [...historyPrev, { colorId }]);
      return [...prev, colorId];
    });
  };

  useEffect(() => {
    if (!isComplete) {
      return;
    }
    revealButtonRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [isComplete]);

  return (
    <div className="mx-auto w-full flex flex-col max-w-5xl gap-4 sm:gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Como sabemos que descubrir un regalo puede ser estresante...
        </h2>
        <p className="text-sm text-muted-foreground">
          Te hemos preparado esta medida antiestrés, para que lo resuelvas
          mientras intentas descubrirlo.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-5 gap-2 sm:flex sm:flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color.num}
              type="button"
              className={`flex items-center justify-center gap-2 rounded-lg border px-2 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60 sm:px-3 sm:py-2 sm:text-sm ${
                selectedNumber === color.num
                  ? "border-foreground shadow-sm"
                  : "border-border"
              }`}
              onClick={() => setSelectedNumber(color.num)}
              disabled={paintedColorIds.includes(color.num.toString())}
            >
              <span
                className="h-4 w-4 rounded-full border border-black/10 sm:h-5 sm:w-5"
                style={{ backgroundColor: color.value }}
                aria-hidden="true"
              />
              <span className="inline">#{color.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleUndo}
            disabled={history.length === 0}
          >
            Undo
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={zoomOut}>
            -
          </Button>
          <span className="text-sm font-medium">
            Zoom {Math.round(zoom * 100)}%
          </span>
          <Button type="button" variant="outline" onClick={zoomIn}>
            +
          </Button>
        </div>
      </div>

      <div
        className="relative -mt-2 flex w-full items-center justify-center overflow-hidden sm:mt-0"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        <div
          className="inline-block transition-transform duration-150"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          <Painting
            currentColorId={`${selectedNumber}`}
            paintedColorIds={paintedColorIds}
            onFill={handleFill}
          />
        </div>
      </div>

      {isComplete && (
        <div className="flex justify-center">
          <Button ref={revealButtonRef} type="button" variant="outline">
            Descubre tu regalo
          </Button>
        </div>
      )}
    </div>
  );
}
