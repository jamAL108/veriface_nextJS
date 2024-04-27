"use client";
import React, { useEffect, useRef, useState } from "react";
import "../scss/deepfake.scss";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ColorRing } from "react-loader-spinner";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { RotateCcw, Copy, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Scissors } from 'lucide-react';

const Deepfake = () => {
  const { toast } = useToast();
  const inputRef = useRef(null);
  const [video, setvideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [flag, setflag] = useState(false);
  const [reaction, setreaction] = useState(-1);
  const color_code = ["#0ED23A", "#FF2A2A", "#FFB818"];
  const arr_emoji = [
    "./images/green.png",
    "./images/red.png",
    "./images/error.png",
  ];
  //const [points,setpoints] = useState({})
  const [temp, settemp] = useState(videoUrl);
  const [api, setapi] = useState(false);
  const abortcontroller = useRef(null);
  const [result, setresult] = useState(null);

  const [URL, setURL] = useState("");
  const [getURLOpen, setGetURLOpen] = useState(false);
  const [loadURLFetch, setLoadURLFetch] = useState(false);
  const [linkName, setlinkName] = useState("youtube");

  useEffect(() => {
    console.log(video);
    if (video) {
      console.log("video yes");
      const element = document.querySelector(".down");
      element.style.display = "flex";
      element.style.borderTop = "3px dashed #bec0da;";
    } else {
      console.log("video no");
      const element = document.querySelector(".down");
      element.style.display = "none";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files[0];
    if (!fileObj) {
      // setreaction(-1);
      return;
    }
    if (fileObj) {
      if (fileObj.size <= 30 * 1024 * 1024 && fileObj.type === "video/mp4") {
        console.log(fileObj);
        setVideoUrl(window.URL.createObjectURL(fileObj));
        console.log(window.URL.createObjectURL(fileObj));
        const data = new FormData();
        data.append("file", fileObj);
        setvideo(data);
        const file = fileObj;
        console.timeLog(file);
        for (var key of data.entries()) {
          console.log(key[0] + ", " + key[1]);
        }
        // API(data)
        //console.log("data proper")
      } else {
        // setreaction(-1);
        alert("Please select an MP4 video file (max 30MB).");
      }
    }
    // console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;
  };

  useEffect(() => {
    if (flag === true && temp !== videoUrl) {
      settemp(videoUrl);
      const element2 = document.querySelector(".img");
      element2.style.display = "flex";
      element2.style.animation = "increaseWidth 50s forwards";
      const element3 = document.querySelector(".image");
      element3.style.animation = "blink 2s infinite";
    } else {
      const element2 = document.querySelector(".img");
      element2.style.display = "none";
      //  setreaction(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);

  const API = async (data) => {
    setapi(true);
    console.log(data);
    console.log("wennjdkfuihywbhdn");
    try {
      abortcontroller.current = new AbortController();
      const res = await fetch("http://localhost:5000/detect", {
        signal: abortcontroller.current.signal,
        method: "POST",
        headers: {
          "X-Abort-Request": "true",
        },
        body: data,
      });
      const msg = await res.json();
      if (msg) {
        const element2 = document.querySelector(".img");
        const element3 = document.querySelector(".videowala");
        element2.style.animation = "restWidth 3s linear";
        element2.addEventListener(
          "animationend",
          function () {
            element2.style.display = "none";
            element3.style.animation = "none";
            element3.style.animation = "autoScale 0.6s ease";
            if (window.innerWidth > 700) {
              element3.style.height = "280px";
            } else if (window.innerWidth < 700 && window.innerWidth > 400) {
              element3.style.height = "250px";
            } else if (window.innerWidth < 400) {
              element3.style.height = "220px";
            }
            element3.style.borderRadius = "25px";
            element3.style.border = `5px solid ${color_code[msg.code]}`;
            setreaction(msg.code);

            element3.addEventListener(
              "animationend",
              function () {
                const ele = document.querySelector(".up");
                const own = document.querySelector(".down");
                ele.style.display = "flex";
                own.style.display = "none";
                setapi(false);
                setresult(msg.result);
              },
              { once: true }
            );
          },
          { once: true }
        );
      }
      console.log(msg);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (reaction !== -1) {
      const element = document.querySelector(".videowala");
      // const rect = element.getBoundingClientRect();
      //  const relativeBottom = rect.top;
      //    const relativeRight = rect.left;
      const parentElement = document.querySelector("#left");
      const elementRect = element.getBoundingClientRect();
      const parentRect = parentElement.getBoundingClientRect();

      const relativeTop = elementRect.top - parentRect.top;
      const relativeLeft = elementRect.left - parentRect.left;
      console.log(relativeTop);
      console.log(relativeLeft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reaction]);

  const cancelrequest = () => {
    abortcontroller.current && abortcontroller.current.abort();
  };

  // const buttony = document.querySelector("#helloo"); // You can select the button by its ID, class, or other attributes.
  // const children = document.querySelectorAll(".child");
  // if (buttony && children) {
  //   buttony.addEventListener("mouseover", () => {
  //     children.forEach((child) => {
  //       child.style.transform = "scale(1.1)";
  //     });
  //   });

  //   buttony.addEventListener("mouseout", () => {
  //     children.forEach((child) => {
  //       child.style.transform = "none";
  //     });
  //   });
  // }

  useEffect(() => {
    const buttony = document.querySelector("#helloo");
    const children = document.querySelectorAll(".child");

    const handleMouseOver = () => {
      children.forEach((child) => {
        child.style.transform = "scale(1.1)";
      });
    };

    const handleMouseOut = () => {
      children.forEach((child) => {
        child.style.transform = "none";
      });
    };

    if (buttony && children) {
      buttony.addEventListener("mouseover", handleMouseOver);
      buttony.addEventListener("mouseout", handleMouseOut);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (buttony && children) {
        buttony.removeEventListener("mouseover", handleMouseOver);
        buttony.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  const URLFetch = async () => {
    setLoadURLFetch(true);
    try {
      if (URL.length === 0) {
        setLoadURLFetch(false);
        toast({
          variant: "destructive",
          title: "Empty Link",
          description: "Please enter a valid URL",
        });
        return;
      }

      const response = await fetch("http://localhost:5000/getvideofromlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_url: URL, linkFrom: linkName }),
      });
      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Server Error",
          description: "There is a issue in server",
        });
      }
      const videoBlob = await response.blob();
      const videoUrlObject = window.URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrlObject);
      const data = new FormData();
      data.append("file", videoBlob);
      setvideo(data);
      setLoadURLFetch(false);
      setGetURLOpen(false);
    } catch (err) {
      console.log(err);
      setLoadURLFetch(false);
      setGetURLOpen(false);
    }
  };

  return (
    <div className="deepfake  min-w-[1300px] w-[min(1300px , 85%)] max-w-[1700px] py-[50px] flex justify-center items-center">
      <div
        className="left h-full gap-[45px] flex flex-col justify-center items-center w-[45%] "
        id="left"
      >
        {videoUrl ? (
          <motion.video
            initial={{ scale: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="videowala relative opacity-1 !w-[500px] rounded-lg !h-[300px] object-cover z-1 mt-[0]"
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
          </motion.video>
        ) : (
          <div
            id="helloo"
            className="w-[500px] !h-[300px] z-[1000] 
          border-[3px] border-dashed border-primary/10 rounded-lg  flex justify-center items-center flex-col text-[0.9rem] !bg-muted/80"
            onClick={(e) => {
              e.preventDefault();
              setvideo(null);
              setVideoUrl(null);
              setflag(false);
              setreaction(-1);
              handleClick();
              setresult(null);
              e.stopPropagation();
            }}
          >
            <p className="child mb-[0.3rem] mt-[0.3rem] transition duration-100 ease-in text-[0.9rem] opacity-[0.8] ">
              Upload your Videos
            </p>
            <p className="child mb-[0.3rem] mt-[0.3rem] transition duration-100 ease-in text-[0.9rem] opacity-[0.8]">
              Upto 30 mb of video & mp4 format only!
            </p>
          </div>
        )}
        {reaction !== -1 && (
          <div className="w-[550px] z-[10000]  h-[100px] flex justify-end mt-[-100px] mr-[-75px]">
            <img src={arr_emoji[0]} alt="fv" className="react" />
          </div>
        )}
        <div className="image">
          <img src="./images/load.png" alt="" className="img" id="immg" />
        </div>
        {reaction === -1 && (
          <div
            className="w-[500px] !h-[300px] z-[100] 
          border-[3px] border-dashed border-primary/10 rounded-lg flex justify-center items-center flex-col text-[0.9rem] !bg-muted/80"
          >
            <p>Result will be displayed here.</p>
          </div>
        )}
        {result && (
          <motion.Card
            initial={{ scale: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden w-[500px] border rounded-lg mt-[-48px]"
            x-chunk="dashboard-05-chunk-4"
          >
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-1.5">
                <CardTitle
                  className="group flex items-center gap-2 text-lg w-full text-[0.96rem] leading-[20px]"
                  style={
                    result.Faces === 0
                      ? { color: "#ff3333", opacity: 1 }
                      : { fontSize: "1.3rem" }
                  }
                >
                  {result.message}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">copy</span>
                  </Button>
                </CardTitle>
                <CardDescription className="text-xs">
                  As Veriface is in beta, the results aren't absolute truth ,
                  don't consider this as an evidence.
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    setresult(null);
                    API(video);
                    setflag(true);
                    setreaction(-1);
                  }}
                  className="h-8 gap-1"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Retry
                  </span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm bg-card">
              <div className="grid gap-3">
                <div className="font-semibold">Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Frames</span>
                    <span>{result.Frames}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total Faces in those frames
                    </span>
                    <span>{result.Faces}</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total Deepfake Faces %
                    </span>
                    <span>{result.Deepfake.toFixed(2)}%</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Total Real Faces %
                    </span>
                    <span>{result.Real.toFixed(2)}%</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </motion.Card>
        )}
      </div>

      <div className="right min-w-[45%] w-[45%] h-full relative flex flex-col justify-center items-center gap-[100px] ">
        <div className="w-full flex justify-center items-center">
          <div className="h-[140px] w-[55%] px-[15px] py-[10px] bg-muted/80 border-dashed border-[3px] border-primary/10 rounded-lg flex justify-center items-center opacity-[0.5] ">
            <p className="text-xs text-center">
              Veriface aims to give an opinion about the scanned video and is
              not responsible for the result. As Veriface is still in beta, the
              results should not be treated as an absolute truth or evidence.
            </p>
          </div>
        </div>

        <div className="box !w-[400px] h-[360px] flex justify-evenly flex-col items-center mt-[-30px] bg-card !border-[2px] rounded-3xl">
          <motion.div
            className="up !gap-5"
            initial={{ scale: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <Button
              className="px-[35px] py-[25px] rounded-[30px] text-[1.15rem] transition duration-300 ease hover:scale-105"
              id="uploaduu"
              onClick={(e) => {
                e.preventDefault();
                setvideo(null);
                setVideoUrl(null);
                setflag(false);
                setreaction(-1);
                handleClick();
                setresult(null);
              }}
            >
              Upload your Videos
            </Button>
            <input
              type="file"
              id="Videoupload"
              ref={inputRef}
              accept="video/*"
              onChange={handleFileChange}
            />
            <p>Upto 30 mb of video & mp4 format only!</p>
            <Dialog open={getURLOpen} onOpenChange={setGetURLOpen}>
              <DialogTrigger asChild>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    setGetURLOpen(true);
                  }}
                  className="text-[0.8rem] underline cursor-pointer"
                >
                  Enter URL
                </p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] !bg-card">
                <DialogHeader>
                  <DialogTitle>Enter Video URL</DialogTitle>
                  <DialogDescription>
                    Make sure to upload a link which is public to everyone. and
                    size ot more than 30 mb.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      URL
                    </Label>
                    <Input
                      value={URL}
                      onChange={(e) => setURL(e.target.value)}
                      id="name"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-[25px]">
                  <div className="flex justify-center items-center gap-[18px]">
                    <div
                      className={` ${
                        linkName === "youtube"
                          ? "border-[5px] border-primary"
                          : "border-none"
                      } rounded-full  `}
                    >
                      <Image
                        onClick={(e) => setlinkName("youtube")}
                        src="/images/youtube.png"
                        alt="youtube"
                        width={34}
                        height={34}
                        className={`rounded-full cursor-pointer`}
                      />
                    </div>
                    <div
                      className={` ${
                        linkName === "drive"
                          ? "border-[5px] border-primary"
                          : "border-none"
                      } rounded-full  `}
                    >
                      <Image
                        onClick={(e) => setlinkName("drive")}
                        src="/images/drive.jpeg"
                        alt="drive"
                        width={34}
                        height={34}
                        className={`rounded-full cursor-pointer`}
                      />
                    </div>
                    <div
                      className={` ${
                        linkName === "insta"
                          ? "border-[5px] border-primary"
                          : "border-none"
                      } rounded-full  `}
                    >
                      <Image
                        onClick={(e) => setlinkName("insta")}
                        src="/images/insta.jpeg"
                        alt="insta"
                        width={34}
                        height={34}
                        className={`rounded-full  cursor-pointer`}
                      />
                    </div>
                  </div>
                  <Button
                    disabled={loadURLFetch}
                    className="flex justify-center items-center gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      URLFetch();
                    }}
                  >
                    {loadURLFetch === true && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Upload
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
          <motion.div
            className="down"
            initial={{ scale: 0 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            {api === false && (
              <Button
                className="w-[45%] h-[38px] rounded-[30px] text-[1.05rem] transition duration-500 ease hover:scale-105"
                onClick={(e) => {
                  e.preventDefault();
                  API(video);
                  const ele = document.querySelector(".up");
                  const own = document.querySelector(".down");
                  own.style.borderTop = "none";
                  ele.style.display = "none";
                  setflag(true);
                }}
              >
                Detect Video
              </Button>
            )}
            {api === true && (
              <>
                <p>This may take a few Seconds....</p>
                <p>Estimated Time: 30-40 sec</p>

                {/* .deepfake .right .box .down .cancel {
  margin-top: 2rem;
  width: 40%;
  height: 40px;
  border-radius: 30px;
  border: 1.5px solid #0272ff;
  background-color: transparent;
  color: #0272ff;
  font-size: 1.15rem;
  transition: 0.6s ease;
}
.deepfake .right .box .down .cancel:hover {
  background-color: #0272ff;
  cursor: pointer;
  color: white;
  transform: scale(1.04);
} */}
                <Button
                  variant="outline"
                  className="mt-[2rem] w-[40%] rounded-[30px] border-[1.5px] bg-transparent border-primary text-primary text-[1.15rem] transition duration-500 ease hover:bg-primary hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    cancelrequest();
                    setvideo(null);
                    setVideoUrl(null);
                    setflag(false);
                    setreaction(-1);
                    setapi(false);
                    const ele = document.querySelector(".up");
                    ele.style.display = "flex";
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <img src="./images/Polygon 1.png" alt="v" className="ploy" />
      <img src="./images/rope.png" alt="rve" className="rope" />
    </div>
  );
};
export default Deepfake;
