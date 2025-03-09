"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getDisplayName } from "@/lib/utils"
import { BasicStatsData, StatsType } from "@/types/statistiques"
import { DateRange } from "react-day-picker"



interface ChartBarProps {
  data: BasicStatsData
  periodCurrent: DateRange
  periodPrevious: DateRange
}

const chartConfig: ChartConfig = {
  actuel: {
    label: "Actuel",
    color: "hsl(var(--chart-1))",
  },
  precedent: {
    label: "Précédent",
    color: "hsl(var(--chart-2))",
  },
}

function calculateDifference(actuel: number, precedent: number): number | null {
  if (precedent === 0) return null
  return ((actuel - precedent) / precedent) * 100
}

export function ChartBar({ data, periodCurrent, periodPrevious }: ChartBarProps) {
  // Transformation de l'objet de données en format adapté au BarChart
  const chartData = [
    {
      indicateur: "Messages",
      actuel: data.nombre_messages_actuel,
      precedent: data.nombre_messages_precedent,
    },
    {
      indicateur: "Réponses",
      actuel: data.nombre_reponses_actuel,
      precedent: data.nombre_reponses_precedent,
    },
    {
      indicateur: "Lectures",
      actuel: data.nombre_lectures_actuel,
      precedent: data.nombre_lectures_precedent,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getDisplayName(data.type as StatsType) }</CardTitle>
        <CardDescription>
          Actuel : {periodCurrent.from?.toISOString()} au {periodCurrent.to?.toUTCString()} | Précédent : {periodPrevious.from?.toString()} au {periodPrevious.to?.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="indicateur"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="actuel" fill="var(--color-actuel)" radius={4} />
            <Bar dataKey="precedent" fill="var(--color-precedent)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm">
        {chartData.map((item) => {
          const diff = calculateDifference(item.actuel, item.precedent)
          const isProgression = diff !== null && diff >= 0
          return (
            <div key={item.indicateur} className="flex items-center gap-2">
              <span className="font-medium">
                {item.indicateur} : {diff === null ? "N/A" : `${Math.abs(diff).toFixed(2)}%`}
              </span>
              {diff !== null &&
                (isProgression ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ))}
            </div>
          )
        })}
      </CardFooter>
    </Card>
  )
}
