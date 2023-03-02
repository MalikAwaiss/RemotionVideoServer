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
import nameSlide from "../Construction/CustomerName/name_slide.mp4";
import loanAmount from "../Construction/LoanAmount/loan_amount.mp4";
import loanFeatures from "../Construction/LoanFeatures/loanFeatures.mp4";
import loanInstallments from "../Construction/LoanInstallments/loanInstallments.mp4";
import CustomerNameAnimation from "./CustomerName/CustomerNameAnimation";
import LoanAmountText from "./LoanAmount/LoanAmountText";
import LoanFeaturesText from "./LoanFeatures/LoanFeaturesText";
import LoanInstallmentsText from "./LoanInstallments/LoanInstallmentsText";
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
export const Construction = (props) => {
  const videoData = {...props};
  // A <AbsoluteFill> is just a absolutely positioned <div>!
  return (
    <AbsoluteFill style={{ backgroundColor: "#FD6244" }}>
      <Sequence
        from={DURATIONS.INTRO.FROM}
        durationInFrames={DURATIONS.INTRO.DURATION}
      >
        <VideoWrapper videoFile={introVid} duration={DURATIONS.INTRO} />
      </Sequence>
      <Sequence
        from={DURATIONS.CUSTOMER_NAME.FROM}
        durationInFrames={DURATIONS.CUSTOMER_NAME.DURATION}
      >
        <VideoWrapper videoFile={nameSlide} CustomComponent={<CustomerNameAnimation name={videoData.customerName??'Robert Pattison'} />} duration={DURATIONS.CUSTOMER_NAME} />
      </Sequence>
      <Sequence
        from={DURATIONS.LOAN_AMOUNT.FROM}
        durationInFrames={DURATIONS.LOAN_AMOUNT.DURATION}
      >
        <VideoWrapper videoFile={loanAmount} CustomComponent={<LoanAmountText amount={videoData.loanAmount??'5000£'} />} duration={DURATIONS.LOAN_AMOUNT} />
      </Sequence>
      <Sequence
        from={DURATIONS.FIRST_MID.FROM}
        durationInFrames={DURATIONS.FIRST_MID.DURATION}
      >
        <VideoWrapper videoFile={firstMidVid} duration={DURATIONS.FIRST_MID} />
      </Sequence>
      <Sequence
        from={DURATIONS.LOAN_FEATURES.FROM}
        durationInFrames={DURATIONS.LOAN_FEATURES.DURATION}
      >
        <VideoWrapper videoFile={loanFeatures} CustomComponent={<LoanFeaturesText  companyName={videoData.companyName??"Constructions Solutions Ltd."} />} duration={DURATIONS.LOAN_FEATURES} />
      </Sequence>
      <Sequence
        from={DURATIONS.LOAN_INSTALLMENTS.FROM}
        durationInFrames={DURATIONS.LOAN_INSTALLMENTS.DURATION}
      >
        <VideoWrapper videoFile={loanInstallments} CustomComponent={<LoanInstallmentsText  installmentText={videoData.installmentAmount?videoData.installmentAmount+' per working weekday':"188£ per working weekday"} totalAmount={videoData.loanAmount??'5000£'} startDate={videoData.startDate??"10/02/2023"} endDate={videoData.endDate?? "20/04/2026"} />} duration={DURATIONS.LOAN_INSTALLMENTS} />
      </Sequence>
      <Sequence
        from={DURATIONS.SECOND_MID.FROM}
        durationInFrames={DURATIONS.SECOND_MID.DURATION}
      >
        <VideoWrapper videoFile={secondMidVid} duration={DURATIONS.SECOND_MID} />
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
