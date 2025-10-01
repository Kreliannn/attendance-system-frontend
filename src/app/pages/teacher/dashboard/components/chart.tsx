"use client"

import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface chartDataInterface {
  date: string
  totalAbsent: number
  totalPresent: number
}

const mockUp = [
  { date: "2025-09-20", totalAbsent: 5, totalPresent: 15 },
  { date: "2025-09-21", totalAbsent: 11, totalPresent: 13 },
  { date: "2025-09-22", totalAbsent: 13, totalPresent: 11 },
  { date: "2025-09-23", totalAbsent: 2, totalPresent: 15 },
  { date: "2025-09-24", totalAbsent: 19, totalPresent: 12 },
  { date: "2025-09-25", totalAbsent: 7, totalPresent: 20 },
  { date: "2025-09-26", totalAbsent: 12, totalPresent: 15 },
  { date: "2025-09-27", totalAbsent: 1, totalPresent: 16 },
  { date: "2025-09-28", totalAbsent: 4, totalPresent: 13 },
  { date: "2025-09-29", totalAbsent: 5, totalPresent: 10 },
  
  
];

const chartConfig = {
  totalAbsent: {
    label: "Absent",
    color: "#ef4444", // tailwind red-500
  },
  totalPresent: {
    label: "Present",
    color: "#22c55e", // tailwind green-500
  },
} satisfies ChartConfig

export function ChartComponent({ chartData }: { chartData: chartDataInterface[] }) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Attendance Chart</CardTitle>
        <CardDescription>
          Daily total of present vs absent students
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full h-[calc(100%-5rem)]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={mockUp}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) => value.slice(5)} // show MM-DD
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {/* ✅ Present drawn last so it's on top */}
              <Area
                dataKey="totalAbsent"
                type="natural"
                fill="var(--color-totalAbsent)"
                fillOpacity={0.4}
                stroke="var(--color-totalAbsent)"
                stackId="a"
              />
              <Area
                dataKey="totalPresent"
                type="natural"
                fill="var(--color-totalPresent)"
                fillOpacity={0.4}
                stroke="var(--color-totalPresent)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
