import { StatTable } from "./StatistiqueTable";
import { BasicStatsData, SectionStatisticsBasicProps } from "@/types/statistiques";
import { SkeletonCardTable } from "./SkeletonTable";
import ErrorComponent from "../error";



export default function SectionTable({
    data, loading, error, currentPeriod
}: SectionStatisticsBasicProps) {
    let aggregated_data_3: BasicStatsData[] = [];


    if (loading) {
        return (
            <div className="grid grid-cols-1 p-4
            sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                <SkeletonCardTable />
                <SkeletonCardTable />
                <SkeletonCardTable />
            </div>
        )
    }
    if (error) {
        return <ErrorComponent />
    }

    aggregated_data_3 = data.aggregated_data_3



    return (
        <div className="flex gap-6 flex-wrap">
            {
                aggregated_data_3.length > 0 && aggregated_data_3.map((dd: BasicStatsData) => {
                    return <StatTable key={dd.type} data={dd} periodCurrent={currentPeriod} />
                })
            }

        </div>
    )
}