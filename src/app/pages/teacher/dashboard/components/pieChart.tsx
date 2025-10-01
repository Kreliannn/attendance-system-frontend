"use client"

import { Pie, PieChart, ResponsiveContainer } from "recharts"

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
} from "@/components/ui/chart"

interface pieChartDataInterface {
  status: string
  count: number
  fill: string
}

export const description = "A pie chart with a legend"

const chartConfig = {
  absent: {
    label: "Absent",
    color: "red",
  },
  present: {
    label: "Present",
    color: "green",
  },
} satisfies ChartConfig

export function PieChartComponent({
  chartData,
}: {
  chartData: pieChartDataInterface[]
}) {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Attendance Status</CardTitle>
        <CardDescription> Date : { new Date().toISOString().split("T")[0] }</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="status"
                label={({ percent }) =>
                  `${(percent * 100).toFixed(0)}%`
                } // 👈 percentage label
                labelLine={false}
              />
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/2 *:justify-center"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
