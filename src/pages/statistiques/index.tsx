import { getStatistics } from "@/lib/queries"
import { useQuery } from "@apollo/client"

export default function PageStatistics() {
    const { data, loading, error } = useQuery(getStatistics({
        endDate: "2025-01-01T00:00:00Z", messageType: "LINKEDIN_MESSAGE_SENT", startDate: "2024-01-31T23:59:59Z"
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
    return (

        <div>
            YES WE GOT THE DATA
        </div>
    )
}