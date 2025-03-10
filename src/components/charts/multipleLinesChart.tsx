"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import { useState } from "react"
import { useMultipleQuery } from "@/hooks/useMultipleQuery"
import { ApiGQLResponse, SpecificKeys } from "@/types/statistiques"
import { Skeleton } from "../ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"




const chartConfig = {
    EMAIL_SENT: {
        label: "Emails Envoyés",
        color: "hsl(var(--chart-1))",
    },
    LINKEDIN_MESSAGE_SENT: {
        label: "Messages LinkedIn  Envoyés",
        color: "hsl(var(--chart-2))",
    },
    LINKEDIN_INMAIL_SENT: {
        label: "LinkedIn InMails Envoyés",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

export function MultipleLinesChart() {
    const [dataKey, setDataKey] = useState("nombre_messages");
    const [selectedYear, setSelectedYear] = useState(2025);


    const { data, loading } = useMultipleQuery(selectedYear);
    if (loading) {
        return <Skeleton className="w-full h-96" />
    }

    const chartData = transformApiDataToChartData(data);


    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Analyse des messages et des réponses</CardTitle>
                    <CardDescription>
                        Comparez l’évolution des messages envoyés et des réponses sur l’année sélectionnée.
                    </CardDescription>
                    <div className="mt-2">
                        <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sélectionnez l'année" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2025">2025</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2020">2020</SelectItem>
                                <SelectItem value="2019">2019</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Partie droite : boutons de sélection */}
                <div className="flex items-center space-x-2 mb-4 px-6">
                    <button
                        className={`px-4 py-2 border rounded ${dataKey === "nombre_messages" ? "bg-muted" : ""
                            }`}
                        onClick={() => setDataKey("nombre_messages")}
                    >
                        Messages Envoyés
                    </button>
                    <button
                        className={`px-4 py-2 border rounded ${dataKey === "nombre_reponses" ? "bg-muted" : ""
                            }`}
                        onClick={() => setDataKey("nombre_reponses")}
                    >
                        Réponses
                    </button>
                </div>
            </CardHeader>



            <CardContent>

                <ChartContainer config={chartConfig} className="max-h-[350px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData.map(({ month, types }) => ({
                            month,
                            EMAIL_SENT: types.EMAIL_SENT[dataKey],
                            LINKEDIN_MESSAGE_SENT: types.LINKEDIN_MESSAGE_SENT[dataKey],
                            LINKEDIN_INMAIL_SENT: types.LINKEDIN_INMAIL_SENT[dataKey],
                        }))}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={true}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="EMAIL_SENT"
                            type="monotone"
                            stroke="var(--color-EMAIL_SENT)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="LINKEDIN_MESSAGE_SENT"
                            type="monotone"
                            stroke="var(--color-LINKEDIN_MESSAGE_SENT)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="LINKEDIN_INMAIL_SENT"
                            type="monotone"
                            stroke="var(--color-LINKEDIN_INMAIL_SENT)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Showing message activity for the last 3 months
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}





const transformApiDataToChartData = (apiData: ApiGQLResponse) => {
    const monthMap = new Map();

    Object.keys(apiData).forEach((type) => {
        const { grouped_by_month } = apiData[type as SpecificKeys];
        grouped_by_month.forEach((item) => {
            const monthName = item.month.trim();
            const monthNumber = item.month_number;

            if (!monthMap.has(monthNumber)) {
                monthMap.set(monthNumber, { month: monthName, types: {} });
            }

            monthMap.get(monthNumber).types[type] = {
                nombre_messages: item.nombre_messages,
                nombre_reponses: item.nombre_reponses
            };
        });
    });

    const chartData = Array.from(monthMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, value]) => value);

    return chartData;
};