'use client';
import React, { useEffect, useState } from "react";
import SegmentIcon from "@mui/icons-material/Segment";
import "../scss/nav.scss";
import Scroll from "../utils/scroll";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [mobile, setmobile] = useState(false);
  const [flag, setflag] = useState(false);
  useEffect(() => {
    setflag(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   if (window.innerWidth <= 700) {
  //     setmobile(true);
  //   } else {
  //     setmobile(false);
  //   }
  //   setflag(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [window.innerWidth]);

  const close = () => {
    const ele = document.querySelector(".leftyyy");
    ele.style.display = "none";
    setflag(false);
  };
  return (
    <div className="py-[10px] min-w-[min(1400px,90%)] flex h-[5.5rem]  w-[min(1400px , 90vw)] justify-between items-center">
      <div className="flex w-[100px] justify-center items-center my-[10px]">
      <img src='./images/Vlogo.png' alt=""  className="w-[100px] h-[80px]" />
      </div>
      <div className="px-[10px] base:hidden bl:flex items-center justify-center gap-[30px]">
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
            Scroll("inst");
          }}
        >
          Guide
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
            Scroll("deepfake");
          }}
        >
          Detect Videos
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
            Scroll("games");
          }}
        >
          Games
        </button>
        <button>Creators</button>
      </div>
      {mobile === true && (
        <>
          {flag === false ? (
            <SegmentIcon
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.querySelector(".leftyyy");
                elem.style.display = "flex";
                setflag(true);
              }}
            />
          ) : (
            <CloseIcon
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                const elem = document.querySelector(".leftyyy");
                elem.style.display = "none";
                setflag(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
