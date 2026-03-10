"use client";

import { AreaChart, Area, ResponsiveContainer } from "recharts";

interface YieldChartProps {
  data?: number[];
  color?: string;
  height?: number;
}

const defaultData = [20, 35, 28, 45, 38, 55, 50, 65, 58, 72, 68, 80];

export function YieldChart({
  data = defaultData,
  color = "#09C28A",
  height = 80,
}: YieldChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`yieldGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#yieldGradient-${color})`}
          dot={false}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
