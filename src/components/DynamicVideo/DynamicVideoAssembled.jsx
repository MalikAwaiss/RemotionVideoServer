import {
  AbsoluteFill, Sequence
} from "remotion";
import VideoWrapper from "../../shared/VideoWrapper";

import { getVideoMetadata } from "@remotion/media-utils";
import introVid from "../DynamicVideo/Intro/intro-1.mp4";
import { useState } from "react";
import TextWrapper from "../../shared/TextWrapper";
import colors from "../../constants/colors";

const DURATIONS = {
  INTRO: {
    FROM: 0,
    DURATION: 100,
  },
  CUSTOMER_NAME: {
    FROM: 100,
    DURATION: 170,
  },
  LOAN_AMOUNT: {
    FROM: 270,
    DURATION: 170,
  },
  FIRST_MID: {
    FROM: 440,
    DURATION: 200,
  },
  LOAN_FEATURES: {
    FROM: 640,
    DURATION: 170,
  },
  LOAN_INSTALLMENTS: {
    FROM: 810,
    DURATION: 350,
  },
  SECOND_MID: {
    FROM: 1160,
    DURATION: 1000,
  },
  ENDING: {
    FROM: 2160,
    DURATION: 100,
  },
};
const TEXTS = [
  {
    value: 'Hello',
    css: {
      fontSize: 32,
      fontWeight: 200,
      color: colors.white,
      fontFamily: 'montserrat',
      top: 272,
      right: 15,
      // width: '426px'
    },
    positionInVideo: 0,
    duration: 1.2
  },
  {
    value: 'Hello2',
    css: {
      fontSize: 50,
      fontWeight: 200,
      color: colors.primary,
      fontFamily: 'montserrat',
      top: 272,
      left: 105,
      fontWeight: 'bolder'
      // width: '426px'
    },
    positionInVideo: 1.2,
    duration: 1.2
  },
  {
    value: 'Hello3',
    css: {
      fontSize: 32,
      fontWeight: 200,
      color: colors.white,
      fontFamily: 'montserrat',
      top: 272,
      right: 15,
      // width: '426px'
    },
    positionInVideo: 2.4,
    duration: 1.2
  },
  {
    value: 'Hello4',
    css: {
      fontSize: 32,
      fontWeight: 200,
      color: colors.white,
      fontFamily: 'montserrat',
      top: 272,
      right: 15,
      // width: '426px'
    },
    positionInVideo: 3.6,
    duration: 1.2
  },
  {
    value: 'Hello5',
    css: {
      fontSize: 32,
      fontWeight: 200,
      color: colors.white,
      fontFamily: 'montserrat',
      top: 272,
      right: 15,
      // width: '426px'
    },
    positionInVideo: 4.8,
    duration: 1.2
  },
]
export const DynamicVideoAssembled = (props) => {
  const { videoData, customPath = 'https://file-examples.com/storage/fe21053bab6446bba9a0947/2017/04/file_example_MP4_640_3MG.mp4' } = props;
  console.log('props', props, '')
  // const pathh = 'https://file-examples.com/storage/fe21053bab6446bba9a0947/2017/04/file_example_MP4_640_3MG.mp4'
  // const customVideo = require(`/Users/cibak/Documents/AtomBits/RemotionVideoServer/src/components/DynamicVideo/Intro/intro-1.mp4`)
  const [duration, setDuration] = React.useState(5);
  // A <AbsoluteFill> is just a absolutely positioned <div>!
  // React.useEffect(()=>{
  //   const test =async() => {
  //     const response = await fetch(pathh); // replace with the path to your local video file
  //     const videoBlob = await response.blob();
  //     const videoUrl = URL.createObjectURL(videoBlob);
  //     setVideoSrc(videoUrl);

  //   }
  //   test()
  // }, [])
  React.useEffect(() => {
    getVideoMetadata(customPath).then(res => {
      console.log('res-getVideoMetadata', res)
      setDuration(res.durationInSeconds)
    }).catch(err => {
      console.log('err-getVideoMetadata', err)
    })
  }, [])
  return (
    <AbsoluteFill style={{ backgroundColor: "#FD6244" }}>
      {/* <Sequence
        from={DURATIONS.INTRO.FROM}
        durationInFrames={DURATIONS.INTRO.DURATION}
      > */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}>
        <VideoWrapper videoFile={customPath} duration={{
          FROM: 0,
          DURATION: duration,
        }} />
      </div>
      {/* </Sequence> */}
      {
        TEXTS.map((item, i) => {
          return <Sequence
            from={Math.floor(item.positionInVideo * 100)}
            durationInFrames={item.duration * 100}
            key={i}

          >
            <TextWrapper
              customContainerStyle={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              customFontStyle={{
                position: 'absolute',
                ...item.css,
              }}
              text={item.value}

            />
          </Sequence>
        })
      }
    </AbsoluteFill>
  );
};
