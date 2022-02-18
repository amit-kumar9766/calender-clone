import React, { useState } from "react";
import { hours, monthNames } from "../utils";
import { ModalWeek } from "./Modal/ModalWeek";
import styled from "styled-components";

const HourContainer = styled.div`
  height: 100%;
  justify-content: space-between;
  flex-direction: column;
  border-top: 0.5px solid black;
  height: 40px;
  background-color: ${(props) => (props.color ? props?.color : "")};
`;

const DayContainer = styled.div`
  height: 100%,
  justify-content: space-between,
  flex-direction: column,
`;

export const Day = () => {
  var curr = new Date();

  const [modal, setModal] = useState<any>({});
  const [firstDay, setFirstDay] = useState(
    new Date(curr.setDate(curr.getDate()))
  );
  const returnNextDay = (day: number, curr = firstDay) => {
    return new Date(curr.setDate(curr.getDate() + day));
  };

  const presentMonth = monthNames[firstDay.getMonth()];
  const handlePrevious = () => {
    setFirstDay(returnNextDay(-1));
  };
  const handleNext = () => {
    setFirstDay(returnNextDay(1));
  };

  const handleClick = (hour: any, day: number) => {
    setModal({
      show: true,
      hour: hour,
      day: day,
    });
  };

  const handleClose = () => {
    const newObj = { ...modal };
    newObj.show = false;
    newObj.hour = "";
    newObj.day = "";
    setModal(newObj);
  };

  return (
    <>
      {firstDay.getDate()}
      {presentMonth}
      {firstDay.getFullYear()}
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrevious}>Previous</button>
      {modal?.show && <ModalWeek props={modal} onClose={handleClose} />}

      <DayContainer>
        {hours.map((hour: string, index) => {
          let booked = false;
          Object.keys(localStorage).forEach((item: any) => {
            if (
              item ===
              `${hour}.${returnNextDay(
                0
              ).getDate()}.${presentMonth}.${firstDay.getFullYear()}`
            ) {
              booked = true;
            }
          });

          let key = `${hour}.${returnNextDay(
            0
          ).getDate()}.${presentMonth}.${firstDay.getFullYear()}`;

          return (
            <HourContainer
              onClick={() => handleClick(hour, firstDay.getDate())}
              key={index}
              color={booked ? "red" : ""}
            >
              {booked ? (
                <div>
                  <div>{JSON.parse(localStorage[key])?.title}</div>
                  {JSON.parse(localStorage[key])?.description}
                </div>
              ) : (
                ""
              )}
            </HourContainer>
          );
        })}
      </DayContainer>
    </>
  );
};
