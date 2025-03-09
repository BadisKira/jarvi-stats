import { useFilter } from "@/context/filterContext";
import { getStaticData } from "@/lib/queries";
import { BasicStatsData } from "@/types/statistiques";
import { useQuery } from "@apollo/client";
import { ChartBar } from "./barChart";

export default function StatisticsSection () {
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

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {data.aggregated_data_3.map((dd: BasicStatsData) => {
                return <ChartBar data={dd} periodCurrent={{
                    from: dateRange?.from,
                    to: dateRange?.to
                }}
                    periodPrevious={{
                        from: dateRange?.from,
                        to: dateRange?.to
                    }} />
            })}
        </div>


    </>
}

