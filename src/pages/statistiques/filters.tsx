import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-picker-range";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const periodeOptions = [
    { label: "Aucun", value: "null" },
    { label: "1 Jour", value: "1 day" },
    { label: "1 Semaine", value: "1 week" },
    { label: "1 Mois", value: "1 month" },
    { label: "1 Trimestre", value: "3 months" },
    { label: "6 Mois", value: "6 months" },
    { label: "1 Année", value: "1 year" },
];
import { DateRange } from "react-day-picker"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandEmpty,
    CommandGroup,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, Info } from "lucide-react";
import { useFilter } from "@/context/filterContext";
import { PreDefinedPeriodOptions, StatsType, StatsTypeArray } from "@/types/statistiques";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getDisplayName } from "@/lib/utils";
import { Label } from "@/components/ui/label";




interface PeriodeSelectProps {
    onPeriodChange: (dateRange: DateRange) => void;
}


function PeriodeSelect({ onPeriodChange }: PeriodeSelectProps) {
    const { selectedPredefinedPeriod, setSelectedPredefinedPeriod } = useFilter();

    const handleValueChange = (value: PreDefinedPeriodOptions) => {
        setSelectedPredefinedPeriod(value);
        localStorage.setItem('period-selected', value);
        if (value == "null") {
            return;
        }
        const to = new Date();
        const from = new Date(to);


        switch (value) {
            case "1 day":
                from.setDate(to.getDate() - 1);
                break;
            case "1 week":
                from.setDate(to.getDate() - 7);
                break;
            case "1 month":
                from.setMonth(to.getMonth() - 1);
                break;
            case "3 months":
                from.setMonth(to.getMonth() - 3);
                break;
            case "6 months":
                from.setMonth(to.getMonth() - 6);
                break;
            case "1 year":
                from.setFullYear(to.getFullYear() - 1);
                break;
            default:
                break;
        }
        onPeriodChange({ from, to });
    };

    return (
        <div className="relative">
            <Label className="absolute -top-5 flex items-center justify-between" title="Selectionn">
                <span>Selectionner une période précise</span> 
                <div title="Ce select permet de choisir une periode bien définie à partir de ce jour " className="cursor-pointer">
                <Info size={16}   className="ml-2"/>
                </div>
            </Label>
            <Select value={selectedPredefinedPeriod} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[250px] " >
                <SelectValue placeholder="Sélectionnez une période" />
            </SelectTrigger>
            <SelectContent className="w-[350px]">
                {periodeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        </div>
    );
}




export function SelectStatistiqueTypes() {
    const [open, setOpen] = useState(false);
    const { selectedTypes, setSelectedTypes } = useFilter();

    const toggleSelection = (value: StatsType) => {
        if (selectedTypes.includes(value)) {
            if (selectedTypes.length > 1) {
                const selectedTypesUpdated = selectedTypes.filter((item) => item !== value);
                localStorage.setItem("types-selected", selectedTypesUpdated.join(","))
                setSelectedTypes(selectedTypesUpdated);
                setSelectedTypes(selectedTypesUpdated);
            }
        } else {
            const selectedTypesUpdated = [...selectedTypes, value];
            localStorage.setItem("types-selected", selectedTypesUpdated.join(","))
            setSelectedTypes(selectedTypesUpdated);
        }
    };


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-between" >
                    Choisir les types à suivre
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-0">
                <Command>
                    <CommandInput placeholder="Search actions..." />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-96 whitespace-nowrap rounded-md border">
                            {StatsTypeArray.map((option) => (
                                <CommandItem
                                    key={option}
                                    onSelect={() => toggleSelection(option)}
                                >
                                    <Check
                                        className={`mr-2 h-4 w-4 ${selectedTypes.includes(option) ? "opacity-100" : "opacity-0"}`}
                                    />
                                    {getDisplayName(option)}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}




export default function Filters() {
    const { dateRange, setDateRange } = useFilter();

    const handlePeriodChange = (newRange: DateRange) => {
        setDateRange(newRange);
    };


    return (
        <div className="flex gap-4  items-center mb-2 flex-wrap ">
            <PeriodeSelect onPeriodChange={handlePeriodChange} />
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <SelectStatistiqueTypes />
        </div>
    );
}

