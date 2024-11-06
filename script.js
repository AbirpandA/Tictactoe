let beep= new Audio("click.wav")
let tiesound=new Audio("chisasur.mp3")
let gamewon= new Audio("adbhut.mp3")
let winimg=document.querySelector(".imgbox")
let overlay=document.querySelector(".overlay")
let playerx=document.querySelector('.playerX')
let playero=document.querySelector('.playerO')
let message=document.querySelector('#message')
var won=false;
var turn="X"
let playagain=document.querySelector(".reset")
var click=0

// function to change turns 
const changeturn=()=>{
    turn = turn === "X" ? "O" : "X";
}

// function to check win 
const checkwin= ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    // possible win combinations
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    

    // itrating through sub arrays of win ie combinations
    wins.forEach(combinations=>{
        if((boxtexts[combinations[0]].innerText===boxtexts[combinations[1]].innerText)&&(boxtexts[combinations[1]].innerText===boxtexts[combinations[2]].innerText)&&(boxtexts[combinations[0]].innerText!=='')){
            won=true;
        }
    }   
    )
}

// logic for game 
let boxes=document.querySelectorAll(".box")
Array.from(boxes).forEach(element=>{
    let boxtext=element.querySelector(".boxtext")
    element.addEventListener('click',()=>{
        if(boxtext.innerText==='' && !won){
            boxtext.innerText=turn;
            beep.pause()
            beep.currentTime=0
            beep.play()
            checkwin()
            
            if(won){
                gamewon.play()
                overlay.style.visibility="visible"
                winimg.innerHTML = "<img src='kbc-adbhut.gif'  style='height:55vh;'></img>";
                message.innerText=`${turn} Won`

            }
            else if (click === 8 && !won) {
                overlay.style.visibility = "visible";
                winimg.innerHTML = "<img src='dis.gif' alt='' style='height:55vh;'></img>";
                message.innerText=`Its a tie mofo;`
                tiesound.play()
            }
            else {
                changeturn()
                click++
                document.querySelector('.infomsg').innerText=`${turn}'s Move`
                if(turn==='X'){
                    playerx.style.backgroundColor="rgba(222, 31, 31, 0.77)"
                     playero.style.backgroundColor="rgba(31, 222, 212, 0)"
                }
                else if(turn==='O'){
                    playero.style.backgroundColor="rgba(31, 222, 212, 0.77)"
                    playerx.style.backgroundColor="rgba(222, 31, 31, 0)"
                }
            }
            
            
        }
        
    })
})

// obj for reset
playagain.onclick=()=>{
    let boxtexts= document.querySelectorAll(".boxtext")
    boxtexts.forEach(boxtext => {
        boxtext.innerText=''
    });
    won=false;
    turn='X'
    overlay.style.visibility="hidden"
    playerx.style.backgroundColor="rgba(222, 31, 31, 0.77)"
     playero.style.backgroundColor="rgba(31, 222, 212, 0)"
     click=0
     gamewon.pause()
     gamewon.currentTime=0
     tiesound.pause()
     tiesound.currentTime=0
}
