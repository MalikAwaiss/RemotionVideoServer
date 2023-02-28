import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import VideoWrapper from "../../shared/VideoWrapper";

import { FirstMid } from "./FirstMid";
import { Intro } from "./Intro";
import { SecondMid } from "./SecondMid";
import firstMidVid from "../Construction/FirstMid/firstmid.mp4";
import secondMidVid from "../Construction/SecondMid/secondmid.mp4";
import introVid from "../Construction/Intro/intro-1.mp4";
const DURATIONS = {
  INTRO: {
    FROM: 0,
    DURATION: 100,
  },
  FIRST_MID: {
    FROM: 100,
    DURATION: 200,
  },
  SECOND_MID: {
    FROM: 300,
    DURATION: 1000,
  },
  ENDING: {
    FROM: 1300,
    DURATION: 100,
  },
};
export const Construction = ({ titleText = "",midText="",secondMid="",ending="", titleColor = "" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // console.log('durationInFrames',durationInFrames,parseInt(durationInFrames/2)-25);
  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "#FD6244" }}>
      <Sequence
        from={DURATIONS.INTRO.FROM}
        durationInFrames={DURATIONS.INTRO.DURATION}
      >
        <VideoWrapper videoFile={introVid} duration={DURATIONS.INTRO} />
        {/* <Intro duration={DURATIONS.INTRO} /> */}
      </Sequence>
      <Sequence
        from={DURATIONS.FIRST_MID.FROM}
        durationInFrames={DURATIONS.FIRST_MID.DURATION}
      >
        {/* <FirstMid duration={DURATIONS.FIRST_MID} /> */}
        <VideoWrapper videoFile={firstMidVid} duration={DURATIONS.FIRST_MID} />
      </Sequence>
      <Sequence
        from={DURATIONS.SECOND_MID.FROM}
        durationInFrames={DURATIONS.SECOND_MID.DURATION}
      >
        <VideoWrapper videoFile={secondMidVid} duration={DURATIONS.SECOND_MID} />
        {/* <SecondMid duration={DURATIONS.SECOND_MID} /> */}
      </Sequence>
      <Sequence
        from={DURATIONS.ENDING.FROM}
        durationInFrames={DURATIONS.ENDING.DURATION}
      >
        <Intro duration={DURATIONS.ENDING} />
      </Sequence>
    </AbsoluteFill>
  );
};
