/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */

import fs from "fs";
import os from "os";
import path from "path";
import { bundle } from "@remotion/bundler";
import {
  getCompositions,
  renderFrames,
  stitchFramesToVideo,
} from "@remotion/renderer";
import express from "express";
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors')
const app = express();
const port = process.env.PORT || 8000;
const payloadTemplate = {
  "payload":{
    videoCategory: 'string',
    applicationId: 'string || number',
    companyId: 'string || number',
    videoData: 'object<VideoPayload>'
  },
}
const VIDEO_CATEGORIES = {
  "Construction":{
    key:"Construction",
    payload:{
      customerName:'string',
      companyName:'string',
      loanAmount:'string',
      installmentAmount:'string',
      installmentFrequency:'string',
      startDate:'string',
      endDate:'string',
    }
  },
  "Barber":{
    key:"Barber",
    payload:{
      customerName:'string',
      companyName:'string',
      loanAmount:'string',
      installmentAmount:'string',
      installmentFrequency:'string',
      startDate:'string',
      endDate:'string',
    }
  },
  "HairDresser":{
    key:"HairDresser",
    payload:{
      customerName:'string',
      companyName:'string',
      loanAmount:'string',
      installmentAmount:'string',
      installmentFrequency:'string',
      startDate:'string',
      endDate:'string',
    }
  },
}
const compositionId = VIDEO_CATEGORIES.Construction.key;
const outputDir = '/Users/cibak/Documents/AtomBits/RemotionVideoServer/output_video';

const cache = new Map<string, string>();

app.use(cors());
app.get("/videoEnum",async (req,res)=>{
  req.query;
  res.writeHead(200)
  res.write(JSON.stringify({...VIDEO_CATEGORIES,...payloadTemplate}))
  res.end()
})
app.post('/generateVideo',jsonParser,async (req,res)=>{
  try {
    req.body
    if(!req.body.applicationId || !req.body.videoCategory || !req.body.videoData){
      res.writeHead(400,'Bad Request')
      res.write(JSON.stringify({
        message: 'Bad Request! payload invalid',
        status: 400
      }))
      res.end()
      return
    }
    const bundled = await bundle(path.join(__dirname, "./src/index.tsx"));
    const comps = await getCompositions(bundled, { inputProps: req.query });
    const videoIds = Object.keys(VIDEO_CATEGORIES);
    const video = comps.find((c) => videoIds.includes(c.id.toString()));
    const applicationId = req.body.applicationId;
    if (!video) {
      throw new Error(`No video called ${compositionId}`);
    }
    res.set("content-type", "video/mp4");

    const tmpDir = await fs.promises.mkdtemp(
      path.join(os.tmpdir(), "remotion-")
    );
    console.log('req.body.videoData',req.body.videoData)
    const { assetsInfo } = await renderFrames({
      config: video,
      webpackBundle: bundled,
      onStart: () => console.log("Rendering frames..."),
      onFrameUpdate: (f) => {
        if (f % 10 === 0) {
          console.log(`Rendered frame ${f}`);
        }
      },
      parallelism: null,
      outputDir: tmpDir,
      inputProps: req.body.videoData,
      // compositionId,
      imageFormat: "jpeg",
    });
    const fileName = applicationId+".mp4";
    const finalOutput = path.join(outputDir, fileName);
    await stitchFramesToVideo({
      dir: tmpDir,
      force: true,
      fps: video.fps,
      height: video.height,
      width: video.width,
      outputLocation: finalOutput,
      internalOptions:{
        imageFormat: "jpeg",
        preferLossless:false,
        preEncodedFileLocation:null
      },
      assetsInfo,
    });
    res.download(outputDir+'/'+fileName)
    console.log("Video rendered and sent!");
  } catch (err) {
    console.error(err);
    res.json({
      error: err,
    });
  }
})
app.get("/", async (req, res) => {
  const sendFile = (file: string) => {
    // res.writeHead(200, { "Content-Length": 2000, "Content-Type": "video/mp4" });
    fs.createReadStream(file)
      .pipe(res)
      .on("close", () => {
        res.end();
      });
  };
  try {
    if (cache.get(JSON.stringify(req.query))) {
      sendFile(cache.get(JSON.stringify(req.query)) as string);
      return;
    }
    const bundled = await bundle(path.join(__dirname, "./src/index.tsx"));
    const comps = await getCompositions(bundled, { inputProps: req.query });
    const video = comps.find((c) => c.id === compositionId);
    if (!video) {
      throw new Error(`No video called ${compositionId}`);
    }
    res.set("content-type", "video/mp4");

    const tmpDir = await fs.promises.mkdtemp(
      path.join(os.tmpdir(), "remotion-")
    );
    const outputDir = '/Users/cibak/Documents/AtomBits/RemotionVideoServer/output_video'
    const { assetsInfo } = await renderFrames({
      config: video,
      webpackBundle: bundled,
      onStart: () => console.log("Rendering frames..."),
      onFrameUpdate: (f) => {
        if (f % 10 === 0) {
          console.log(`Rendered frame ${f}`);
        }
      },
      parallelism: null,
      outputDir: tmpDir,
      inputProps: req.query,
      // compositionId,
      imageFormat: "jpeg",
    });

    const finalOutput = path.join(outputDir, "out.mp4");
    // const finalOutput = path.join(tmpDir, "out.mp4");
    await stitchFramesToVideo({
      dir: tmpDir,
      force: true,
      fps: video.fps,
      height: video.height,
      width: video.width,
      outputLocation: finalOutput,
      internalOptions:{
        imageFormat: "jpeg",
        preferLossless:false,
        preEncodedFileLocation:null
      },
      assetsInfo,
    });
    // cache.set(JSON.stringify(req.query), finalOutput);
    res.download(outputDir+'/out.mp4')
    // sendFile(finalOutput);
    console.log("Video rendered and sent!");
  } catch (err) {
    console.error(err);
    res.json({
      error: err,
    });
  }
});

app.listen(port);

console.log(
  [
    `The server has started on http://localhost:${port}!`,
    "You can render a video by passing props as URL parameters.",
    "",
    "If you are running Hello World, try this:",
    "",
    `http://localhost:${port}?titleText=Hello,+World!&titleColor=red`,
    "",
  ].join("\n")
);
