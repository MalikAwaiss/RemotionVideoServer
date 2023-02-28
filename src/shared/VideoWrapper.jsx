import {
    AbsoluteFill,
    interpolate,
    useCurrentFrame,
    useVideoConfig,
    OffthreadVideo,
  } from "remotion";
  import { Animated, Fade } from "remotion-animated";
  
  export default ({ duration = {},videoFile,CustomComponent = null }) => {
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
      [0,25,durationInFrames-20,durationInFrames],
      [0,1,1,0],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }
    );
    // A <AbsoluteFill> is just a absolutely positioned <div>!
    return (
      <div
        animations={[
          Fade({ to: 1, initial: 0, start: duration.FROM-25 }),
          Fade({ to: 0.4, start: duration.FROM + duration.DURATION - 30 }),
        ]}
        style={{
          opacity
        }}
      >
        <OffthreadVideo
          src={videoFile}
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
        {
          CustomComponent ? 
          (CustomComponent)
          :
          null
        }
      </div>
    );
  };
  