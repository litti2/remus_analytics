"use client";
import React from "react";

type Step = { id: string; name: string; users: number; order: number; conversionRate?: number; dropoffRate?: number };

export function RadialFunnel({ steps }: { steps: Step[] }) {
  // Concentric arc-based radial funnel contained within wrapper
  // No absolute positioning; centered via flex by parent wrapper
  const size = 420; // logical size
  const ringThickness = 28; // within 26–34px
  const ringGap = 10; // within 8–12px

  const palette = ["#6F6AF8", "#7D75F9", "#8E86FF", "#A8A3FF"]; // will cycle
  const maxUsers = Math.max(1, ...steps.map((s) => s.users || 0));

  const rings = steps.map((s, i) => ({
    step: s,
    color: palette[i % palette.length],
    idx: i,
  }));

  const totalRings = rings.length;
  const totalThickness = totalRings * ringThickness + Math.max(0, totalRings - 1) * ringGap;
  const radiusOuter = Math.max(size / 2 - 16, totalThickness / 2 + 24);

  return (
    <div className="radial-funnel-wrapper flex w-full h-full items-center justify-center">
      <svg
        role="img"
        aria-label="Radial funnel visualization"
        viewBox={`0 0 ${size} ${size}`}
        className="block max-w-full max-h-full"
        style={{ width: "100%", height: "100%" }}
      >
        {rings.map((r, i) => {
          const radius = radiusOuter - i * (ringThickness + ringGap) - ringThickness / 2;
          const circumference = 2 * Math.PI * radius;
          // Use arcs (partial circle) proportional to users
          const proportion = (r.step.users || 0) / maxUsers;
          const arc = Math.max(0.08, proportion) * circumference;
          const gap = circumference - arc;

          // Label angle and simple leader line outward
          const angle = -90 + i * (180 / Math.max(1, totalRings - 1));
          const rad = (angle * Math.PI) / 180;
          const x1 = size / 2 + Math.cos(rad) * (radius + ringThickness / 2 + 4);
          const y1 = size / 2 + Math.sin(rad) * (radius + ringThickness / 2 + 4);
          const x2 = size / 2 + Math.cos(rad) * (radius + ringThickness / 2 + 22);
          const y2 = size / 2 + Math.sin(rad) * (radius + ringThickness / 2 + 22);
          const alignRight = Math.cos(rad) >= 0;
          const labelX = x2 + (alignRight ? 10 : -10);

          const drop = Math.round((r.step.dropoffRate || 0) * 100);

          return (
            <g key={r.step.id}>
              {/* Track */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#2A2E33"
                strokeWidth={ringThickness}
                opacity={0.9}
                strokeDasharray={`${circumference}`}
                strokeDashoffset={0}
              />
              {/* Arc */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={r.color}
                strokeWidth={ringThickness}
                strokeLinecap="round"
                strokeDasharray={`${arc} ${gap}`}
                strokeDashoffset={gap / 2}
              />
              {/* Leader and labels outside the arc */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3E434A" strokeWidth={1} />
              <text
                x={labelX}
                y={y2}
                textAnchor={alignRight ? "start" : "end"}
                dominantBaseline="middle"
                className="select-none"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui", lineHeight: 1.2 }}
              >
                <tspan x={labelX} dy="-0.6em" className="fill-white" style={{ fontSize: 14, fontWeight: 600 }}>
                  {r.step.name}
                </tspan>
                <tspan x={labelX} dy="1.2em" className="fill-[#A0A4A8]" style={{ fontSize: 13, fontWeight: 500 }}>
                  Users: {r.step.users?.toLocaleString?.() ?? r.step.users}
                </tspan>
                <tspan x={labelX} dy="1.2em" className="fill-[#A0A4A8]" style={{ fontSize: 13, fontWeight: 500 }}>
                  Dropoff: {drop}%
                </tspan>
              </text>
              <title>{`Step: ${r.step.name} — ${r.step.users} users — ${drop}% dropoff`}</title>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
