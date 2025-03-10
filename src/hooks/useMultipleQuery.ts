import { getStatsForYear } from "@/lib/queries";
import { ApiGQLResponse, SpecificKeys } from "@/types/statistiques";
import { useQuery } from "@apollo/client";

export function useMultipleQuery(year: number) {
  const messageTypes:SpecificKeys[] = ["LINKEDIN_MESSAGE_SENT", "LINKEDIN_INMAIL_SENT", "EMAIL_SENT"] as const;

  const queries = messageTypes.map((type) => ({
    type,
    ...useQuery(getStatsForYear({ year, messageType: type })),
  }));

  return {
    loading: queries.some(({ loading }) => loading), 
    error: queries.reduce((acc, { type, error }) => ({ ...acc, [type]: error }), {}),
    data: queries.reduce((acc, { type, data }) => ({ ...acc, [type]: data }), {}) as ApiGQLResponse,
  };
}
