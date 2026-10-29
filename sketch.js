let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;
let dots = [];



function setup() {
  createCanvas(480, 360);

  let spacing = 60;
  let row = 0;

  for(let y = 20; y< height; y+= spacing){
    let offset = (row % 2 === 0) ? 0: spacing/2;

    for (let x = 20 + offset; x < width; x+= spacing){
      dots.push({x:x, y:y, s:3});
    }
    row++;
  }
  
  spawnGhost();


}

function drawDots(){
  noStroke();
  fill(255,165,0);
  for (let d of dots) {
    ellipse(d.x, d.y, d.s * 2)
  }
}
function draw() {
  background(34, 19, 58);
  drawDots();

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    textSize(22);
    textFont('Times New Roman');
    text( 'BOO!' + '\nClick to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255, 255, 255);
    textSize(22);
      text('Game over!\nScore: ' + score + '\nClick to retry', width/ 2, height / 2);
   return;
  }
  
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0){
    state= 'over';
    return;
  }

   if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);
  

  textAlign(LEFT, TOP);
  fill(255, 255, 255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time left: ' + ceil(timeLeft), width - 12, 10);
}

function mousePressed() {

  
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}

  function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}


  function drawGhost(x, y) {
  rectMode(CENTER)
  noStroke();
  fill(255, 255, 255);
  rect(x, y, 60, 60);
  rect(x - 25, y + 32, 10, 10);
  rect(x + 25, y + 32, 10, 10);
  rect(x , y + 32, 10, 10);

  
  fill(40, 0, 0);
  rect(x - 12, y - 8, 10, 14);
  rect(x + 12, y - 8, 10, 14);
 

  fill(40, 0, 0);
  rect(x , y + 9, 30, 6);
  rect(x-12, y + 5, 6, 6);
  rect(x+ 12, y + 5, 6, 6)

    
  }