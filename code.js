
const { response } = require("express");
const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo", async(req, res)=>{    
    const videoURL = req.query.videoURL;       
    const info = await ytdl.getInfo(videoURL);    
    //console.log(info);
    res.status(200).json(info);

});

app.get("/download", (req,res)=>{
    const videoURL = req.query.videoURL;
    const itag = req.query.itag;
    res.header("Content-Disposition",'attachment;\ filename="video.mp4"');    
    ytdl(videoURL,{
        filter: format => format.itag == itag
    }).pipe(res);
})

app.listen(5000, ()=>{
    console.log(`Server Listening on port 5000`);
});



