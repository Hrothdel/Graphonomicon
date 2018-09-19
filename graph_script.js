const height = 700, width = 700;
const middleX = height/2, middleY = width/2;

const fontSize = 30;

const canvas = document.getElementById("mainCanvas"),
    ctx = canvas.getContext("2d");
ctx.lineWidth = 5;
ctx.font = fontSize + "px Arial";

let node_nr = 3;
let angle_increment;
let distance = 200, radius = 40;
let posX, posY, angle;

function draw_graph(){
  ctx.clearRect(0, 0, width, height);

  angle_increment = Math.PI*2/node_nr;
  angle = 0;

  for(let i = 0; i < node_nr; i++){
      posX = middleX + Math.cos(angle)*distance;
      posY = middleY + Math.sin(angle)*distance;

      ctx.beginPath();

      ctx.fillStyle = "#3ee";
      ctx.arc(posX, posY, radius, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.fillText(i+1, posX-fontSize/3, posY+fontSize/3);


      angle += angle_increment;
  }
}

function add_node(){
  node_nr++;

  draw_graph();
}

function remove_node(){
  if(node_nr){
    node_nr--;

    draw_graph();
  }
}

draw_graph();
