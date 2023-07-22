const stack = new Array(16);
const numbers = new Array(16);
const tiles = document.getElementsByClassName("tile");
const score = document.getElementById("score");
const varr = document.getElementsByClassName("var");
let scoreStack = 0;
let counter = 0;
let varrIndex = 0;
start();

function start () {
    let rand1 = Math.floor(Math.random() * 16);
    let rand2 = Math.floor(Math.random() * 16);
    while (rand2 == rand1)
        rand2 = Math.floor(Math.random() * 16);
    /*for (let i = 0; i < 16; i++) {
        if (i == rand1 || i == rand2)
            tiles[i].innerHTML = "2";
        else
            tiles[i].innerHTML = "";
    }*/
    for (let i = 0; i < 16; i++) {
        numbers.splice(i,1,tiles[i].innerHTML);
        tiles[i].style.transition = "none";
    }
    score.innerHTML = 0;
    scoreStack = 0;
    updateStack();
    setbgColor();
}

document.getElementById("left").onclick = function () {
    updateStack();
    scoreStack = parseInt(score.innerHTML);
    let timer = 0,temp,timer2=0;
    move(1,0,4,1,0,-1,15,4,0);
    if (counter > 0 ) {timer ++; timer2++;}
    setTimeout(function() {add(1,0,4,1,0,-1,15,4); temp = counter;},timer * 300);
    setTimeout(function() {move(1,0,4,1,0,-1,15,4,counter); if (counter-temp>0) timer2++;},timer*300);
    setTimeout(function() {if (counter != 0) create();},timer2 * 300 + 1);
    setTimeout(setbgColor,timer2 * 300 + 2);     
}

document.getElementById("down").onclick = function () {
    updateStack();
    scoreStack = parseInt(score.innerHTML);
    let timer = 0,temp,timer2=0;
    move(8,0,9,-4,0,-1,4,1,0);
    if (counter > 0 ) {timer ++; timer2++;}
    setTimeout(function() {add(8,0,9,-4,0,-1,4,1); temp = counter;},timer * 300);
    setTimeout(function() {move(8,0,9,-4,0,-1,4,1,counter); if (counter-temp>0) timer2++;},timer*300);
    setTimeout(function() {if (counter != 0) create();},timer2 * 300 + 1);
    setTimeout(setbgColor,timer2 * 300 + 2);
}

document.getElementById("right").onclick = function () {
    updateStack();
    scoreStack = parseInt(score.innerHTML);
    let timer = 0,temp,timer2=0;
    move(2,0,3,-1,0,-1,15,4,0);
    if (counter > 0 ) {timer ++; timer2++;}
    setTimeout(function() {add(2,0,3,-1,0,-1,15,4); temp = counter;},timer * 300);
    setTimeout(function() {move(2,0,3,-1,0,-1,15,4,counter); if (counter-temp>0) timer2++;},timer*300);
    setTimeout(function() {if (counter != 0) create();},timer2 * 300 + 1);
    setTimeout(setbgColor,timer2 * 300 + 2);
}

document.getElementById("up").onclick = function () {
    updateStack();
    scoreStack = parseInt(score.innerHTML);
    let timer = 0,temp,timer2=0;
    move(4,3,15,4,0,-1,4,1,0);
    if (counter > 0 ) {timer ++; timer2++;}
    setTimeout(function() {add(4,3,15,4,0,-1,4,1); temp = counter;},timer * 300);
    setTimeout(function() {move(4,3,15,4,0,-1,4,1,counter); if (counter-temp>0) timer2++;},timer*300);
    setTimeout(function() {if (counter != 0) create();},timer2 * 300 + 1);
    setTimeout(setbgColor,timer2 * 300 + 2);  
}

document.getElementById("undo").onclick = function () {
    display();
}

document.getElementById("new").onclick = function () {
    start();
}

function display () {
    for (let i =0; i<16; i++) {
        tiles[i].innerHTML = stack[i];
        numbers[i] = stack[i];
    }
    score.innerHTML = scoreStack.toString();    
    setbgColor();    
}

function create () {
    let rand = Math.floor(Math.random() * 16);
    while (tiles[rand].innerHTML != "")
        rand =  Math.floor(Math.random() * 16);
    
    tiles[rand].style.transition = "all 0.4s linear";
    tiles[rand].innerHTML = "2";
    numbers[rand] = "2";
}

function add (initialI,startI,endI,stepI,initialJ,startJ,endJ,stepJ) {
    for (let i = initialI; i >= startI && i < endI; i += stepI) {
        for (let j = initialJ; j >= startJ && j < endJ; j += stepJ) {
            if (numbers[i + j] == "") continue;
            if (numbers[i + j] == numbers[i + j - stepI]) {
                let x = 2 *parseInt(numbers[i + j - stepI]);
                numbers[i + j - stepI] = x.toString();
                numbers[i + j] = "";
                tiles[i + j - stepI].innerHTML = x.toString();
                tiles[i + j].innerHTML = "";
                score.innerHTML = parseInt(score.innerHTML) + x;
                counter++;
            }
        }
    }
}


