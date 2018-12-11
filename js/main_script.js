const height = 700, width = 700;
const middleX = height/2, middleY = width/2;

const fontSize = 30;

const canvas = document.getElementById("mainCanvas"),
      ctx = canvas.getContext("2d");

let node_nr = 6;
let angle_increment;
let distance = 200, radius = 40;

let neighbour_matrix = [];

let tree = 1;

let root = 0;

let tree_rows = [
  [0],
  [1, 2, 4],
  [3, 5]
];

let parents;

let children = [
  [1, 2, 4],
  [],
  [],
  [],
  [3, 5],
  []
];

let tree_position = [
  {"x": 0, "y": 0},
  {"x": 0, "y": 1},
  {"x": 1, "y": 1},
  {"x": 0, "y": 2},
  {"x": 2, "y": 1},
  {"x": 1, "y": 2}
];

function add_node(){
  node_nr++;

  $("#matrix_container").remove();

  initialize_to_size(node_nr);
  add_matrix();
  draw();
}

function remove_node(){
  if(node_nr){
    node_nr--;

    $("#matrix_container").remove();
    add_matrix();
    draw();
  }
}

function draw(){
  if(tree){
    draw_tree();
  } else {
    draw_graph();
  }
}

initialize_matrix();
add_matrix();
draw();
