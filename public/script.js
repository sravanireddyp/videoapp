//assigning variables
const socket=io("/");
const videoGrid=document.getElementById("video-grid");
const video=document.createElement("video");
const showChat=document.querySelector("#showChat");
const backBtn=document.querySelector(".header__back");
myVideo.muted=true;
//adding eventListeners
backBtn.addEventListener("click",()=>
{
    document.querySelector(".main__right").style.display="none";
    document.querySelector(".header__back").style.display="none";
    document.querySelector(".main__left").style.display="flex";
    document.querySelector(".main__left").style.display="1";

})
showChat.addEventListener("click",()=>
{
    document.querySelector(".main__right").style.display="flex";
    document.querySelector(".main__right").style.flex="1";
    document.querySelector(".main__left").style.display="flex";
    document.querySelector(".header__back").style.display="block"; 
})
const user=prompt("Enter name");
var peer=new peer(undefined,
    {
        path:"/peerjs",
        host:"/",
        port:"443",
    });
    let myVideoStream;
    navigator.mediaDevices.getUserMedia(
        {
            audio:true,
            video:true,
        
        })
    .then((stream)=>
    {
        myVideoStream=stream;
        addVideoStream(myVideo,stream);
        //adding connection to peer
        peer.on("call",(call)=>
        {
          call.answer(stream);
         const video= document.createElement("video")
         call.on("stream",(userVideoStream)=>
         {
             addVideoStream(video,userVideoStream)
         })
        })
        //establishing a connection between users
        socket.on("user-connected",(userId)=>{
            connectToNewUser(userId,stream)
        })
    })
    connectToNewUser=(userId,stream)=>
    {
        const call=peer.call(userId,stream);
        const video=document.createElement("video");
        call.on("stream",(userVideoStream)=>{
            addVideoStream(video,userVideoStream);
        })

    };
    peer.on("open",(id)=>{
        socket.emit("join-room",ROOM_ID,id,user);
    });
     const addVideoStream=(video,stream)=>{
         video.srcObject=stream;
         video.addEventListener("loadmetadata" ,()=>{

            video.play();
            videoGrid.append(video);
         })
     };
     //text 
  let text=document.querySelector("#chat_message");
  let send=document.querySelector("send");
  let messages=document.querySelector(".messages");
  



