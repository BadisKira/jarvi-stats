import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const periodeOptions = [
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
import { Check, ChevronsUpDown } from "lucide-react";
import { useFilter } from "@/context/filterContext";
import { StatsType, StatsTypeArray } from "@/types/statistiques";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getDisplayName } from "@/lib/utils";




interface PeriodeSelectProps {
    onPeriodChange: (dateRange: DateRange) => void;
}


function PeriodeSelect({ onPeriodChange }: PeriodeSelectProps) {
    const [selected, setSelected] = useState("1 day");

    const handleValueChange = (value: string) => {
        setSelected(value);
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
        <Select value={selected} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px] bg-white" >
                <SelectValue placeholder="Sélectionnez une période" className="bg-white" />
            </SelectTrigger>
            <SelectContent>
                {periodeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default function Filters({ handleSubmit }: { handleSubmit: () => void }) {
    const { dateRange, setDateRange } = useFilter();

    const handlePeriodChange = (newRange: DateRange) => {
        setDateRange(newRange);
    };

    const handleDatePickerChange = (newRange: DateRange) => {
        setDateRange(newRange);
    };

    return (
        <div className="flex gap-4  items-center mb-2 flex-wrap">
            <PeriodeSelect onPeriodChange={handlePeriodChange} />
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
            <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id="automatique" />
                    <Label htmlFor="automatique">Automatique</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="manuel" />
                    <Label htmlFor="manuel">Manuel</Label>
                </div>
            </div>
            <SelectStatistiqueTypes />
            <Button className="ml-auto" onClick={handleSubmit}>Filtrer</Button>
        </div>
    );
}




export function SelectStatistiqueTypes() {
    const [open, setOpen] = useState(false);
    const { selectedTypes, setSelectedTypes } = useFilter();

    const toggleSelection = (value: StatsType) => {
        if (selectedTypes.includes(value)) {
            if (selectedTypes.length > 1)
                setSelectedTypes(selectedTypes.filter((item) => item !== value));
        } else {
            setSelectedTypes([...selectedTypes, value]);
        }
    };

    console.log(StatsTypeArray)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-between">
                    Select actions
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
