export type DateMonthType = "before" | "current" | "after";
export type DateIncludeType = "between" | "start" | "end" | "none";

export type DateType = {
    displayDate: Date;
    monthType: DateMonthType;
};
