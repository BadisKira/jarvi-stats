import { StatsRequest, StatsType } from "@/types/statistiques";
import { gql } from "@apollo/client";
export const getHisotyEntriesTypes = gql`
query getHisotyEntriesTypes {
  historyentries_types {
    value
  }
}
`;



export const getStatisticsV1 = (request:StatsRequest) => {
  const arrayToStringMessageType = request.messageType.join(","); 
  return gql`
query GetStatistiques {
  aggregated_data_3(args: {end_date: "${request.endDate}", message_type: "${arrayToStringMessageType}", start_date: "${request.startDate}"}) {
    nombre_manually_created_actuel,
    nombre_manually_created_precedent,
    nombre_messages_actuel
    nombre_messages_precedent
    nombre_reponses_actuel
    nombre_reponses_precedent
    temps_moyen_reponse_actuel
    temps_moyen_reponse_precedent
    type
  }
}
`
}




export const getStatsForYear = ({year,messageType}:{year:number,messageType:StatsType}) => {
  return gql`
query MyMultipleQuery {
  grouped_by_month(args: {year: "${year}", message_type:"${messageType}"}) {
     nombre_reponses
    nombre_messages
    month_number
    month
  }
}
`
}