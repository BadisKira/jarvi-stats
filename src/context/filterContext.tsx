import { StatsType } from "@/types/statistiques";
import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";


interface FilterContextProps {

  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;

  selectedTypes: StatsType[]
  setSelectedTypes: (type: StatsType[]) => void,


  isManuallyCreated: boolean | null,
  setIsManuallyCreated: (arg: boolean | null) => void;

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

  const [isManuallyCreated, setIsManuallyCreated] = useState<boolean | null>(true)

  return (
    <FilterContext.Provider value={{
      dateRange, setDateRange,
      selectedTypes, setSelectedTypes, isManuallyCreated, setIsManuallyCreated
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
