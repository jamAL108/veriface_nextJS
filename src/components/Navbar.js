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
    if (window.innerWidth <= 700) {
      setmobile(true);
      const ele = document.querySelector(".leftyyy");
      ele.style.display = "none";
    }
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
    <div className="navbar py-[10px] px-[20px] min-w-[1400px] w-[min(1400px , 85vw)] justify-between items-center">
      <div className="flex w-[100px] justify-center items-center mx-[10px] my-[10px]">
      <img src='./images/Vlogo.png' alt=""  />
      </div>
      <div className="leftyyy">
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
