import { StatsRequest } from "@/types/statistiques";
import { gql } from "@apollo/client";
export const getHisotyEntriesTypes = gql`
query getHisotyEntriesTypes {
  historyentries_types {
    value
  }
}
`;



export const getStatistics = (request:StatsRequest) => {
  const arrayToStringMessageType = request.messageType.join(","); 
  return gql`
query GetStatistiques {
  aggregated_data_3(args: {end_date: "${request.endDate}", message_type: "${arrayToStringMessageType}", start_date: "${request.startDate}"}) {
    nombre_lectures_actuel
    nombre_lectures_precedent
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