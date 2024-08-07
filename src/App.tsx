import React from "react";
import DatePicker from "./datePicker/DatePicker";
import { useDatePicker } from "./util/datePickerUtils/useDatePicker";

function App() {
    const pickerHook = useDatePicker();

    return (
        <>
            <DatePicker
                datePickerHook={pickerHook}
                mondayStart={true}
            />
            <div>{pickerHook.selectedDate.join(" - ")}</div>
        </>
    );
}

export default App;
