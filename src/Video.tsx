import { Composition } from "remotion";

import { Construction } from "./components/Construction";
import { HairDresser } from "./components/HairDresser";
import { getFont } from "./Video/helpers/load-font";

// the audio duration is 58seconds + 4 frames

getFont();

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.jsx <id> out/video.mp4
        id="Construction"
        component={Construction}
        durationInFrames={1990}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
      />
      <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.jsx <id> out/video.mp4
        id="HairDresser"
        component={HairDresser}
        durationInFrames={1000}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
      />
    </>
  );
};
