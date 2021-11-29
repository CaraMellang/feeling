import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { toast, notice, check, Tooltip } from "react-interaction";
import Calendar from "../components/Calendar/Calendar";
import ModalPortal from "../components/Modal/ModalPortal";
import Modal from "../components/Modal/Modal";
import axios from "axios";

const Home = () => {
  const [toggle, setToggle] = useState(false);

  const toggleOn = () => {
    setToggle((prev) => !prev);
  };

  console.log(new Date().getDay());

  return (
    <HomeWrap>
      {/* {toggle && (
        <ModalPortal>
          <MyModal toggleOn={toggleOn} toggle={toggle} />
        </ModalPortal>
      )} */}

      <button
        type="button"
        className="example-button"
        onClick={() => notice("나가")}
      >
        <div>notice</div>
      </button>
      <button onClick={toggleOn}>보여주기</button>
      <p>일정들을 보여줄거임</p>
    </HomeWrap>
  );
};

const HomeWrap = styled.div`
  /* background-color: white; */
  width: 768px;
  margin: auto;
`;

export default Home;
