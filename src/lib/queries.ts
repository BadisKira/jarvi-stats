import { StatsRequest } from "@/types/statistiques";
import { gql } from "@apollo/client";
export const getHisotyEntriesTypes = gql`
query getHisotyEntriesTypes {
  historyentries_types {
    value
  }
}
`;



export const getStatistics = (request:StatsRequest) => 
  gql`
query GetStatistiques {
  aggregated_data_2(args: {end_date: "${request.endDate}", message_type: "${request.messageType}", start_date: "${request.startDate}"}) {
    nombre_messages_actuel
    nombre_messages_precedent
    taux_lecture_actuel
    taux_lecture_precedent
    taux_reponse_actuel
    taux_reponse_precedent
    temps_moyen_precedent
    temps_moyen_actuel
    type
  }
}

`