function move (initialI,startI,endI,stepI,initialJ,startJ,endJ,stepJ,x) {
    counter = x;
    for (let i = initialI; i >= startI && i < endI; i += stepI) {
        for (let j = initialJ; j >= startJ && j < endJ; j += stepJ) {
            if (numbers[i + j] == "") continue;
            switch (i) {
                case initialI:
                    if (numbers[i + j - stepI] == "") {
                        moveDetail(i+j,1,stepI,initialI+stepI);
                        counter++;
                    }
                    break;
                case initialI + stepI : 
                    if (numbers[i + j - stepI] == "" && numbers[i + j - 2 * stepI] == "") {  
                        moveDetail(i+j,2,stepI,initialI+stepI);
                        counter++;
                    }
                    else if (numbers[i + j - stepI] == "") {
                        moveDetail(i+j,1,stepI,initialI+stepI);
                        counter++;
                    }
                    break;
                case initialI + 2 * stepI :
                    if (numbers[i + j - stepI] == "" && numbers[i + j - 2 * stepI] == "" && numbers[i + j - 3 * stepI] == "") {  
                        moveDetail(i+j,3,stepI,initialI+stepI);
                        counter++;
                    }
                    else if (numbers[i + j - stepI] == "" && numbers[i + j - 2 * stepI] == "") {  
                        moveDetail(i+j,2,stepI,initialI+stepI);
                        counter++;
                    }
                    else if (numbers[i + j - stepI] == "") {
                        moveDetail(i+j,1,stepI,initialI+stepI);
                        counter++;
                    }
                    break;
            }
        }
    }
    varrIndex = 0;
}

function moveDetail (k,coff,step,dir) {
    let string = "translate"
    if (dir == 1) string += "X(";
    else if (dir == 2) string += "X(-";
    else if (dir == 4) string += "Y(";
    else string += "Y(-";
    string += (coff * 123).toString() + "px)";
    tiles[k].style.transition = "all 0.3s linear";
    tiles[k].style.transform = string;
    numbers[k - coff * step] = numbers[k];
    numbers[k] = "";
    varr[varrIndex].style.top = (40 + Math.floor(k/4) * 123).toString() + "px" ;
    varr[varrIndex].style.left = (250 + (k % 4) * 123).toString() + "px" ;
    varr[varrIndex].style.visibility = "visible";
    varrIndex++;
    setTimeout(function() {
        tiles[k].style.transition = "none";
        tiles[k].style.transform = "none";
        tiles[k - coff * step].innerHTML = tiles[k].innerHTML;
        tiles[k].innerHTML = "";
        tiles[k].style.backgroundColor = "#CDC1B4";
        varr[0].style.visibility = "hidden";
        },300)
}

function updateStack () {
    for (let i = 0; i < 16; i++) {
        stack.splice(i,1,tiles[i].innerHTML);
        tiles[i].style.transition = "none";
    }
}

function setbgColor () {
    for (let i = 0; i<16; i++) {
        switch (numbers[i]) {
            case "2" : tiles[i].style.backgroundColor = "#EEE4DA"; tiles[i].style.color = "#776E65"; break;
            case "4" : tiles[i].style.backgroundColor = "#EDE0C8"; tiles[i].style.color = "#776E65"; break;
            case "8" : tiles[i].style.backgroundColor = "#F2B179"; tiles[i].style.color = "#FFF"; break;
            case "16" : tiles[i].style.backgroundColor = "#F59563"; tiles[i].style.color = "#FFF"; break;
            case "32" : tiles[i].style.backgroundColor = "#F67C5F"; tiles[i].style.color = "#FFF"; break;
            case "64" : tiles[i].style.backgroundColor = "#F65E3B"; tiles[i].style.color = "#FFF"; break;
            case "128" : tiles[i].style.backgroundColor = "#EDCF72"; tiles[i].style.color = "#FFF"; break;
            case "256" : tiles[i].style.backgroundColor = "#EDCC61"; tiles[i].style.color = "#FFF"; break;
            case "512" : tiles[i].style.backgroundColor = "#edc953"; tiles[i].style.color = "#FFF"; break;
            case "1024" : tiles[i].style.backgroundColor = "#ebc444"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "45px";  break;
            case "2048" : tiles[i].style.backgroundColor = "#e8bc2a"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "45px"; break;
            case "4096" : tiles[i].style.backgroundColor = "#000"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "38px"; break;
            case "8192" : tiles[i].style.backgroundColor = "#000"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "38px"; break;
            case "16384" : tiles[i].style.backgroundColor = "#000"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "38px"; break;
            case "32768" : tiles[i].style.backgroundColor = "#000"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "38px"; break;
            case "65536" : tiles[i].style.backgroundColor = "#000"; tiles[i].style.color = "#FFF"; tiles[i].style.fontSize = "38px"; break;
            default : tiles[i].style.backgroundColor = "#CDC1B4";
        }
    }
}
