import Filters from "./filters";
import { FilterProvider } from "@/context/filterContext";
import StatistiquesTabs from "./StatistiquesTabsContainer";

export default function PageStatistics() {

    return (
        <FilterProvider>
            <div className="flex flex-col gap-10">
                <Filters />
                <StatistiquesTabs />
            </div>
        </FilterProvider>
    )
};





