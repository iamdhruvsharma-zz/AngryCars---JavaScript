const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");

let player = {speed: 5, score: 0};


let keys = {ArrowUp: false, ArrowDown:false, ArrowLeft: false, ArrowRight:false};

startScreen.addEventListener("click", start);
document.addEventListener("keydown", pressOn);
document.addEventListener("keyup", pressOff);

function moveLines()
{
let lines = document.querySelectorAll(".line");
lines.forEach(function(item){
    if(item.y > 750)
    {
        item.y -= 1000;
    }
    item.y += player.speed - 1;
    item.style.top = item.y + "px";
    //console.log(item.x)
})
}


function isCollide(a, b)
{
let aRect = a.getBoundingClientRect();
let bRect = b.getBoundingClientRect();

return !(
    (aRect.bottom < bRect.top) || 
    (aRect.top > bRect.bottom) ||
    (aRect.right < bRect.left) ||
    (aRect.left > bRect.right)
)
}


function moveEnemy(car)
{
let ele = document.querySelectorAll(".enemy");
ele.forEach(function(item)
{
    //carBox = car.getBoundingClientRect();
    //console.log(carBox.left + " " + carBox.right);
    if(isCollide(car, item)) 
    {
        gameArea.classList.add("hide");
        endGame();
    }
    if(item.y > 900)
    {
        item.y -= 2000;
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        item.style.backgroundColor = randomColor;
        item.style.left = Math.floor(Math.random() * 250) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";

    //console.log(item.x)
})
}


function playGame(){
//console.log("inplay");
let car = document.querySelector(".car");

moveLines();
moveEnemy(car);

let road = gameArea.getBoundingClientRect();
if(player.start)
{
    if(keys.ArrowUp && player.y > road.top)
    {
        player.y -= player.speed + 2;
    }
    if(keys.ArrowDown && player.y < road.bottom)
    {
        player.y += player.speed + 2;
    }
    if(keys.ArrowLeft && player.x > 0)
    {
        player.x -= player.speed;
    }
    if(keys.ArrowRight && player.x < 250)
    {
        player.x += player.speed;
    }
    car.style.left = player.x + "px";
    car.style.top = player.y + "px"; 
    //console.log(player.y); 
    player.score++;  
    score.innerHTML = "<h1>Score: " + player.score + "</h1>";                                                       
    window.requestAnimationFrame(playGame);
}
}

function pressOn(e){
e.preventDefault();
keys[e.key] = true;
//console.log(keys);
}

function pressOff(e){
e.preventDefault();
keys[e.key] = false;
}


function endGame()
{
player.start = false;
score.innerHTML = "<h1>GAME OVER!!!" + "<br/>" +  "Final Score: " + player.score + "</h1>";
startScreen.classList.remove("hide");
}

function start(){

/* y is a coordinate system and works top to bottom
-ve to +ve
*/
startScreen.classList.add("hide");
gameArea.innerHTML = ""; //Game was not restarting because gameArea already had objects so we need to empty!
gameArea.classList.remove("hide");
//console.log(gameArea.classList);
score.classList.remove("hide");
player.start = true;
player.score = 0;

for(let x=0; x<7; x++)
{
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = x*140;
    div.style.top = (x*140) + "px";
    gameArea.appendChild(div);
}

for(let x=0; x<3; x++)
{
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = Math.floor(Math.random() * 1300) * -1;
    enemy.style.left = Math.floor(Math.random() * 250) + "px";
    enemy.style.top = enemy.y + "px";
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    enemy.style.backgroundColor = randomColor;
    gameArea.appendChild(enemy);
}

let car = document.createElement("div");
//car.innerHTML = "DXT's Car";
car.classList.add("car");
gameArea.appendChild(car);
player.x = car.offsetLeft;
player.y = car.offsetTop;
//console.log(player);
window.requestAnimationFrame(playGame);
}
