const height = 700, width = 700;
const middleX = height/2, middleY = width/2;

const fontSize = 30;

const canvas = document.getElementById("mainCanvas"),
      ctx = canvas.getContext("2d");
let node_nr = 6;
let angle_increment;
let distance = 200, radius = 40;
let posX, posY, angle;

let neighbour_matrix = [];

function initialize_matrix(){
  for(let i = 0; i < node_nr; i++){
    neighbour_matrix[i] = [];
    for(let j = 0; j < node_nr; j++){
      neighbour_matrix[i][j] = 0;
    }
  }
}

function initialize_to_size(index){
  if(!neighbour_matrix[index-1]){
    neighbour_matrix[index-1] = [];

    for(let i = 0; i < index; i ++){
      neighbour_matrix[index-1][i] = 0;
      neighbour_matrix[i][index-1] = 0;
    }
  }
}

function toggle_position(x, y){
  if(neighbour_matrix[x][y]){
    neighbour_matrix[x][y] = 0;
  } else {
    neighbour_matrix[x][y] = 1;
  }
}

function update_button_matrix_position(x, y){
  $(`#matrix_button-${x*node_nr+y+1}`).text(neighbour_matrix[x][y]);
}

function toggle_connection(x, y){
  toggle_position(x, y);
  toggle_position(y, x);

  update_button_matrix_position(x, y);
  update_button_matrix_position(y, x);

  draw_graph();
}

function draw_graph(){
  ctx.lineWidth = 5;
  ctx.font = fontSize + "px Arial";

  ctx.clearRect(0, 0, width, height);

  angle_increment = Math.PI*2/node_nr;
  angle = 0;

  for(let i = 0; i < node_nr; i++){
    for(let j = 0; j < node_nr; j++){
      if(neighbour_matrix[i][j] == 1){
        connect_nodes(i+1, j+1);
      }
    }
  }

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

function connect_nodes(node_a, node_b){
  node_a--;
  node_b--;
  let start = angle_increment * node_a,
      end   = angle_increment * node_b,
      between = (end-start)/2;

  ctx.beginPath();
  ctx.moveTo(middleX + Math.cos(angle_increment*node_a)*distance,
             middleY + Math.sin(angle_increment*node_a)*distance);

  let bezierOffset = 100;
  let cpx1 = middleX + Math.cos(start)*(distance - bezierOffset),
      cpy1 = middleY + Math.sin(start)*(distance - bezierOffset),
      cpx2 = middleX + Math.cos(end)*(distance - bezierOffset),
      cpy2 = middleY + Math.sin(end)*(distance - bezierOffset);

  ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, middleX + Math.cos(angle_increment*node_b)*distance,
             middleY + Math.sin(angle_increment*node_b)*distance);
  ctx.stroke();
}
