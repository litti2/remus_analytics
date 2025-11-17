'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';

type Point = { x: string | number; y: number };

export default function Sparkline({ data }: { data: Point[] }) {
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="y" stroke="hsl(var(--indigo))" fill="hsl(var(--indigo))" fillOpacity={0.15} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
