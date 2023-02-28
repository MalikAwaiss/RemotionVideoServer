import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { FirstMid } from "./FirstMid";
import { Intro } from "./Intro";
import { SecondMid } from "./SecondMid";
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
    DURATION: 800,
  },
  ENDING: {
    FROM: 1100,
    DURATION: 100,
  },
};
export const HairDresser = ({ titleText = "",midText="",secondMid="",ending="", titleColor = "" }) => {
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
      <div style={{zIndex:999,fontSize:40,fontWeight:'bolder'}}>{titleText}</div>
        <Intro duration={DURATIONS.INTRO} />
      </Sequence>
      <Sequence
        from={DURATIONS.FIRST_MID.FROM}
        durationInFrames={DURATIONS.FIRST_MID.DURATION}
      >
      <div style={{zIndex:999,fontSize:40,fontWeight:'bolder'}}>{midText}</div>
        <FirstMid duration={DURATIONS.FIRST_MID} />
      </Sequence>
      <Sequence
        from={DURATIONS.SECOND_MID.FROM}
        durationInFrames={DURATIONS.SECOND_MID.DURATION}
      >
      <div style={{zIndex:999,fontSize:40,fontWeight:'bolder'}}>{secondMid}</div>
        <SecondMid duration={DURATIONS.SECOND_MID} />
      </Sequence>
      <Sequence
        from={DURATIONS.ENDING.FROM}
        durationInFrames={DURATIONS.ENDING.DURATION}
      >
      <div style={{zIndex:999,fontSize:40,fontWeight:'bolder'}}>{ending}</div>
        <Intro duration={DURATIONS.ENDING} />
      </Sequence>
    </AbsoluteFill>
  );
};
