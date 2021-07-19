const d = document;

const currentUrl = window.location.href;

const host = currentUrl;
d.querySelector("#get-video-info-btn").addEventListener("click",()=>{
    
    let videoURL = d.querySelector("#videoURL").value.trim();    
    if(videoURL.length == 0){
        alert("Please enter Youtube video link");
        return;
    }
       
    fetch(host+"videoInfo?videoURL="+videoURL, {
        credentials: "same-origin"
    }).then((res)=>{       
        return res.json();
    }).then((data)=>{
        
        let detailsNode = {
            thumbnail: d.querySelector(".video-data .thumbnail img"),
            title: d.querySelector(".video-data .info h2"),
            description: d.querySelector(".video-data .info p"),
            videoURL: d.querySelector(".video-data .controls #video-url"),
            downloadOptions: d.querySelector(".video-data .controls #download-options")
        };
        
        let html = "";
        for(let i=0; i<data.formats.length; i++){         
            if( data.formats[i].container != "mp4"){
                continue;
            }

            if ( data.formats[i].qualityLabel == null){
                continue;
            }

            if(data.formats[i].audioCodec == null){
                continue;
            }            
            //console.log(i)
            html += `
						<option value="${data.formats[i].itag}">
							${data.formats[i].container} - ${data.formats[i].qualityLabel}
						</option>
					`;          
            detailsNode.downloadOptions.innerHTML = html;              
        };                   
             
        detailsNode.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url; 
        detailsNode.title.innerText = data.videoDetails.title;
        detailsNode.description.innerText = data.videoDetails.description;
        detailsNode.videoURL.value = videoURL;
        d.querySelector(".video-data").style.display = "block";
        d.querySelector(".video-data .controls #download-options").scrollIntoView({
            behavior: "smooth"
        });

    }).catch((err)=>{
        alert("Something went wrong");
    })
});

d.querySelector("#download-btn").addEventListener("click", ()=>{
    let videoURL = d.querySelector("#video-url").value;
    let itag = d.querySelector("#download-options").value;
    window.open(host + "download?videoURL=" + videoURL + "&itag="+itag);
})











