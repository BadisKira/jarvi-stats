"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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
import { calcPreviousPeriod, getDisplayName } from "@/lib/utils"
import { BasicStatsData, StatsType } from "@/types/statistiques"
import { DateRange } from "react-day-picker"



interface ChartBarProps {
  data: BasicStatsData
  periodCurrent: DateRange
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

export function ChartBar({ data, periodCurrent }: ChartBarProps) {
  const periodPrevious = calcPreviousPeriod(periodCurrent);
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
      indicateur: "Manuellement crée",
      actuel: data.nombre_manually_created_actuel,
      precedent: data.nombre_manually_created_precedent,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getDisplayName(data.type as StatsType)}</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          <div className="flex flex-col space-y-1">
            <span>
              <span className="font-semibold">Actuel :</span> {periodCurrent.from?.toLocaleDateString("fr-FR")}
              {" "}au{" "} {periodCurrent.to?.toLocaleDateString("fr-FR")}
            </span>
            <span>
              <span className="font-semibold">Précédent :</span> {periodPrevious.from?.toLocaleDateString("fr-FR")}
              {" "}au{" "} {periodPrevious.to?.toLocaleDateString("fr-FR")}
            </span>
          </div>
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
            <Bar dataKey="actuel" fill="var(--color-actuel)" radius={4} >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="precedent" fill="var(--color-precedent)" radius={4} >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
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
