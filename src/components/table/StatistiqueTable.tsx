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
import { getDisplayName } from "@/lib/utils"

type Period = {
    date_debut?: Date
    date_fin?: Date
}

interface StatTableProps {
    data: BasicStatsData
    periodCurrent: Period
    periodPrevious: Period
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

export function StatTable({ data, periodCurrent, periodPrevious }: StatTableProps) {
    const durationCurrent =
        periodCurrent.date_debut && periodCurrent.date_fin
            ? (periodCurrent.date_fin.getTime() - periodCurrent.date_debut.getTime()) / (1000 * 60 * 60 * 24) + 1
            : 1
    const durationPrevious =
        periodPrevious.date_debut && periodPrevious.date_fin
            ? (periodPrevious.date_fin.getTime() - periodPrevious.date_debut.getTime()) / (1000 * 60 * 60 * 24) + 1
            : 1

    const metrics = [
        {
            label: "Messages",
            actuel: data.nombre_messages_actuel,
            precedent: data.nombre_messages_precedent,
        },
        {
            label: "Réponses",
            actuel: data.nombre_reponses_actuel,
            precedent: data.nombre_reponses_precedent,
        },
        {
            label: "Lectures",
            actuel: data.nombre_lectures_actuel,
            precedent: data.nombre_lectures_precedent,
        },
        {
            label: "Temps moyen de réponse",
            actuel: data.temps_moyen_reponse_actuel,
            precedent: data.temps_moyen_reponse_precedent,
        },
    ]

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>{getDisplayName(data.type as StatsType)}</CardTitle>
                <CardDescription>
                    Période actuelle : {periodCurrent.date_debut?.toDateString()} au {periodCurrent.date_fin?.toDateString()} <br />
                    Période précédente : {periodPrevious.date_debut?.toDateString()} au {periodPrevious.date_fin?.toDateString()}
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
                                Comparaison entre deux périodes de temps
                        </TableCaption>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
