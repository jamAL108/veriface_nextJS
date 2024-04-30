'use client';
import React, { useEffect, useState , useRef } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg/src/index.js"
import * as helpers from "./utils/helpers";
import VideoFilePicker from "./videoFilePicker";
import OutputVideo from "./videoPlayer";
import OutputVideo2 from "./outputNoDown"
import RangeInput from "./videoRangeInput";
// import './global.css'

import { Highlighter } from 'lucide-react';
const FF = createFFmpeg({
  log: false,
  corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
});
function VideoApp({ fileImage, video, setExtractMeta, setPassedAudioDataUrl , setVideo , setVideoObject }) {
  const [inputVideoFile, setInputVideoFile] = useState(video);
  const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
  const [trimIsProcessing, setTrimIsProcessing] = useState(false);
  const [videoMeta, setVideoMeta] = useState(null);
  const [URL, setURL] = useState(null);
  const [rStart, setRstart] = useState(0); // 0%
  const [rEnd, setRend] = useState(10); // 10%
  const [thumbnails, setThumbnails] = useState([]);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);

  const [show, setShow] = useState(true)
  const [showBtn, setShowBtn] = useState(true)
  const [saveBtn, setSaveBtn] = useState(true)
  const [videoAppShow, setVideoAppShow] = useState(true)
  const [addedShow, setAddedShow] = useState(true)
  const [deletedState, setDeletedState] = useState(true)
  const [backState, setBackState] = useState(false)

  const [mediaTitle, setMediaTitle] = useState("Untitled")

  const [isEditing, setIsEditing] = useState(false);
  const [clipTitle, setClipTitle] = useState('Your Clip Title');
  const [loadingText, setLoadingText] = useState("Loading...");
  const videoRef = useRef(null);


  useEffect(() => {
    (async function () {
      await FF.load();
    })();
  }, [])



  useEffect(() => {
    console.log(video)
    if (video !== null) {
      handleChange(video)
    }
  }, [video])

  const handleChange = async (file) => {
    // console.log(file);
    setDeletedState(true);
    const url = await readFileAsBase64(file);
    setURL(url);
  };

  async function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = rStart;
  //   }
  // }, [rStart]);

  const handleUpdateRange = (func) => {
    return ({ target: { value } }) => {
      func(value);
    };
  };

  const getThumbnails = async ({ duration }) => {
    if (!FF.isLoaded()) await FF.load();
    setThumbnailIsProcessing(true);
    setShowBtn(false);
    let MAX_NUMBER_OF_IMAGES = 15;
    let offset =
      duration === MAX_NUMBER_OF_IMAGES ? 1 : duration / MAX_NUMBER_OF_IMAGES;
    let NUMBER_OF_IMAGES = duration < MAX_NUMBER_OF_IMAGES ? duration : 15;
    FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
    const arrayOfImageURIs = [];
    for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
      let startTimeInSecs = helpers.toTimeString(Math.round(i * offset));
      if (startTimeInSecs + offset > duration && offset > 1) {
        offset = 0;
      }
      try {
        await FF.run(
          "-ss",
          startTimeInSecs,
          "-i",
          inputVideoFile.name,
          "-t",
          "00:00:1.000",
          "-vf",
          `scale=150:-1`,
          `img${i}.png`
        );
        const data = FF.FS("readFile", `img${i}.png`);
        let blob = new Blob([data.buffer], { type: "image/png" });
        let dataURI = await helpers.readFileAsBase64(blob);
        arrayOfImageURIs.push(dataURI);
        FF.FS("unlink", `img${i}.png`);
      } catch (error) {
        console.log({ message: error });
      }
    }
    getFirstFrameImageURL();
    setThumbnailIsProcessing(false);
    return arrayOfImageURIs;
  };

  const getFirstFrameImageURL = async () => {
    if (!FF.isLoaded()) await FF.load();
    const startTimeInSecs = "00:00:00.005"; 
    FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));

    try {
      console.log(`Generating the first frame`);
      await FF.run(
        "-ss",
        startTimeInSecs,
        "-i",
        inputVideoFile.name,
        "-t",
        "00:00:1.000",
        "-vf",
        "scale=150:-1",
        "firstFrame.png"
      );
      const data = FF.FS("readFile", "firstFrame.png");
      let blob = new Blob([data.buffer], { type: "image/png" });
      // Convert the Blob to a data URL
      const dataURI = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      FF.FS("unlink", "firstFrame.png");
      fileImage(dataURI)
      return dataURI;
    } catch (error) {
      console.error(`Error generating the first frame:`, error);
      return null; 
    }
  };

  const handleLoadedData = async (e) => {
    const el = e.target;
    const meta = {
      name: inputVideoFile.name,
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight,
    };
    setVideoMeta(meta);
    const thumbnails = await getThumbnails(meta);
    setThumbnails(thumbnails);
  };

  const toggleVideoApp = async () => {
    setVideoAppShow(false);
    setSaveBtn(true);
    setAddedShow(false);
  }

  const deleteAction = async () => {
    setVideoAppShow(true);
    setShow(true)
    setAddedShow(true);
    setInputVideoFile(null);
    setDeletedState(false);
    setTrimmedVideoFile(null);
    uploadProvided(true);
    setBackState(false)
  }

  const handleAudioTrim = async () => {
    let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
    let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
    try {
      FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
      await FF.run(
        "-ss",
        helpers.toTimeString(startTime),
        "-i",
        inputVideoFile.name,
        "-map",
        "0:a:0",
        "-vn",
        "-t",
        helpers.toTimeString(offset),
        "-acodec",
        "libmp3lame",
        "audio.mp3"
      );
      const data = FF.FS("readFile", "audio.mp3");
      setPassedAudioDataUrl(data)
    } catch (error) {
      console.log(error);
    }
  };

  const setVideoSize = async (data) => {
    const videoSizeInBytes = new Blob([data.buffer], { type: "video/mp4" }).size;
    const videoNameFile = inputVideoFile.name
    const startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
    const offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
    const extractedMeta = {
      videoName: videoNameFile,
      videoDuration: (offset / 60).toFixed(0),
      videoDurationString: helpers.toTimeString(offset),
      videoSize: videoSizeInBytes,
    }
    setExtractMeta(extractedMeta)
  };

  const handleTrim = async () => {
    let startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
    let offset = ((rEnd / 100) * videoMeta.duration - startTime).toFixed(2);
    const offsetLenght = (offset / 60).toFixed(0);

    if (10 > offset > 5) {
      setLoadingText(`Your Video is ${(offset / 60).toFixed(0)} Minutes => Process Time May Take About 30 secounds`)
    } else if (offset > 10) {
      setLoadingText(`Your Video is ${(offset / 60).toFixed(0)} Minutes => Process Time May Take About 45 secounds`)
    } else if (offset < 5) {
      setLoadingText(`Your Video is ${(offset / 60).toFixed(0)} Minutes => Process Time May Take About 15 secounds`)
    } else {
      setLoadingText(`Loading...`)
    }
    setTrimIsProcessing(true);
    setShow(false);
    if (deletedState == false) {
      setDeletedState(!deletedState)
    }
    setShowBtn(true);
    setSaveBtn(false);
    try {
      FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
      await FF.run(
        "-ss",
        helpers.toTimeString(startTime),
        "-i",
        inputVideoFile.name,
        "-t",
        helpers.toTimeString(offset),
        "-c:v",
        "copy",
        "ping.mp4"
      );
      const data = FF.FS("readFile", "ping.mp4");
      await setVideoSize(data);
      const dataURL = await helpers.readFileAsBase64(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      await handleAudioTrim()

      setVideoObject(blobToFile(dataURL,'file_from_link.mp4'))
      const vdata = new FormData();
      vdata.append("file", dataURL);
      setVideo(vdata);

      console.log(dataURL)
      setTrimmedVideoFile(dataURL);
    } catch (error) {
      console.log(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setClipTitle(event.target.value);
  };

  const handleTitleSave = () => {
    setIsEditing(false);
    // You can save the edited title here, e.g., by making an API request.
  };

  const HandleBack = () => {
    setShow(!show)
    setDeletedState(!deletedState)
    setBackState(true)
  }

  const handleMediaTitle = (event) => {
    setMediaTitle(event.target.value);
    // handleTitleInput(event.target.value)
  }

  function blobToFile(blob, fileName) {
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  }

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {videoAppShow ? <main className="w-full flex flex-col gap-[20px]">


        <section className="flex flex-col items-center mt-[10px] w-full">
          <article className="w-full  flex flex-col items-center justify-center">
            {trimIsProcessing ? <h4>{loadingText}</h4> : null}
            {/*If show is True --> VIDEO-FILE-PICKER --> If Video Put then Video Frame --> Auto Run Range Selector */}

            {show ?
              <div className="w-full h-[300px]  ">
                <video 
                  ref={videoRef}
                  className='w-full h-full '
                  src={inputVideoFile ? URL : null}
                  autoPlay
                  controls
                  muted
                  onLoadedMetadata={handleLoadedData}
                  crossOrigin="anonymous"
                >
                </video>
              </div>
              : null
            }

          </article>
          {deletedState ?
            <OutputVideo
              videoSrc={trimmedVideoFile}
            /> : null
          }
        </section>

        {<div className="w-full relative">
          {deletedState ?
            <RangeInput
              rEnd={rEnd}
              rStart={rStart}
              handleUpdaterStart={handleUpdateRange(setRstart)}
              handleUpdaterEnd={handleUpdateRange(setRend)}
              loading={thumbnailIsProcessing}
              videoMeta={videoMeta}
              thumbNails={thumbnails}
            /> : null
          }

          {backState ?
            <RangeInput
              rEnd={rEnd}
              rStart={rStart}
              handleUpdaterStart={handleUpdateRange(setRstart)}
              handleUpdaterEnd={handleUpdateRange(setRend)}
              loading={thumbnailIsProcessing}
              videoMeta={videoMeta}
              thumbNails={thumbnails}
            /> : null
          }

        </div>}

      </main> : null
      }

      {!showBtn ?
        <div className="btn-container">
          <div
            onClick={handleTrim}
            className="btn2 btn_b2"
            disabled={trimIsProcessing}
          >
            {trimIsProcessing ? "Loading..." : "Clip"}
            {thumbnailIsProcessing ? " Loading..." : ""}
          </div>
        </div> : null
      }

      {!saveBtn ?
        <div className="btn-container">
          <div
            onClick={toggleVideoApp}
            className="btn2 btn_b2"
            disabled={trimIsProcessing}
          >
            {trimIsProcessing ? "loading..." : "Save"}

          </div>

          <div className="back-btn">
            <div className="back-btn-txt" onClick={HandleBack}>
              <h3>Back</h3>
            </div>
          </div>
        </div> : null
      }

      {!addedShow ?
        <div className="added">
          <OutputVideo2 videoSrc={trimmedVideoFile} />
          <Highlighter className="added-delete-btn" onClick={deleteAction} />
        </div> : null
      }
    </div>
  );
}

export default VideoApp
