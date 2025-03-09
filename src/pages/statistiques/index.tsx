import Filters from "./filters";
import { FilterProvider } from "@/context/filterContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTable from "@/components/table/SectionTable";
import StatisticsSection from "@/components/charts/StatistiqueChart";
import { useEffect, useState } from "react";

export default function PageStatistics() {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('tabs-storage') || 'tabs';
    });

    useEffect(() => {
        localStorage.setItem('tabs-storage', activeTab);
    }, [activeTab]);
    return (
        <FilterProvider>
            <div className="flex flex-col gap-10">
                <Filters handleSubmit={() => { }} />
                <Tabs defaultValue="tabs" className="w-full" value={activeTab}
                    onValueChange={setActiveTab}>
                    <TabsList className="w-80">
                        <TabsTrigger value="tabs"  style={{boxShadow:"none", background:"#f1f1f1" , color:"black"}}>version table</TabsTrigger>
                        <TabsTrigger value="charts"  style={{boxShadow:"none", background:"#f1f1f1" , color:"black"}}>version graphique</TabsTrigger>
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





