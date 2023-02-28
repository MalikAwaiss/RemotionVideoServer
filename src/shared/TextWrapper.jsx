import {
  interpolate,
  useCurrentFrame,
  useVideoConfig
} from "remotion";

export default ({ text = '', customContainerStyle = {}, customFontStyle = {}, CustomComponent = null, customAnimationEnd = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 20 - customAnimationEnd, durationInFrames - customAnimationEnd],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  return (
    <div
      style={{
        opacity,
        position:'absolute',
        ...customContainerStyle
      }}
    >
      <span
        style={{
          fontFamily: 'League Spartan',
          ...customFontStyle,
        }}
      >
        {(text)}
      {
        CustomComponent ?
          (CustomComponent)
          :
          null
      }
      </span>
    </div>
  );
};
