"use client";
import React from "react";
import "../scss/instrution.scss";
import { MdFileDownload } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
const Instruction = () => {
  return (
    <div className="w-full bg-gray-100 flex justify-center items-center mb-[100px]">
      <div className=" px-[20px] w-[min(1400px , 85vw)] py-[4rem] min-h-[370px] flex justify-center gap-[40px]">
        <div className="flex  items-center flex-col gap-4 max-w-[350px]">
          <div className="bg-blue-500 rounded-full w-16 h-16 flex justify-center items-center transition duration-500 ease hover:rotate-360 hover:scale-110">
            <MdFileDownload
              size={18}
              color="white"
              className="icon w-10 h-10"
            />
          </div>
          <p className="text-center">
            Choose a video file that you want to analyze and upload it in the
            "Detection" section. The videos should be within 20-30 MB in size
            and should be in MP3 format
          </p>
        </div>
        <div className="flex  items-center flex-col gap-4 max-w-[350px]">
          <div className="bg-blue-500 rounded-full w-16 h-16 flex justify-center items-center transition duration-500 ease hover:rotate-360 hover:scale-110">
            <FaSearch size={30} color="white" className="icon" />
          </div>
          <p className="text-center">
            Click on "Detect Videos" and wait for some time, as the
            identification process can take 1 or 2 minutes, until the output
            result comes. You can play some games related to deepfake.
          </p>
        </div>
        <div className="flex  items-center flex-col gap-4 max-w-[350px]">
          <div className="bg-blue-500 rounded-full w-16 h-16 flex justify-center items-center transition duration-500 ease hover:rotate-360 hover:scale-110">
            <FaCheck size={12} color="white" className="icon w-10 h-10" />
          </div>
          <p className="text-center">
            After the prediction, you will find out whether your video is fake
            or real. In the output, we provide some metrics, including the
            percentage for different techniques used, separate results for eye
            blinking, face masking, and lip syncing, and finally, the overall
            result.
          </p>
        </div>
      </div>
    </div>

    // <div className="inst  !w-[min(1400px , 85vw)]">
    //   <div className="boxes">
    //     <div className="box">
    //       <div className="ele">
    //         <FileUploadIcon className="icon" />
    //       </div>
    //       <p>
    //         Choose a video file that you want to analyze and upload it in the
    //         "Detection"section. The videos should be within 20-30 MB in size
    //         and should be in MP3 format
    //       </p>
    //     </div>
    //     <div className="box">
    //       <div className="ele">
    //         <SearchIcon className="icon" />
    //       </div>
    //       <p>
    //         Click on "Detect Videos" and wait for some time, as the
    //         identification process can take 1 or 2 minutes, until the output
    //         result comes. You can play some games related to deepfake.
    //       </p>
    //     </div>
    //     <div className="box">
    //       <div className="ele">
    //         <CheckIcon className="icon" />
    //       </div>
    //       <p>
    //         After the prediction, you will find out whether your video is fake
    //         or real. In the output, we provide some metrics, including the
    //         percentage for different techniques used, separate results for eye
    //         blinking, face masking, and lip syncing, and finally, the overall
    //         result.
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Instruction;
