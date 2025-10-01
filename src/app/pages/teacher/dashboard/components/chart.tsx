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
              data={chartData}
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
