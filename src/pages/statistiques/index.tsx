import { useQuery } from "@apollo/client";
import Filters from "./filters";
import { FilterProvider, useFilter } from "@/context/filterContext";
import { getStatistics } from "@/lib/queries";
import { convertToTimestampz } from "@/lib/utils";

export default function PageStatistics() {
    return (
        <FilterProvider>
            <div className="">
                <Filters handleSubmit={() => { }} />
                <StatisticsSection />
            </div>
        </FilterProvider>
    )
};




const StatisticsSection = () => {
    const { dateRange } = useFilter();
    const { data, loading, error } = useQuery(getStatistics({
        endDate: convertToTimestampz(dateRange?.to?.toString()), messageType: ["LINKEDIN_MESSAGE_SENT"], startDate: convertToTimestampz(dateRange?.from?.toString())
    }));

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

    return <>
        <pre>{JSON.stringify(data)}</pre>
    </>
}

