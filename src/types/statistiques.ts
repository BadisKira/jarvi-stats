import { ApolloError } from "@apollo/client";
import { DateRange } from "react-day-picker";

export type PreDefinedPeriodOptions = "null" | "1 day" | "1 week" | "1 month" | "3 months" |"6 months" | "1 year"


export type StatsType =
    | "EVENT_SCHEDULED"
    | "EMAIL_SENT"
    | "LINKEDIN_MESSAGE_SENT"
    | "LINKEDIN_INMAIL_SENT"
    | "LINKEDIN_INVITATION_SENT"
    | "PHONECALL"
    | "SMS_SENT"
    | "JOB_APPLICATION";


export enum StatsTypeEnum {
    EVENT_SCHEDULED = "EVENT_SCHEDULED",
    EMAIL_SENT = "EMAIL_SENT",
    LINKEDIN_MESSAGE_SENT = "LINKEDIN_MESSAGE_SENT",
    LINKEDIN_INMAIL_SENT = "LINKEDIN_INMAIL_SENT",
    LINKEDIN_INVITATION_SENT = "LINKEDIN_INVITATION_SENT",
    PHONECALL = "PHONECALL",
    SMS_SENT = "SMS_SENT",
    JOB_APPLICATION = "JOB_APPLICATION",
}

export const StatsTypeArray: StatsType[] = Object.keys(StatsTypeEnum) as StatsType[];




export type StatsRequest = {
    messageType: StatsType[],
    startDate: string,
    endDate: string
}


export type BasicStatsData = {
    nombre_manually_created_actuel: number
    nombre_manually_created_precedent: number
    nombre_messages_actuel: number
    nombre_messages_precedent: number
    nombre_reponses_actuel: number
    nombre_reponses_precedent: number
    temps_moyen_reponse_actuel: number | null
    temps_moyen_reponse_precedent: number | null
    type: string
}

export interface SectionStatisticsBasicProps {
    data: {aggregated_data_3:BasicStatsData[]},
    loading: boolean,
    error: ApolloError | undefined,
    currentPeriod:DateRange,
}