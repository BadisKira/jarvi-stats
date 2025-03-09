import { PreDefinedPeriodOptions, StatsType } from "@/types/statistiques";
import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";


interface FilterContextProps {

  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>

  selectedTypes: StatsType[]
  setSelectedTypes: (type: StatsType[]) => void,


  selectedPredefinedPeriod: PreDefinedPeriodOptions,
  setSelectedPredefinedPeriod: (arg: PreDefinedPeriodOptions) => void;

}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 1)),
    to: new Date(),
  });

  const [selectedTypes, setSelectedTypes] = useState<StatsType[]>([
    "EMAIL_SENT", "LINKEDIN_INMAIL_SENT", "LINKEDIN_MESSAGE_SENT"
  ]);

  const [selectedPredefinedPeriod, setSelectedPredefinedPeriod] = useState(() => {
    return (localStorage.getItem("period-selected") || "null") as PreDefinedPeriodOptions
  });

  return (
    <FilterContext.Provider value={{
      dateRange, setDateRange,
      selectedTypes, setSelectedTypes,
      selectedPredefinedPeriod, setSelectedPredefinedPeriod
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter doit être utilisé dans un FilterProvider");
  }
  return context;
}
