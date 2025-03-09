import { BasicStatsData, SectionStatisticsBasicProps } from "@/types/statistiques";
import { ChartBar } from "./barChart";
import { SkeletonCardChart } from "./SkeletonChart";
import ErrorComponent from "../error";

export default function StatisticsSection({
    data, currentPeriod, error, loading
}: SectionStatisticsBasicProps) {

    if (loading) {
        return (
            <div className="grid grid-cols-1 p-4
                    sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                <SkeletonCardChart />
                <SkeletonCardChart />
                <SkeletonCardChart />
            </div>

        )
    }
    if (error) {
        return <ErrorComponent />
    }
    const {aggregated_data_3} = data

    return <>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {aggregated_data_3.map((dd: BasicStatsData) => {
                return <ChartBar data={dd} periodCurrent={currentPeriod} />
            })}
        </div>


    </>
}

