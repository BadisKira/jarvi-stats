import Filters from "./filters";
import { FilterProvider } from "@/context/filterContext";
import StatistiquesTabs from "./StatistiquesTabsContainer";
import { MultipleLinesChart } from "@/components/charts/multipleLinesChart";

export default function PageStatistics() {

    return (
        <FilterProvider>
            <div className="w-12/12 mb-6">
                <MultipleLinesChart />
            </div>
            <div className="flex flex-col gap-10">
                <div className="text-lg font-semibold text-foreground">
                    Statistiques plus détaillés sur les différents type de messages envoyés
                </div>
                <Filters />
                <StatistiquesTabs />
            </div>
        </FilterProvider>
    )
};





