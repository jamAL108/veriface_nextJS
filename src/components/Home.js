"use client";
import React from "react";
import "../scss/Home.scss";
import Scroll from "../utils/scroll";
import Navbar from "@/components/Navbar";
import { Button } from "./ui/button";
import { ArrowDown } from 'lucide-react';
import { CircleChevronDown } from 'lucide-react';

const Home = () => {
  return (
    <div className="home w-[100%] ">
      <Navbar />
      <div className="min-w-[1300px] w-[min(1300px , 85vw)] relative  h-[calc(100vh_-_4rem)] flex flex-col py-[130px] gap-[40px]">
        <div className="flex flex-col gap-[27px]">
          <h1 className="text-5xl font-[600]">
            Spot the Fake, Protect the Truth.
          </h1>
          <p className="text-4xl  w-[80%] font-[600] text-[#838383] leading-[45px]">
            Utilizes eye <span className="text-primary">blinking</span>, facial{" "}
            <span className="text-primary">expressions</span>, <br/> and lip{" "}
            <span className="text-primary">syncing</span> to
            identify deepfakes.
          </p>
        </div>
        <img src="/images/landingtest.png" alt='meow' className="w-[1000px] h-[600px] absolute top-[-20px] right-[-200px]"/>
        <div className="flex items-center gap-[50px]">
          <Button
            className="bg-white font-[600] text-primary text-[0.9rem] hover:bg-white rounded-[30px] min-w-[150px] 
          py-[18px] px-[10px] max-w-[160px] min-h-[50px] max-h-auto hover:bg-primary hover:text-white transition duration-200 ease "
            onClick={(e) => Scroll("deepfake")}
          >
            GET STARTED
          </Button>
          <h2 className="text-[#838383] flex hover:text-primary cursor-pointer items-center justify-center gap-2">Learn more <ArrowDown size={20}/></h2>
        </div>
        <div className="absolute bottom-[40px] w-full flex justify-center items-center">
          <CircleChevronDown size={28} color="white" className="hover:scale-105 cursor-pointer" onClick={(e)=>{
            Scroll('feature')
          }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
