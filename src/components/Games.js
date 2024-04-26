"use client";
import React, { useState, useEffect, useRef } from "react";
import "../scss/games.scss";
import { motion } from "framer-motion";
import scroll from "../utils/scroll";
import { X } from "lucide-react";
import Confetti from "react-confetti";
import ConfettiExplosion from "react-confetti-explosion";
import Quiz from "../utils/quiz";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";
const Games = () => {
  const [data, setdata] = useState([]);
  const [flag, setflag] = useState(false);
  const [rule, setrule] = useState(false);
  const [correct, setcorrect] = useState(false);
  const box = useRef(null);
  const game = useRef(null);
  const [checked, setchecked] = useState(false);
  const [fast, setfast] = useState(false);
  const [finish, setfinish] = useState(false);
  const [score, setscore] = useState(0);
  const [edition, setedition] = useState(-1);
  const [final, setfinal] = useState(false);
  // const [isLoading, setisLoading] = useState(false);
  const [size, setSize] = useState(1000);
  const [idxx, setidxx] = useState(0);
  const [cards, setCardse] = useState([]);

  useEffect(() => {
    const screenWIdth = window.innerWidth;
    if (screenWIdth > 700) {
      setSize(1000);
    } else {
      setSize(screenWIdth - 100);
    }
  }, []);

  const edarr = ["Celebrity Edition", "Politician Edition", "Random YT Video"];

  useEffect(() => {
    if (flag === false) {
      scroll("games");
      setflag(false);
      setrule(false);
      setchecked(false);
      setdata([]);
    }
  }, [flag]);

  useEffect(() => {
    if (correct === true) {
      setTimeout(() => {
        setcorrect(false);
      }, 3400);
    }
    // eslint-disable-next-line
  }, [correct]);

  useEffect(() => {
    if (rule === false && data.length !== 0) {
      let name = "#id0";
      const ele = document.querySelector(name);
      ele.style.display = "flex";
      for (let i = 1; i < data.length; i++) {
        let name = "#id" + i;
        const ele = document.querySelector(name);
        ele.style.display = "none";
      }
    }
    // eslint-disable-next-line
  }, [rule]);

  useEffect(() => {
    const handleDocumentLoad = () => {
      const cards = document.querySelectorAll(".boxu");
      // Your code to manipulate the elements goes here
    };

    // Add an event listener to the document to execute the code when it's fully loaded
    document.addEventListener("DOMContentLoaded", handleDocumentLoad);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDocumentLoad);
    };
  }, []);

  const showCard = (idxx) => {
    for (let i = 0; i < cards.length; i++) {
      if (i !== 1) {
        const el = document.querySelector("#boxu" + i);
        el.style.zIndex = 0;
      } else {
        const el = document.querySelector("#boxu" + i);
        el.style.zIndex = 1000;
      }
    }
    cards.forEach((card, index) => {
      console.log(idxx);
      if (index === -679) {
        card.style.transform = `translateX(0)`;
      } else {
        card.style.transform = `translateX(${(index - idxx) * 120}%)`;
      }
    });
  };
  showCard(idxx);

  function nextCard() {
    console.log(idxx);
    let currindex = idxx + 1;
    const ele = document.querySelector("#boxu" + currindex);
    ele.style.transform = "translateX(0%)";
    const el1 = document.querySelector("#boxu" + idxx);
    el1.style.animation = "prev 1s ease";
    console.log(currindex);
    setidxx(currindex);
  }
  function prevCard() {
    let currindex = idxx - 1;
    const ele = document.querySelector("#boxu" + currindex);
    ele.style.transform = "translateX(0%)";
    const el1 = document.querySelector("#boxu" + idxx);
    el1.style.animation = "trans 1s ease";
    setidxx(currindex);
  }

  return (
    <div
      className="games bg-accent !w-[min(1400px , 85vw)] flex flex-col !items-center !justify-start"
      ref={game}
    >
      <motion.h2
        className="text-4xl font-[440] px-[30px] py-[30px]"
        initial={{ opacity: 0, x: -150 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, type: "Spring", bounce: 0.4 }}
      >
        DeepFake challenge
      </motion.h2>
      <div className="w-full h-[calc(100%_-_4rem)] flex justify-center items-center">
        <Carousel>
          <CarouselContent className="max-w-[820px] min-h-[min(430px,90%)] max-h-[500px]">
            {Quiz.map((item, idx) => (
              <CarouselItem
                key={idx}
                className="w-[770px] min-h-[430px] !rounded-xl max-h-[500px] flex  justify-center items-center"
              >
                <div className="p-1 w-[770px] min-h-[430px] max-h-[500px] !rounded-xl">
                  <Card className="w-[770px] min-h-[430px] max-h-[500px] !rounded-xl">
                    <CardContent className="flex w-[770px] min-h-[430px] max-h-[500px] !rounded-xl items-center gap-[30px] justify-center p-6">
                      <img
                        src={item.cover}
                        className="w-[320px] h-[210px]"
                        alt="ef"
                      />
                      <div className="flex flex-col gap-6">
                        <p>
                          {item.heading}{" "}
                          <span className="text-primary">{item.context}.</span>
                        </p>
                        <p>{item.focus}.</p>
                        <Button
                          className="min-w-[80px] max-w-[130px] px-[15px]  py-[4px]"
                          onClick={(e) => {
                            e.preventDefault();
                            setflag(true);
                            setrule(true);
                            setdata(item.data);
                            setedition(item.edition);
                            setchecked(false);
                          }}
                        >
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {flag === true && (
        <div className="cover z-[100]">
          {correct && (
            <>
              <Confetti className="confetti" />
            </>
          )}
          <Dialog open={flag} onOpenChange={setflag}>
            <DialogContent className="max-w-[80vw] h-[78vh] flex flex-col px-[0px] py-[10px] !overflow-hidden">
              {correct && <ConfettiExplosion />}
              <div className="flex w-full py-[20px] px-[25px]">
                <img
                  src="./images/Vlogo.png"
                  alt="asd"
                  className="w-[60px] h-[60px]"
                />
              </div>
              <img
                src="./images/tp2.png"
                alt=""
                className="absolute border z-0 bottom-0 right-[-9%] w-[290px] h-[75%] opacity-[0.4]"
              />
              {rule === true ? (
                <div className="w-full h-[calc(100%_-_5rem)] flex justify-center items-center">
                  <div className="w-[75%] h-[90%] flex flex-col gap-[25px]">
                    <h1 className="text-xl font-[600]">How to Play -</h1>
                    <ul className="gap-2">
                      <li className="flex items-center gap-4">
                        <ChevronRight size={22} />
                        You will be shown a series of celebrities&quot; video
                        clips.
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight size={22} />
                        Your task is to determine if each video is real or a
                        deepfake.
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight size={22} />
                        Click on &quot;Real&quot; or &quot;Deepfake&quot; to
                        make your choice.
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight size={22} />
                        The authentic video for Every Deepfake edited video will
                        be shown after selecting an option.
                      </li>
                      <li className="flex items-center gap-3">
                        <ChevronRight size={22} />
                        No audio will be there , analyze the Face and make ur
                        guess.
                      </li>
                    </ul>
                    <Button
                      className="max-w-[100px]"
                      onClick={(e) => {
                        e.preventDefault();

                        setrule(false);
                      }}
                    >
                      less go !
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {finish === false &&
                    data?.map((item, idx) => (
                      <motion.div
                        className="box"
                        key={idx}
                        id={`id${idx}`}
                        initial={{ opacity: 0, x: size }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.7,
                          type: "Spring",
                          bounce: 0.8,
                        }}
                      >
                        <div className="left">
                          {fast === true && item.result === 0 && (
                            <div
                              className="appear"
                              initial={{ scale: 0 }}
                              viewport={{ once: true }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 4,
                                type: "Spring",
                                bounce: 0.9,
                              }}
                            >
                              <div className="ans">
                                <h1>
                                  The video was DeepFake edit , Here is the
                                  Original video.
                                </h1>
                              </div>
                              <video loop autoPlay controls>
                                <source src={item.real} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                          {fast === true && item.result === 1 && (
                            <motion.h1
                              initial={{ scale: 0 }}
                              viewport={{ once: true }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              The Video is Authentic
                            </motion.h1>
                          )}
                          {(fast === false || item.result === 1) && (
                            <video loop autoPlay controls>
                              <source src={item.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                        <div className="right">
                          {checked === false && (
                            <div className="upar" id={`upar${idx}`}>
                              <button
                                className="wrong"
                                id={`wrong${idx}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setfast(true);
                                  if (item.result === 0) {
                                    let tem = score;
                                    setscore(++tem);
                                    setcorrect(true);
                                    setchecked(true);
                                    setfinal(true);
                                  } else {
                                    let btn = document.querySelector(
                                      `#wrong${idx}`
                                    );
                                    btn.style.animation = "vibrate 0.7s ease";
                                    btn.addEventListener("animationend", () => {
                                      setchecked(true);
                                    });
                                  }
                                }}
                              >
                                Deepfake
                              </button>
                              <button
                                className="correct"
                                id={`correct${idx}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setfast(true);
                                  if (item.result === 1) {
                                    let tem = score;
                                    setscore(++tem);
                                    setcorrect(true);
                                    setchecked(true);
                                    setfinal(true);
                                  } else {
                                    let btn = document.querySelector(
                                      `#correct${idx}`
                                    );
                                    btn.style.animation = "vibrate 0.7s ease";
                                    btn.addEventListener("animationend", () => {
                                      setchecked(true);
                                    });
                                  }
                                }}
                              >
                                Real
                              </button>
                            </div>
                          )}
                          {checked === true && (
                            <div
                              className="niche"
                              initial={{ scale: 0 }}
                              viewport={{ once: true }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.6,
                                type: "Spring",
                                bounce: 0.9,
                              }}
                              id={final === true ? "correct" : "wrong"}
                            >
                              {final === true ? (
                                <h2>You Guessed it Correct</h2>
                              ) : (
                                <h2>You Guess it Wrong</h2>
                              )}
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  let el1 = document.querySelector("#id" + idx);
                                  el1.style.position = "relative";
                                  el1.style.animation = "left_go 1s ease";
                                  el1.addEventListener("animationend", () => {
                                    el1.style.display = "none";
                                    let next = idx + 1;
                                    if (next < data.length) {
                                      let el2 = document.querySelector(
                                        "#id" + next
                                      );
                                      el2.style.display = "flex";
                                    } else {
                                      setfinish(true);
                                    }
                                    setchecked(false);
                                    setcorrect(false);
                                    setfast(false);
                                    setfinal(false);
                                  });
                                }}
                              >
                                Next Video
                              </button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  {finish === true && (
                    <div className="finish">
                      <div className="score">
                        <h1>Your Score :</h1>
                        <h3>
                          {score}/{data.length} correct guess
                        </h3>
                      </div>
                      <div className="more">
                        <h1>Similar Challenges -</h1>
                        <div className="boxes">
                          <div className="box"></div>
                          <div className="box"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </DialogContent>
          </Dialog>
          {/* <motion.div
            className="block !bg-card"
            ref={box}
            initial={{ scale: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, type: "Spring", bounce: 0.9 }}
          >
            {correct && <ConfettiExplosion />}
            <div className="up">
              <img src="./images/Vlogo.png" alt="asd" />
              <X
                size={30}
                color="black"
                className="icon"
                onClick={(e) => {
                  e.preventDefault();
                  document.body.style.overflowY = "scroll";
                  const temp = game.current;
                  const ar = document.querySelectorAll(".boxu");
                  console.log(ar);
                  for (var i = 0; i < ar.length; i++) {
                    console.log("Heuyy");
                    ar[i].style.backgroundColor = "white";
                  }
                  temp.style.backgroundColor = "#292524";
                  scroll("games");
                  setflag(false);
                  setrule(false);
                  setchecked(false);
                  setdata([]);
                }}
              />
            </div>
            <img src="./images/tp2.png" alt="" className="image" />
            {rule === true ? (
              <div className="rules text-black">
                <h1 className="text-xl font-[600]">How to Play -</h1>
                <ul>
                  <li>
                    You will be shown a series of celebrities&quot; video clips.
                  </li>
                  <li>
                    Your task is to determine if each video is real or a
                    deepfake.
                  </li>
                  <li>
                    Click on &quot;Real&quot; or &quot;Deepfake&quot; to make
                    your choice.
                  </li>
                  <li>
                    The authentic video for Every Deepfake edited video will be
                    shown after selecting an option.
                  </li>
                  <li>
                    No audio will be there , analyze the Face and make ur guess.
                  </li>
                </ul>
                <button
                  onClick={(e) => {
                    e.preventDefault();

                    setrule(false);
                  }}
                >
                  Vamoos !
                </button>
              </div>
            ) : (
              <>
                {finish === false &&
                  data?.map((item, idx) => (
                    <motion.div
                      className="box"
                      key={idx}
                      id={`id${idx}`}
                      initial={{ opacity: 0, x: size }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.7,
                        type: "Spring",
                        bounce: 0.8,
                      }}
                    >
                      <div className="left">
                        {fast === true && item.result === 0 && (
                          <div
                            className="appear"
                            initial={{ scale: 0 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 4,
                              type: "Spring",
                              bounce: 0.9,
                            }}
                          >
                            <div className="ans">
                              <h1>
                                The video was DeepFake edit , Here is the
                                Original video.
                              </h1>
                            </div>
                            <video loop autoPlay controls>
                              <source src={item.real} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        )}
                        {fast === true && item.result === 1 && (
                          <motion.h1
                            initial={{ scale: 0 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            The Video is Authentic
                          </motion.h1>
                        )}
                        {(fast === false || item.result === 1) && (
                          <video loop autoPlay controls>
                            <source src={item.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                      <div className="right">
                        {checked === false && (
                          <div className="upar" id={`upar${idx}`}>
                            <button
                              className="wrong"
                              id={`wrong${idx}`}
                              onClick={(e) => {
                                e.preventDefault();
                                setfast(true);
                                if (item.result === 0) {
                                  let tem = score;
                                  setscore(++tem);
                                  setcorrect(true);
                                  setchecked(true);
                                  setfinal(true);
                                } else {
                                  let btn = document.querySelector(
                                    `#wrong${idx}`
                                  );
                                  btn.style.animation = "vibrate 0.7s ease";
                                  btn.addEventListener("animationend", () => {
                                    setchecked(true);
                                  });
                                }
                              }}
                            >
                              Deepfake
                            </button>
                            <button
                              className="correct"
                              id={`correct${idx}`}
                              onClick={(e) => {
                                e.preventDefault();
                                setfast(true);
                                if (item.result === 1) {
                                  let tem = score;
                                  setscore(++tem);
                                  setcorrect(true);
                                  setchecked(true);
                                  setfinal(true);
                                } else {
                                  let btn = document.querySelector(
                                    `#correct${idx}`
                                  );
                                  btn.style.animation = "vibrate 0.7s ease";
                                  btn.addEventListener("animationend", () => {
                                    setchecked(true);
                                  });
                                }
                              }}
                            >
                              Real
                            </button>
                          </div>
                        )}
                        {checked === true && (
                          <div
                            className="niche"
                            initial={{ scale: 0 }}
                            viewport={{ once: true }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.6,
                              type: "Spring",
                              bounce: 0.9,
                            }}
                            id={final === true ? "correct" : "wrong"}
                          >
                            {final === true ? (
                              <h2>You Guessed it Correct</h2>
                            ) : (
                              <h2>You Guess it Wrong</h2>
                            )}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                let el1 = document.querySelector("#id" + idx);
                                el1.style.position = "relative";
                                el1.style.animation = "left_go 1s ease";
                                el1.addEventListener("animationend", () => {
                                  el1.style.display = "none";
                                  let next = idx + 1;
                                  if (next < data.length) {
                                    let el2 = document.querySelector(
                                      "#id" + next
                                    );
                                    el2.style.display = "flex";
                                  } else {
                                    setfinish(true);
                                  }
                                  setchecked(false);
                                  setcorrect(false);
                                  setfast(false);
                                  setfinal(false);
                                });
                              }}
                            >
                              Next Video
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                {finish === true && (
                  <div className="finish">
                    <div className="score">
                      <h1>Your Score :</h1>
                      <h3>
                        {score}/{data.length} correct guess
                      </h3>
                    </div>
                    <div className="more">
                      <h1>Similar Challenges -</h1>
                      <div className="boxes">
                        <div className="box"></div>
                        <div className="box"></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div> */}
        </div>
      )}
    </div>
  );
};

export default Games;
