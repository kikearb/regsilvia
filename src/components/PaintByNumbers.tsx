import React, { useRef, useState, useEffect, useReducer } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { Painting } from "./Painting";

type UndoAction = {
  colorId: string;
};

type PaintState = {
  paintedColorIds: string[];
  history: UndoAction[];
};

type PaintAction =
  | { type: "fill"; colorId: string }
  | { type: "undo" }
  | { type: "reset" };

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

const paintReducer = (state: PaintState, action: PaintAction): PaintState => {
  switch (action.type) {
    case "fill": {
      if (state.paintedColorIds.includes(action.colorId)) {
        return state;
      }
      return {
        paintedColorIds: [...state.paintedColorIds, action.colorId],
        history: [...state.history, { colorId: action.colorId }],
      };
    }
    case "undo": {
      if (state.history.length === 0) {
        return state;
      }
      const last = state.history[state.history.length - 1];
      return {
        paintedColorIds: state.paintedColorIds.filter(
          (id) => id !== last?.colorId
        ),
        history: state.history.slice(0, -1),
      };
    }
    case "reset":
      return { paintedColorIds: [], history: [] };
    default:
      return state;
  }
};

export function PaintByNumbers() {
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState<number>(1);
  const [{ paintedColorIds, history }, dispatch] = useReducer(paintReducer, {
    paintedColorIds: [],
    history: [],
  });
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
    dispatch({ type: "undo" });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
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
    dispatch({ type: "fill", colorId: selectedNumber.toString() });
  };

  const goToPremio = () => {
    navigate({ to: "/premio" });
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

      <div className="flex gap-3 items-center max-sm:justify-between">
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
        <Painting
          currentColorId={`${selectedNumber}`}
          paintedColorIds={paintedColorIds}
          onFill={handleFill}
        />
      </div>

      {isComplete && (
        <div className="flex justify-center">
          <Button
            ref={revealButtonRef}
            type="button"
            variant="outline"
            onClick={goToPremio}
          >
            Descubre tu regalo
          </Button>
        </div>
      )}
    </div>
  );
}
