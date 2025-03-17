const player = document.querySelector(".player")
const controller = document.querySelector(".controller")
const leftButton = document.querySelector(".left")
const rightButton = document.querySelector(".right")
const actionButton = document.querySelector(".button")
const backgroundGame = document.querySelector(".background")
const playerChat = document.querySelector(".catChat")
const interakBackground = document.querySelector(".interak")
const interakButtonKiri = document.querySelector(".leftInterak")
const interakButtonKanan = document.querySelector(".rightInterak")
const interakButtonClose = document.querySelector(".closeInterak")


const audioAku = document.querySelector(".audio")


const audioKucing = ["../Aseprite/Cat Meow 1.wav", "../Aseprite/Cat Meow 2.wav"]

const photoLabel = document.querySelector(".photoLabel")
const audioWalk = new Audio("../Aseprite/walking SFX.mp3")
audioWalk.volume = 0.01
audioWalk.loop = true

const audioClick = new Audio ("../Aseprite/click SFX.mp3")


const isiNoteArray = [document.querySelector(".scrollIsi" + "1"),
                      document.querySelector(".scrollIsi" + "2"),
                      document.querySelector(".scrollIsi" + "3"),
                      document.querySelector(".scrollIsi" + "4"),
                      document.querySelector(".scrollIsi" + "5")
 ]
const isiPhotoArray = [document.querySelector(".photoIsi" + "1"),
                      document.querySelector(".photoIsi" + "2"),
                      document.querySelector(".photoIsi" + "3"),
                      document.querySelector(".photoIsi" + "4"),
                      document.querySelector(".photoIsi" + "5")
 ]

let backgroundAxis = 0
let playerAxis = 25
let moveInterval = null;

const moveCatFrameRight = ["Kucing Move Right 1.png", "Kucing Move Right 2.png"]
const moveCatFrameLeft = ["Kucing Move Left 1.png", "Kucing Move Left 2.png"]
const idleCatFrame = ["Kucing Idle Right.gif", "Kucing Idle Left.gif"]

let currentFrame = 0;

let modeStatus = null;



function moveLeft(){
    if (backgroundAxis != 0) {
        background.style.left = backgroundAxis + "px"
        backgroundAxis += 10
        currentFrame = (currentFrame + 1) % 2;
        player.style.backgroundImage = `url("../Aseprite/${moveCatFrameLeft[currentFrame]}")`;
        audioWalk.play();
        console.log(backgroundAxis)
    }else{
        if (playerAxis >=25){
            playerAxis -= 10
            player.style.left = playerAxis + "px"
            currentFrame = (currentFrame + 1) % 2;
            player.style.backgroundImage = `url("../Aseprite/${moveCatFrameLeft[currentFrame]}")`;
            audioWalk.play();
            console.log(backgroundAxis)
        }
    }
}


function moveRight(){
    if (playerAxis <= 200){
        playerAxis += 10
        player.style.left = playerAxis + "px"

        currentFrame = (currentFrame + 1) % 2;
        player.style.backgroundImage = `url("../Aseprite/${moveCatFrameRight[currentFrame]}")`;
        audioWalk.play();
        console.log(backgroundAxis)
    }else if(backgroundAxis > -3000){
        background.style.left = backgroundAxis + "px"
        backgroundAxis -= 10
        currentFrame = (currentFrame + 1) % 2;
        player.style.backgroundImage = `url("../Aseprite/${moveCatFrameRight[currentFrame]}")`;
        audioWalk.play();
        console.log(backgroundAxis)
    }
}

function interakClose(){
        photoLabel.style.display = "none"
        controller.style.display = "flex"
        interakBackground.style.display = "none"
        isiNoteArray[arrayForInterak].style.display = "none"
        isiPhotoArray[arrayForInterak].style.display = "none"
        audioAku.style.display = "none"
}

let arrayForInterak = 0;

function checkMode(stats , arraySebelum){
    switch (stats) {
        case "note":
            isiNoteArray[arraySebelum].style.display = "none"
            isiNoteArray[arrayForInterak].style.display = "block"
            break;
        case "photo":
            isiPhotoArray[arraySebelum].style.display = "none"
            isiPhotoArray[arrayForInterak].style.display = "block"
            break;
        case "music":
        audioAku.style.display = "block"
            break;
        case "video":
            break;
        default:
            break;
    }
}

