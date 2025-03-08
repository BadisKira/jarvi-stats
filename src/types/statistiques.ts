export type StatsType = 'LINKEDIN_MESSAGE_SENT'|'LINKEDIN_INMAIL_SENT'|'EMAIL_SENT'

export type StatsRequest = {
    messageType: StatsType,
    startDate: string,
    endDate: string
}