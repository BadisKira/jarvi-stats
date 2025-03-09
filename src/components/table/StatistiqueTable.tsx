import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { BasicStatsData, StatsType } from "@/types/statistiques"
import { calcPreviousPeriod, convertToHours, getDisplayName } from "@/lib/utils"
import { DateRange } from "react-day-picker"


interface StatTableProps {
    data: BasicStatsData
    periodCurrent: DateRange
}

function calculateNormalizedDifference(
    current: number,
    previous: number,
    durationCurrent: number,
    durationPrevious: number
): number | null {
    if (previous === 0 || durationPrevious === 0) return null
    const avgCurrent = current / durationCurrent
    const avgPrevious = previous / durationPrevious
    return ((avgCurrent - avgPrevious) / avgPrevious) * 100
}

export function StatTable({ data, periodCurrent }: StatTableProps) {
    const periodPrevious = calcPreviousPeriod(periodCurrent);
    
    const durationCurrent =
        periodCurrent.from && periodCurrent.to
            ? (periodCurrent.to.getTime() - periodCurrent.from.getTime()) / (1000 * 60 * 60 * 24) + 1
            : 1
    const durationPrevious =
        periodPrevious.from && periodPrevious.to
            ? (periodPrevious.to.getTime() - periodPrevious.from.getTime()) / (1000 * 60 * 60 * 24) + 1
            : 1

    const metrics = [
        {
            label: "Envoyés",
            actuel: data.nombre_messages_actuel,
            precedent: data.nombre_messages_precedent,
        },
        {
            label: "Réponses",
            actuel: data.nombre_reponses_actuel,
            precedent: data.nombre_reponses_precedent,
        },
        {
            label: "Manuellement crée",
            actuel: data.nombre_manually_created_actuel,
            precedent: data.nombre_manually_created_precedent,
        },
        {
            label: "Temps moyen de réponse",
            actuel: convertToHours(data.temps_moyen_reponse_actuel || 0),
            precedent: convertToHours(data.temps_moyen_reponse_precedent || 0),
        },
    ]

    return (
        <Card className="mb-6">
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
                <div className="w-fit mx-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Indicateur</TableHead>
                                <TableHead className="text-right">Actuel</TableHead>
                                <TableHead className="text-right">Précédent</TableHead>
                                <TableHead className="text-right">Différence</TableHead>
                                <TableHead className="text-center">Tendance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {metrics.map((metric) => {
                                if (metric.actuel === null && metric.precedent === null) return null

                                const diff =
                                    metric.actuel !== null && metric.precedent !== null
                                        ? calculateNormalizedDifference(metric.actuel, metric.precedent, durationCurrent, durationPrevious)
                                        : null
                                const isProgression = diff !== null && diff >= 0

                                return (
                                    <TableRow key={metric.label}>
                                        <TableCell>{metric.label}</TableCell>
                                        <TableCell className="text-right">
                                            {metric.actuel !== null ? metric.actuel : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {metric.precedent !== null ? metric.precedent : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {diff !== null ? `${Math.abs(diff).toFixed(2)}%` : "N/A"}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {diff !== null ? (
                                                isProgression ? (
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                ) : (
                                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                                )
                                            ) : (
                                                "N/A"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        <TableCaption>
                        </TableCaption>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
