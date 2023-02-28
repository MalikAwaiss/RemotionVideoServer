import React from "react"
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import colors from "../../../constants/colors"
import TextWrapper from "../../../shared/TextWrapper"

export default ({ totalAmount = '', installmentText = '', startDate = '', endDate = '' }) => {
    const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [0, 25, durationInFrames - 75, durationInFrames - 55],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
    return (
        <>
            <TextWrapper
                customContainerStyle={{
                    top: 180,
                    left: 79,
                    width: '724px'
                }}
                customFontStyle={{
                    fontSize: 62,
                    fontWeight: 600,
                    color: colors.white,
                    fontFamily: 'DM Serif Display'
                }}
                CustomComponent={
                    <>
                        <span style={{ color: colors.primary }}>{totalAmount}</span>{' by making payments of '}<span style={{ color: colors.primary }}>{installmentText}</span>,
                    </>
                }
                customAnimationEnd={55}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 423,
                    left: 462,
                    opacity,
                }}
            >
                <span style={{
                    fontSize:60,
                    fontFamily: 'DM Serif Display',
                    color: colors.white
                }}>{startDate}</span>
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: 501,
                    left: 412,
                    opacity,
                }}
            >
                <span style={{
                    fontSize:60,
                    fontFamily: 'DM Serif Display',
                    color: colors.white
                }}>{endDate}</span>
            </div>
        </>
    )
}