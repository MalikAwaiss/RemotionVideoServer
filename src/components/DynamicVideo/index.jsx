import { getVideoMetadata } from "@remotion/media-utils";
import React from "react";
import { Composition, getInputProps } from "remotion";
import { DynamicVideoAssembled } from "./DynamicVideoAssembled";
import introVid from "../DynamicVideo/Intro/intro-1.mp4";


// the audio duration is 58seconds + 4 frames
const inputProps = getInputProps();

export const DynamicVideo = () => {
    const [duration,setDuration] = React.useState(5);
    // A <AbsoluteFill> is just a absolutely positioned <div>!
    console.log('inputProps',inputProps)
    React.useEffect(()=>{
        getVideoMetadata(inputProps.customPath??'https://file-examples.com/storage/fe21053bab6446bba9a0947/2017/04/file_example_MP4_640_3MG.mp4').then(res=>{
            console.log('res',res)
            setDuration(res.durationInSeconds)
        }).catch(err=>{
            console.log('err',err)
        })
    },[])
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.jsx <id> out/video.mp4
        id="DynamicVideo"
        component={DynamicVideoAssembled}
        durationInFrames={Math.floor(duration*30.145)}
        // durationInFrames={500}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
      />
    </>
  );
};