function interakButton(arah, stats){
    if(arah == "kiri"){
        if (arrayForInterak !=0){
            arrayForInterak -= 1
            checkMode(stats, arrayForInterak + 1)
        }
    }else if (arah == "kanan"){
        if (arrayForInterak !=4){
        arrayForInterak += 1
        checkMode(stats, arrayForInterak - 1)
        }
    }
}

function checkIsi(){
    arrayForInterak = 0;
    if(modeStatus != null){
        controller.style.display = "none"
        interakBackground.style.display = "flex"
        console.log(modeStatus)
        if (modeStatus == "note"){
            isiNoteArray[0].style.display = "block"
        }else if (modeStatus == "photo"){
            photoLabel.style.display = "block"
            isiPhotoArray[0].style.display = "block"
        }else if (modeStatus == "music"){
            audioAku.style.display = "block"
        }else if(modeStatus == "video"){
            ()=>{
                 window.location.href = "https://drive.google.com/file/d/1F24H5rOfWqs5I_KjBcI4r2wSQUpSiXzk/view"
            }
        }
    }
}



function checkAction(){
    if(backgroundAxis < -700 && backgroundAxis > -850){
        actionButton.style.display = "block";
        modeStatus = "note"
    }else if(backgroundAxis < -1200 && backgroundAxis > -1420){
        actionButton.style.display = "block";
        modeStatus = "photo"
    }else if(backgroundAxis < -1700 && backgroundAxis > -1920){
        actionButton.style.display = "block";
        modeStatus = "music"
    }else if(backgroundAxis < -2200 && backgroundAxis > -2400){
        actionButton.style.display = "block";
        window.location.href = "https://drive.google.com/file/d/1F24H5rOfWqs5I_KjBcI4r2wSQUpSiXzk/view"
        modeStatus = "video"
    }else{
        actionButton.style.display = "none";
        modeStatus = null
    }
}



const background = document.querySelector('.background');
let bgPosition = 1; // Posisi awal background
const speed = 5; // Kecepatan scroll

leftButton.addEventListener("touchstart", () => {
    if (!moveInterval) moveInterval = setInterval(()=>{moveLeft();checkAction();}, 50);
});
leftButton.addEventListener("touchend", () => {
    clearInterval(moveInterval);
    audioWalk.pause();
    audioWalk.currentTime = 0
    player.style.backgroundImage = `url("../Aseprite/${idleCatFrame[1]}")`;
    moveInterval = null;
});



rightButton.addEventListener("touchstart", () => {
    if (!moveInterval) moveInterval = setInterval(()=>{moveRight();checkAction();}, 50);
});
rightButton.addEventListener("touchend", () => {
    clearInterval(moveInterval);
    audioWalk.pause();
    audioWalk.currentTime = 0
    player.style.backgroundImage = `url("../Aseprite/${idleCatFrame[0]}")`;
    moveInterval = null;
});

player.addEventListener("touchstart", ()=>{
    playerChat.style.display = "block";
    const audioKucingClick = new Audio(audioKucing[Math.floor(Math.random() *2)])
    audioKucingClick.play() 
    setTimeout(()=>{
        playerChat.style.display = "none";
    },2000)
    
})

actionButton.addEventListener("touchstart",()=>{
    checkIsi()
})

interakButtonClose.addEventListener("touchstart",()=>{
    audioClick.play()
    interakClose()
})
interakButtonKiri.addEventListener("touchstart",()=>{
    audioClick.play()
    interakButton("kiri", modeStatus)
})
interakButtonKanan.addEventListener("touchstart",()=>{
    audioClick.play()
    interakButton("kanan", modeStatus)
})


//leftButton.addEventListener('mousedown', () => {
    //console.log("tertekan")
    // if (event.key === 'ArrowRight') {
    //     if(bgPosition >= -300){
    //     bgPosition -= speed; // Geser background ke kiri jika jalan ke kanan
    // }} else if (event.key === 'ArrowLeft') {
    //     if(bgPosition <0){
    //     bgPosition += speed; // Geser background ke kanan jika jalan ke kiri
    //     }
    // }
    //background.style.left = `${bgPosition}px`; // Update posisi background
//});