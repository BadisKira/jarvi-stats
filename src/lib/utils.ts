import { StatsType } from "@/types/statistiques";
import { clsx, type ClassValue } from "clsx"
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function convertToTimestampz(dateStr: string | undefined): string {
  const date = new Date(dateStr!!);
  if (isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('fr-FR', options);
}

export function calcPreviousPeriod(currentPeriod: DateRange) {

  if (!currentPeriod.from || !currentPeriod.to) {
    throw new Error("Les dates 'from' et 'to' doivent être définies.");
  }

  const diff = currentPeriod.to.getTime() - currentPeriod.from.getTime();
  const oneDayInMillis = 24 * 60 * 60 * 1000;


  return {
    from: new Date(currentPeriod.from.getTime() - diff),
    to: new Date(currentPeriod.from.getTime() - oneDayInMillis)
  };
}


export function getDisplayName(type: StatsType): string {
  switch (type) {
    case "EMAIL_SENT":
      return "E-mails envoyés";
    case "LINKEDIN_MESSAGE_SENT":
      return "Messages LinkedIn envoyés";
    case "LINKEDIN_INMAIL_SENT":
      return "InMails LinkedIn envoyés";
    case "LINKEDIN_INVITATION_SENT":
      return "Invitations LinkedIn envoyées";
    case "PHONECALL":
      return "Appels téléphoniques";
    case "SMS_SENT":
      return "SMS envoyés";
    case "JOB_APPLICATION":
      return "Candidatures envoyées";
    case "EVENT_SCHEDULED":
      return "Événements programmés";
    default:
      return `Type inconnu: ${type}`; 
  }
}
