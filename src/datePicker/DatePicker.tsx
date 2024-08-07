import { useEffect, useRef, useState } from "react";
import DateCell from "../components/dateCell/DateCell";
import * as S from "./style";
import { addDays, addMonths, differenceInDays, endOfMonth, format, startOfMonth } from "date-fns";
import { DateIncludeType, DateMonthType, DateType } from "./types";
import { DatePickerHook } from "../util/datePickerUtils/types";

type DatePickerProps = {
    datePickerHook: DatePickerHook;
    mondayStart?: boolean;
};

/**
 * @param {DatePickerHook} datePickerHook datePicker의 선택 정보를 제어할 hook
 * @param {boolean} mondayStart 달력의 시작 요일을 월요일로 설정. false일때, 일요일로 시작 (기본값: false)
 */
const DatePicker = ({ datePickerHook, mondayStart = false }: DatePickerProps) => {
    const { selectedDate, setSelecedDate } = datePickerHook;

    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
    const [isPopup, setIsPopup] = useState<boolean>(false);
    const datePickerRef = useRef<HTMLDivElement>(null);
    const dateOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

    useEffect(() => {
        const handleClickOutside = (ev: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(ev.target as Node)) {
                setIsPopup(false);
            }
        };
        document.addEventListener("click", handleClickOutside, true);

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    const dateList = (date: Date): DateType[] => {
        const handleMondayStart = (day: number) => (mondayStart ? (day + 6) % 7 : day);

        const startDate = addDays(startOfMonth(date), -handleMondayStart(startOfMonth(date).getDay()));
        const endDate = addDays(endOfMonth(date), 6 - handleMondayStart(endOfMonth(date).getDay()));

        const result: DateType[] = Array.from({ length: differenceInDays(endDate, startDate) + 1 }, (v, i) => {
            const monthType = (): DateMonthType => {
                if (addDays(startDate, i).getMonth() < date.getMonth()) return "before";
                else if (addDays(startDate, i).getMonth() === date.getMonth()) return "current";
                else return "after";
            };
            return { displayDate: addDays(startDate, i), monthType: monthType() };
        });
        return result;
    };

    const onSelectDate = (selectDate: Date) => {
        setSelecedDate(selectDate);
    };

    const onClickController = (e: any) => {
        setSelectedMonth(pre => addMonths(pre, e.target.name === "before" ? -1 : 1));
    };

    return (
        <>
            <S.PickerButton onClick={() => setIsPopup(pre => !pre)}>
                {selectedDate
                    .map(v => {
                        return format(v, "yyyy. MM. dd") + ` (${dateOfWeek[v.getDay()]})`;
                    })
                    .join(" - ")}
            </S.PickerButton>
            <S.Container
                isPopUp={isPopup}
                ref={datePickerRef}
            >
                <S.MonthController>
                    <p>{format(selectedMonth, "yyyy년 MM월")}</p>
                    <button
                        name="before"
                        onClick={onClickController}
                        className="beforeBtn"
                    >
                        down
                    </button>
                    <button
                        name="after"
                        onClick={onClickController}
                        className="afterBtn"
                    >
                        up
                    </button>
                </S.MonthController>
                <S.CalendarContainer>
                    {dateOfWeek.map((date, i) => (
                        <S.DateOfWeekCell>{dateOfWeek[mondayStart ? i : (i + 6) % 7]}</S.DateOfWeekCell>
                    ))}
                    {dateList(selectedMonth).map(vl => {
                        const isSelected = () => {
                            if (selectedDate.length <= 0) return false;
                            return selectedDate
                                .map(v => format(v, "MM/dd/yyyy"))
                                .includes(format(vl.displayDate, "MM/dd/yyyy"));
                        };
                        const includeType = (): DateIncludeType => {
                            if (selectedDate.length < 2) return "none";

                            if (format(vl.displayDate, "MM/dd/yyyy") === format(selectedDate[0], "MM/dd/yyyy"))
                                return "start";
                            else if (format(vl.displayDate, "MM/dd/yyyy") === format(selectedDate[1], "MM/dd/yyyy"))
                                return "end";
                            else if (vl.displayDate > selectedDate[0] && vl.displayDate < selectedDate[1])
                                return "between";
                            else return "none";
                        };
                        return (
                            <DateCell
                                key={format(vl.displayDate, "yyyy-MM-dd")}
                                date={vl}
                                isSelected={isSelected()}
                                includeType={includeType()}
                                onSelect={onSelectDate}
                            />
                        );
                    })}
                </S.CalendarContainer>
            </S.Container>
        </>
    );
};

export default DatePicker;
