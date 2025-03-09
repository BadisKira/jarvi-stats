import Filters from "./filters";
import { FilterProvider} from "@/context/filterContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTable from "@/components/table/SectionTable";
import StatisticsSection from "@/components/charts/StatistiqueChart";

export default function PageStatistics() {
    return (
        <FilterProvider>
            <div className="flex flex-col gap-10">
                <Filters handleSubmit={() => { }} />
                <Tabs defaultValue="tabs" className="w-full">
                    <TabsList>
                        <TabsTrigger value="tabs">Les tableaux</TabsTrigger>
                        <TabsTrigger value="charts">les chatas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tabs">
                        <SectionTable />
                    </TabsContent>
                    <TabsContent value="charts">
                        <StatisticsSection />
                    </TabsContent>
                </Tabs>

            </div>
        </FilterProvider>
    )
};




