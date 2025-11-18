"use client";
import React, { useMemo, useState } from "react";
import { RadialFunnel } from "./RadialFunnel";
import "./FlipFunnelCard.css";

export type Step = { id: string; name: string; users: number; order: number; metricKey?: string; conversionRate?: number; dropoffRate?: number };

type TableRenderProps = {
  onFlipToVisual: () => void;
};

type Props = {
  steps: Step[];
  renderTable: (controls: TableRenderProps) => React.ReactNode;
};

export function FlipFunnelCard({ steps, renderTable }: Props) {
  const [state, setState] = useState<"visualization" | "table">("visualization");

  const onFlip = () => setState((s) => (s === "visualization" ? "table" : "visualization"));
  const isVisual = state === "visualization";

  return (
    <div className="flip-container">
      <div className="flip-inner" data-state={state}>
        <div className="flip-front" onClick={onFlip}>
          <RadialFunnel steps={steps as any} />
        </div>
        <div className="flip-back">
          {renderTable({ onFlipToVisual: () => setState("visualization") })}
        </div>
      </div>
    </div>
  );
}
