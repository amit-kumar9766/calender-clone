import React, { useEffect, useState } from "react";
import { monthNames } from "../utils";
import { ModalMonth } from "./Modal/ModalMonth";
import styled from "styled-components";

const Grid = styled.div`
  height: calc(100vh - 100px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 10px;
  width: calc(100vw - 100px);
`;

const GridItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  direction: column;
  background-color: ${(props) => (props.color ? props.color : "")};
`;

const Month = () => {
  const [month, setMonth] = useState<number>(-2);
  const [modal, setModal] = useState<any>({});
  const [year, setYear] = useState<number>(-2);
  let curr = new Date();
  const [firstDay, setFirstDay] = useState(
    new Date(curr.setDate(curr.getDate()))
  );

  const addMonths = function (d: any, m: number) {
    var years = Math.floor(m / 12);
    var months = m - years * 12;
    if (years) d.setFullYear(d.getFullYear() + years);
    if (months) d.setMonth(d.getMonth() + months);
    return d;
  };

  var days = function (month: number, year: number) {
    return new Date(year, month, 0).getDate();
  };

  useEffect(() => {
    setMonth(firstDay.getMonth() + 1);
    setYear(firstDay.getFullYear());
  }, [firstDay.getMonth()]);
  //need to see for useReducer!! Why firstMonth only not accepted here

  const totalDays = days(month, year);

  const handleMonthClick = (index: number) => {
    setModal({
      show: true,
      day: index,
    });
  };

  const handlePrevious = () => {
    setFirstDay(addMonths(firstDay, -1));
    setMonth(month - 1);
  };
  const handleNext = () => {
    setFirstDay(addMonths(firstDay, 1));
    setMonth(month + 1);
  };

  const handleClose = () => {
    const newObj = { ...modal };
    newObj.show = false;
    newObj.day = "";
    setModal(newObj);
  };

  return (
    <>
      {/* <SvgRightArrow /> */}
      <button onClick={handleNext}>Next</button>
      <button onClick={handlePrevious}>Previous</button>
      {monthNames[month - 1]}
      {year}
      {modal?.show && (
        <ModalMonth
          props={modal}
          onClose={handleClose}
          presentMonth={monthNames[month - 1]}
          year={year}
        />
      )}
      <Grid>
        {Array(totalDays)
          .fill(0)
          .map((item, index) => {
            let current = false;
            Object.keys(localStorage).forEach((item: any) => {
              console.log(item.split(".")[1]);
              if (item.split(".")[1] === `${index + 1}`) {
                current = true;
              }
            });
            return (
              <GridItem
                onClick={() => handleMonthClick(index)}
                color={current ? "red" : ""}
              >
                {index + 1}
              </GridItem>
            );
          })}
      </Grid>
    </>
  );
};

export default Month;
