import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import ModalPortal from "../Modal/ModalPortal";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { TODOS_REQUEST } from "../../modules/redux/Todos";

interface CalendarBodyProps {
  currentMonth: Dayjs;
  setCurrentMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  completeHandle(bool: boolean): void;
  complete: boolean;
  // getCurrentDates:
}

export interface DateInfo {
  date: number;
  month: number;
  fulldate: string;
  descrition: string;
  todos: Todo[];
}
interface Todo {
  _id: string;
  creatorId: string;
  todo: string;
  success: boolean;
  createdAt: string;
  updatedAt: string;
}

const CalendarBody = ({
  currentMonth,
  setCurrentMonth,
  completeHandle,
  complete,
}: CalendarBodyProps) => {
  const [dates, setDates] = useState<DateInfo[]>([
    { date: 1, month: 2, fulldate: "지s", descrition: "string", todos: [] },
  ]);
  // let dates: Array<DateInfo> = [];

  const [dateModalToggle, setDateModalToggle] = useState(false);
  const [clickDate, setClickDate] = useState(0);
  const userSelector: any = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [toggle, setToggle] = useState(false);
  const daysArray = ["일", "월", "화", "수", "목", "금", "토"];

  const paintCalendar = async (userSliceReducer: any) => {
    let dateArray: DateInfo[] = [];

    const todoDatas = await getCurMonthData(userSliceReducer);
    // console.log("투두뗴이팄", todoDatas);

    dayjs(currentMonth).set("date", 0).get("date");
    const prevLastDay = dayjs(currentMonth).set("date", 0).get("day");
    for (let i = 0; i <= 6; i++) {
      let data: DateInfo = {
        date: 404,
        month: currentMonth.get("month"),
        fulldate: currentMonth.format("YYYY-MM-DD"),
        descrition: "공란날짜임",
        todos: [],
      };
      dateArray.push(data);
      if (i === 6) {
        console.log("첫줄 캇!");
        dateArray = [];
      }
      if (i === prevLastDay) {
        console.log(prevLastDay);
        break;
      }
    }
    // firtsRow();
    for (
      let i = 1;
      i <= dayjs(currentMonth).add(1, "month").set("date", 0).get("date");
      i++
    ) {
      // setDates((prevState) => [...prevState, i]);

      let data: DateInfo = {
        date: i,
        month: currentMonth.get("month"),
        fulldate: currentMonth.set("date", i).format("YYYY-MM-DD"),
        descrition: "잘됨",
        todos: [],
      };
      todoDatas?.forEach((arrData: any) => {
        if (dayjs(new Date(arrData.createdAt.slice(0, 19))).get(`date`) === i) {
          data.todos?.push(arrData);
        }
      });
      dateArray.push(data);
    }
    const thisLastDay = dayjs(currentMonth)
      .add(1, "month")
      .set("date", 0)
      .get("day");
    for (let i = 0; i <= 6; i++) {
      if (thisLastDay < i) {
        let data: DateInfo = {
          date: 404,
          month: currentMonth.get("month"),
          fulldate: currentMonth.format("YYYY-MM-DD"),
          descrition: "공란날짜임",
          todos: [],
        };
        dateArray.push(data);
      }
    }

    // console.log(dateArray);
    // console.log(dateArray);
    setDates(dateArray);
    // dates = dateArray;
    completeHandle(true);
    // setDates(dateArray);
    // console.log("tlqkffusdk", complete);
    // console.log(dateArray);
  };

  const toggleClick = () => {
    setDateModalToggle(!dateModalToggle);
  };

  const dateClick = (e: any) => {
    // // console.log(e.target);
    // // console.log(e.currentTarget);
    // // if (e.target !== e.currentTarget) {
    // //   return;
    // // }
    // console.log(e);
    // const yValue = window.scrollY;
    // // document.body.style.cssText = `position: fixed; top: -${yValue}px`;
    // const text =
    //   dummy.fulldate === e.currentTarget.title ? dummy.descrition : "";
    // document.body.style.overflow = "hidden";
    // notice(
    //   `클릭하신 날짜는 ${e.currentTarget.title} 입니다. ${`\n` + text}`
    // ).then(() => {
    //   // document.body.style.cssText = `position: unset ; top: -${yValue}px`; //모바일도 대응 근데 좀 손봐야함
    //   document.body.style.overflow = "unset";
    // });
    const intVal = parseInt(e.currentTarget.dataset.value);
    setClickDate(intVal);
    setDateModalToggle(!dateModalToggle);
    // console.log("너 실행하냐?");
    // console.log(e.currentTarget.dataset.value);
    // console.log("eee", e.currentTarget);
  };

  const getCurMonthData = async (userSliceReducer: any) => {
    const { user } = userSliceReducer;
    const data = {
      userId: user.userId,
      year: currentMonth.toDate().getFullYear(),
      month: currentMonth.toDate().getMonth() + 1,
      date: currentMonth.toDate().getDate(),
      // date: dayjs(currentDate).toDate().getMonth() + 1,
      gd: "???",
    };
    const todos = await axios.post(
      "http://localhost:5000/todo/findcurrmonth",
      data
    );
    // console.log("실패했나,,,",todos.data.data," 길이",todos.data.data.length);
    if (todos.data.data.length === 0) {
      // console.log("얘! 데이터가 비어있단다!");
      return;
    }

    console.log(
      `getCurMonthData 현재 날짜 월${
        currentMonth.get(`month`) + 1
      } 일: ${currentMonth.get(`date`)}`
    );

    return todos.data.data;
  };

  useEffect(() => {
    const { userSliceReducer, todosSliceReducer } = userSelector;
    // console.log(userSliceReducer);
    if (complete === false) {
      paintCalendar(userSliceReducer);
      console.log("컴플리트 실행");

      const token = userSliceReducer.user.accessToken;
      const userId = userSliceReducer.user.userId;
      dispatch(TODOS_REQUEST({ token, userId }));
      console.log(
        todosSliceReducer.todosSucceed,
        todosSliceReducer.todosLoading
      );
      if (todosSliceReducer.todosSucceed) {
        console.log(
          "ㄹ릴낟달;ㅇ?",
          todosSliceReducer.todos[0].createdAt,
          todosSliceReducer.todos[0].todo,
          // typeof todosSliceReducer.todos[0].createdAt,
          dayjs(
            new Date(todosSliceReducer.todos[0].createdAt.slice(0, 19))
          ).format("YYYY-MM-DD HH:mm:ss")
        );
      }
    }
    // console.log("ddd", dates);
    console.log("리렌더!");
    return () => {
      console.log("사라짐");
    };
  }, [currentMonth, complete]);

  return (
    <CalendarBodyWrap>
      <CalendarDayarray>
        {daysArray.map((item, index) => (
          <div key={index} className="daysblock">
            <div className="days">{item}</div>
          </div>
        ))}
      </CalendarDayarray>
      <CalendarDates>
        {dates.map((i, index) => {
          // console.log(i.todos[0].creatorId);
          if (i.date === 404) {
            return (
              <div className="date-box " key={index}>
                <div className="date ">
                  <div className="date-box-non">{""}</div>
                </div>
              </div>
            );
          }
          if (i.todos.length !== 0) {
            return (
              <div className="date-box" key={index}>
                <div
                  className="date"
                  onClick={dateClick}
                  title={i.fulldate}
                  data-value={i.date}
                >
                  <div className={`ddate red`}>
                    <div>{i.date}</div>
                    <div>
                      {dateModalToggle && clickDate === i.date ? (
                        <ModalPortal>
                          <Modal
                            toggleClick={toggleClick}
                            dateModalToggle={dateModalToggle}
                            DateInfo={i}
                            completeHandle={completeHandle}
                          />
                        </ModalPortal>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="date-box" key={index}>
              <div
                className="date"
                onClick={dateClick}
                title={i.fulldate}
                data-value={i.date}
              >
                <div className={`ddate`}>
                  <div>{i.date}</div>
                  <div>
                    {dateModalToggle && clickDate === i.date ? (
                      <ModalPortal>
                        <Modal
                          toggleClick={toggleClick}
                          dateModalToggle={dateModalToggle}
                          DateInfo={i}
                          completeHandle={completeHandle}
                        />
                      </ModalPortal>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CalendarDates>
    </CalendarBodyWrap>
  );
};
const CalendarBodyWrap = styled.div`
  padding: 1rem;
  background: rgb(168, 237, 234);
  background: linear-gradient(
    0deg,
    rgba(168, 237, 234, 1) 0%,
    rgba(254, 214, 227, 1) 100%
  );
`;
const CalendarDayarray = styled.div`
  display: flex;
  color: white;
  padding-bottom: 0.4rem;
  .daysblock {
    text-align: center;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    width: calc(100% / 7);
  }
  .days {
    box-sizing: border-box;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background-color: none;
    color: black;
    font-weight: bold;
  }
`;
const CalendarDates = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: white;
  .date-box {
    cursor: pointer;
    width: calc(100% / 7);
    height: 5rem;
  }
  .date {
    box-sizing: border-box;
    padding-right: 0.1rem;
    padding-left: 0.1rem;
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    height: 100%;
  }
  .ddate {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    padding: 0.25rem;
    box-sizing: border-box;
    height: 100%;
  }
  .date-box-non {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 6px;
    padding: 0.25rem;
    box-sizing: border-box;
    height: 100%;
  }
  .red {
    background-color: red;
  }
`;

export default CalendarBody;
// export default React.memo(CalendarBody);
