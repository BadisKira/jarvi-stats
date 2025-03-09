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

export const getStaticData = gql`
query myStaticQuery {
  aggregated_data_3(args: {end_date: "2025-01-01T00:00:00Z", message_type: "EMAIL_SENT,LINKEDIN_MESSAGE_SENT", start_date: "2024-01-31T23:59:59Z"}) {
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
`;



