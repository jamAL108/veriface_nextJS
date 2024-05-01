'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Scissors } from 'lucide-react'
import VideoTrim from './videoApp'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const Trim = ({ setThumbnail, video, setExtractMeta, setPassedAudioDataUrl, setVideo, setVideoObject , setVideoUrl }: {
    setThumbnail: any,
    video: any,
    setExtractMeta: any,
    setPassedAudioDataUrl: any,
    setVideo: any,
    setVideoObject: any,
    setVideoUrl:any,
}) => {
    const [open, setopen] = useState<boolean>(false)
    return ( 
        <Dialog open={open} onOpenChange={setopen} >
            <DialogTrigger asChild>
                <Button onClick={(e)=>{
                    setopen(true)
                }}
                    variant="outline"
                    className="flex justify-center px-[20px] items-center gap-[7px] text-[1.05rem] transition duration-500 ease hover:scale-105"
                >
                    <Scissors size={19} color="white" />
                    Trim
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[100%] min-h-[min(90vh,800px)] flex flex-col gap-[10px]">
                <DialogHeader>
                    <DialogTitle>Trim your video</DialogTitle>
                    <DialogDescription>
                        Remove unnecessary clips from the video and submit the trimmed version of video
                    </DialogDescription>
                </DialogHeader>
                <div className='flex w-full h-[calc(100%_-_5rem)]'>
                    <VideoTrim setVideoUrl={setVideoUrl} setopen={setopen} setVideo={setVideo} setVideoObject={setVideoObject} setPassedAudioDataUrl={setPassedAudioDataUrl} video={video} fileImage={setThumbnail} setExtractMeta={setExtractMeta} />
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default Trim