import { useState } from "react";
import { DatePickerHook } from "./types";
import { format } from "date-fns";

/**
 * DatePicker을 사용하기 위한 hook
 */
export const useDatePicker = (): DatePickerHook => {
    const [selectedDate, setSelectedDate] = useState<Date[]>([]);

    const setSelecedDate = (date: Date) => {
        setSelectedDate(pre => {
            if (pre.length >= 2 || pre.map(v => format(v, "yyyy-MM-dd")).includes(format(date, "yyyy-MM-dd")))
                return [date];
            return pre[0] > date ? [date, ...pre] : [...pre, date];
        });
    };

    return { selectedDate, setSelecedDate };
};
