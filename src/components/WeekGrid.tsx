import React from "react";
import { hours, weekDays } from "../utils";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  height: 100%;
`;

const Tr = styled.tr`
  width: 100%;
  height: 10px;
`;

const Th = styled.th`
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  direction: column;
`;

interface WeekGridProps {
  returnNextDay: Function;
  handleClick: (hour: number, day: string | number) => void;
  presentMonth: string;
  year: string | number;
}

export const WeekGrid: React.FC<WeekGridProps> = ({
  returnNextDay,
  handleClick,
  presentMonth,
  year,
}) => {
  return (
    <Table>
      <tbody>
        <tr>
          {weekDays.map((day: string, index) => {
            return (
              <Th key={index}>
                <div>{day}</div>
                {returnNextDay(index).getDate()}
              </Th>
            );
          })}
        </tr>
        {hours?.map((hour: any, index: number) => {
          return (
            <Tr key={index}>
              {weekDays.map((week: string, i: number) => {
                let style = false;
                Object.keys(localStorage).forEach((item: string) => {
                  if (
                    item ===
                    `${hour}.${returnNextDay(
                      i
                    ).getDate()}.${presentMonth}.${year}`
                  ) {
                    style = true;
                  }
                });

                return (
                  <td
                    onClick={() =>
                      handleClick(hour, returnNextDay(i).getDate())
                    }
                    style={{
                      backgroundColor: style ? "red" : "",
                      border: "1px solid #96D4D4",
                      height: "50px",
                    }}
                    key={i}
                  >
                    {style && (
                      <div>
                        {/* {hour}
                          {returnNextDay(i).getDate()} */}
                        <div>
                          Title:
                          {
                            JSON.parse(
                              localStorage[
                                `${hour}.${returnNextDay(
                                  i
                                ).getDate()}.${presentMonth}.${year}`
                              ]
                            )?.title
                          }
                        </div>

                        <div>
                          Description:{" "}
                          {
                            JSON.parse(
                              localStorage[
                                `${hour}.${returnNextDay(
                                  i
                                ).getDate()}.${presentMonth}.${year}`
                              ]
                            )?.description
                          }
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

/* <div className="grid-item">{returnNextDay(0).getDate()}</div>
        <div className="grid-item">{returnNextDay(1).getDate()}</div>
        <div className="grid-item">{returnNextDay(2).getDate()}</div>
        <div className="grid-item">{returnNextDay(3).getDate()}</div>
        <div className="grid-item">{returnNextDay(4).getDate()}</div>
        <div className="grid-item">{returnNextDay(5).getDate()}</div>
        <div className="grid-item">{returnNextDay(6).getDate()}</div> */
// if (Object.values(obj).contains(`${hour}${week}`)) {
//   style = true;
// }

/* {hours?.map((hour: number, index: number) => {
          return (
            <div key={index}>
              {weekDays.map((week: string, i) => {
                // let style = false;
                // Object.keys(obj).forEach((x: any) => {
                //   if (x === `${hour}${week}`) {
                //     style = true;
                //   }
                // });
                console.log(i);
                return (
                  <div
                    //className="grid-item"
                    onClick={() =>
                      handleClick(hour, returnNextDay(index).getDate())
                    }
                    // style={{ background: style ? "red" : "" }}
                    key={"amit" + i}
                  >
                    {returnNextDay(i).getDate()}
                  </div>
                );
              })}
            </div>
          );
        })} */
