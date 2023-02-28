import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
} from "remotion";
import { Animated, Fade } from "remotion-animated";

import secondMidVid from "./secondmid.mp4";
export const SecondMid = ({ duration = {} }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Fade In the animation at the start
  const opacityAtStart = interpolate(frame, [0, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames - 15],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <Animated
      animations={[
        Fade({ to: 1, initial: 0, start: duration.FROM }),
        Fade({ to: 0.4, start: duration.FROM + duration.DURATION - 30 }),
      ]}
    >
      <OffthreadVideo
        src={secondMidVid}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        autoPlay
        loop
      />
    </Animated>
  );
};
