import { useFilter } from "@/context/filterContext";
import { getStaticData } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { StatTable } from "./StatistiqueTable";
import { BasicStatsData } from "@/types/statistiques";

export default function SectionTable() {
    const { dateRange } = useFilter();
    const { data, loading, error } = useQuery(getStaticData);
    if (loading) {
        return <div>
            Loading data ...
        </div>
    }
    if (error) {
        console.log(error)
        return <div>
            Une erreur a survenue
        </div>
    }
    console.log(data)
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {
                data.aggregated_data_3.map((dd: BasicStatsData) => {
                    return <StatTable data={dd} periodCurrent={{
                        date_debut: dateRange?.from,
                        date_fin: dateRange?.to
                    }}
                        periodPrevious={{
                            date_debut: dateRange?.from,
                            date_fin: dateRange?.to
                        }}
                    />
                })
            }



        </div>
    )
}