import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTable from "@/components/table/SectionTable";
import StatisticsSection from "@/components/charts/SectionChart";
import { useEffect, useState } from "react";
import { useFilter } from "@/context/filterContext";
import { useQuery } from "@apollo/client";
import { getStatisticsV1 } from "@/lib/queries";
import { convertToTimestampz } from "@/lib/utils";

export default function StatistiquesTabs() {
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem('tabs-storage') || 'tabs';
    });
    useEffect(() => {
        localStorage.setItem('tabs-storage', activeTab);
    }, [activeTab]);

    const { dateRange, selectedTypes } = useFilter();
    const { data, loading, error } = useQuery(getStatisticsV1({
        endDate: convertToTimestampz(dateRange?.to?.toString()),
        messageType: selectedTypes,
        startDate: convertToTimestampz(dateRange?.from?.toString())
    }), {
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true,
    });

    return (
        <Tabs defaultValue="tabs" className="w-full" value={activeTab}
            onValueChange={setActiveTab}>
            <TabsList className="w-80">
                <TabsTrigger value="tabs" >version table</TabsTrigger>
                <TabsTrigger value="charts"  >version graphique</TabsTrigger>
            </TabsList>
            <TabsContent value="tabs">
                <SectionTable data={data} loading={loading} error={error} currentPeriod={dateRange!!} />
            </TabsContent>
            <TabsContent value="charts">
                <StatisticsSection data={data} loading={loading} error={error} currentPeriod={dateRange!!} />
            </TabsContent>
        </Tabs>
    )
}