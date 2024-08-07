import styled from "styled-components";
import { DateIncludeType, DateMonthType } from "../../datePicker/types";

export const Container = styled.div<{ isSelected: boolean; displayType: DateMonthType; includeType: DateIncludeType }>`
    display: flex;
    height: 52px;
    align-items: center;
    justify-content: center;
    position: relative;

    .dateNumber {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;

        background-color: ${props => (props.isSelected ? "#222529" : "")};
        color: ${props => {
            if (props.isSelected) return "white";
            return props.displayType === "current" ? "black" : "lightgray";
        }};
        border-radius: 50%;
        font-size: 14px;
        font-weight: 500;
    }

    & > p:hover {
        background-color: ${props => (props.isSelected ? "#222529" : "#F2F3F5")};
        cursor: pointer;
    }

    & > div {
        width: 100%;
        position: absolute;
        z-index: -1;

        // "between"일때, width 100%
        // "start"일때, 50%, margin-left: auto
        // "none"일때, background-color: ""
        .backgroundBox {
            background-color: ${props => (props.includeType !== "none" ? "#eaecef" : "")};
            margin-left: ${props => (props.includeType === "start" ? "auto" : "0px")};
            width: ${props => (props.includeType === "between" ? "100%" : "50%")};
            height: 40px;
        }
    }
`;
