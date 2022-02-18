import React, { useState } from "react";
import { monthNames } from "../utils";
import { ModalWeek } from "./Modal/ModalWeek";
import { WeekGrid } from "./WeekGrid";
import styled from "styled-components";

const WeekContainer = styled.div`
  margin-top: 10px;
`;

export const Week = () => {
  var curr = new Date();

  const [modal, setModal] = useState<any>({});
  const [firstDay, setFirstDay] = useState(
    new Date(curr.setDate(curr.getDate() - curr.getDay()))
  );

  const returnNextDay = (day: any, curr = firstDay) => {
    return new Date(curr.setDate(curr.getDate() - curr.getDay() + day));
  };

  const presentMonth = monthNames[firstDay.getMonth()];

  const handlePrevious = () => {
    setFirstDay(returnNextDay(-7));
  };
  const handleNext = () => {
    console.log(returnNextDay(0).getDate());
    setFirstDay(returnNextDay(7));
  };

  const handleClick = (hour: number, day: string | number) => {
    setModal({
      show: true,
      hour: hour,
      day: day,
    });
  };

  const handleClose = () => {
    const newObj = { ...modal };
    newObj.show = false;
    // newObj.hour = "";
    // newObj.week = "";
    setModal(newObj);
  };

  return (
    <>
      <WeekContainer>
        {presentMonth}
        {firstDay.getFullYear()}
      </WeekContainer>
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrevious}>Previous</button>

      {modal?.show && (
        <ModalWeek
          props={modal}
          onClose={handleClose}
          presentMonth={presentMonth}
          year={firstDay.getFullYear()}
        />
      )}
      <WeekGrid
        returnNextDay={returnNextDay}
        handleClick={handleClick}
        presentMonth={presentMonth}
        year={firstDay.getFullYear()}
      />
    </>
  );
};
