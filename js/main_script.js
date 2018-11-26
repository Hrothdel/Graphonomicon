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

function add_node(){
  node_nr++;

  $("#matrix_container").remove();

  initialize_to_size(node_nr);
  add_matrix();
  draw_graph();
}

function remove_node(){
  if(node_nr){
    node_nr--;

    $("#matrix_container").remove();
    add_matrix();
    draw_graph();
  }
}

initialize_matrix();
add_matrix();
draw_graph();
