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
import { SectionStatisticsBasicProps } from "@/types/statistiques"
import { SkeletonCardChart } from "./SkeletonChart"
import ErrorComponent from "../error"
import { getDisplayName } from "@/lib/utils"




export function ComparisonChart({
  data, loading, error
}: SectionStatisticsBasicProps) {

  if (loading) {
    return (
      <div className="grid grid-cols-1 p-4
                      sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <SkeletonCardChart />

      </div>

    )
  }
  if (error) {
    return <ErrorComponent />
  }

  const chartData = data.aggregated_data_3.map((item) => ({
    type: item.type,
    current: item.nombre_messages_actuel,
    previous: item.nombre_messages_precedent,
  }))

  const chartConfig: ChartConfig = {
    current: {
      label: "Période Actuelle",
      color: "hsl(var(--chart-1))",
    },
    previous: {
      label: "Période Précédente",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="flex space-x-5">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Comparaison par Périodes</CardTitle>
            <CardDescription>
              Affichage côte à côte de la période actuelle et précédente
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="type"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => getDisplayName(value)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="current" fill="var(--color-current)" radius={4} >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
                <Bar dataKey="previous" fill="var(--color-previous)" radius={4} >
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
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium">
              La comparaison montre directement l'évolution par type
            </div>

          </CardFooter>
        </Card>
      </div>



    </div>
  )
}

