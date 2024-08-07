import { DateIncludeType, DateType } from "../../datePicker/types";
import * as S from "./style";

type DateCellProps = {
    date: DateType;
    isSelected: boolean;
    includeType: DateIncludeType;
    onSelect: (selectDate: Date) => void;
};

const DateCell = ({ date, onSelect, ...props }: DateCellProps) => {
    return (
        <S.Container
            displayType={date.monthType}
            onClick={() => onSelect(date.displayDate)}
            {...props}
        >
            <p className="dateNumber">{date.displayDate.getDate()}</p>
            <div>
                <div className="backgroundBox"></div>
            </div>
        </S.Container>
    );
};

export default DateCell;
