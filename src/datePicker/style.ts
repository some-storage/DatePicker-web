import styled from "styled-components";

export const PickerButton = styled.button`
    font-size: 14px;
    font-weight: 700;
    background-color: white;
    border: 1.5px solid #888e96;
    border-radius: 6px;
    padding: 10px 20px;
    width: 300px;
    cursor: pointer;

    &:hover {
        background-color: #eaecef;
    }
`;

export const Container = styled.div<{ isPopUp: boolean }>`
    position: absolute;
    z-index: 1000;

    // 드래그 선택 방지
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    display: ${props => (props.isPopUp ? "flex" : "none")};
    background-color: white;
    flex-direction: column;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 350px;
    gap: 16px;
    margin-top: 10px;
`;

export const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
`;

export const DateOfWeekCell = styled.div`
    display: flex;
    font-weight: 500;
    align-items: center;
    justify-content: center;
`;

export const MonthController = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;

    .beforeBtn {
        margin-left: auto;
    }

    & > p {
        margin-left: 10px;
        font-weight: 600;
    }
`;
