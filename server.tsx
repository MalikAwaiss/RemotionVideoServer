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
const ffmpeg = require("fluent-ffmpeg");
const https = require("https");
var bodyParser = require('body-parser')
var cors = require('cors')
var jsonParser = bodyParser.json()
const app = express();
const port = process.env.PORT || 8000;
const deleteTime = 300000;
const payloadTemplate = {
  "payload": {
    videoCategory: 'string',
    applicationId: 'string || number',
    companyId: 'string || number',
    videoData: 'object<VideoPayload>'
  },
}
const VIDEO_CATEGORIES = {
  "Construction": {
    key: "Construction",
    payload: {
      customerName: 'string',
      companyName: 'string',
      loanAmount: 'string',
      installmentAmount: 'string',
      installmentFrequency: 'string',
      startDate: 'string',
      endDate: 'string',
    }
  },
  "Restaurant": {
    key: "Restaurant",
    payload: {
      customerName: 'string',
      companyName: 'string',
      loanAmount: 'string',
      installmentAmount: 'string',
      installmentFrequency: 'string',
      startDate: 'string',
      endDate: 'string',
    }
  },
  "HairDresser": {
    key: "HairDresser",
    payload: {
      customerName: 'string',
      companyName: 'string',
      loanAmount: 'string',
      installmentAmount: 'string',
      installmentFrequency: 'string',
      startDate: 'string',
      endDate: 'string',
    }
  },
}
const compositionId = VIDEO_CATEGORIES.Construction.key;
const outputDir = process.cwd() + '/output_video';

const cache = new Map<string, string>();

app.use(cors());
app.get("/videoEnum", async (req, res) => {
  req.query;
  res.writeHead(200)
  res.write(JSON.stringify({ ...VIDEO_CATEGORIES, ...payloadTemplate }))
  res.end()
})

app.get('/testt', async () => {
  const url = "https://file-examples.com/storage/fef1706276640fa2f99a5a4/2017/04/file_example_MP4_1280_10MG.mp4";
  https.get(url, (res: any) => {
    const path = "testing.mp4";
    const writeStream = fs.createWriteStream(outputDir + '/' + path);

    res.pipe(writeStream);

    writeStream.on("finish", () => {
      writeStream.close();
      console.log("Download Completed!");
    })
  })
})
app.post('/generateVideo', jsonParser, async (req, res) => {
  try {
    console.log('Current directory: ' + process.cwd());
    req.body
    if (!req.body.applicationId || !req.body.videoCategory || !req.body.videoData) {
      res.writeHead(400, 'Bad Request')
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
    console.log('req.body.videoData', req.body.videoData)
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
    const fileName = applicationId + ".mp4";
    const finalOutput = path.join(outputDir, fileName);
    const extraOutputFilename = `${outputDir}/${applicationId}_1.mp4`;
    await stitchFramesToVideo({
      dir: tmpDir,
      force: true,
      fps: video.fps,
      height: video.height,
      width: video.width,
      outputLocation: finalOutput,
      internalOptions: {
        imageFormat: "jpeg",
        preferLossless: false,
        preEncodedFileLocation: null
      },
      assetsInfo,
    });
    ffmpeg(finalOutput)
      .fps(30)
      .addOptions(["-crf 28"])
      .on("end", () => {
        console.log('on End');
        const stream = fs.createReadStream(extraOutputFilename);
        res.set({
          'Content-Disposition': `attachment; filename='${fileName}'`,
          'Content-Type': 'application/video',
        });
        res.setHeader('fileName', fileName)
        stream.pipe(res);
        setTimeout(async () => {
          await fs.unlink(extraOutputFilename, (err) => {
            if (err) throw err;
            console.log(extraOutputFilename + ' was deleted');
          });
          await fs.unlink(finalOutput, (err) => {
            if (err) throw err;
            console.log(finalOutput + ' was deleted');
          });
        }, deleteTime)
      })
      .on("error", (err: any) => {
        console.log({ statusCode: 500, text: err.message });
      })
      .save(extraOutputFilename);
    // res.download(outputDir+'/'+fileName)
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
      internalOptions: {
        imageFormat: "jpeg",
        preferLossless: false,
        preEncodedFileLocation: null
      },
      assetsInfo,
    });
    // cache.set(JSON.stringify(req.query), finalOutput);
    res.download(outputDir + '/out.mp4')
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
