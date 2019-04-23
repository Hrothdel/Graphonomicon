const HEIGHT = 700, WIDTH = 700;
const MIDDLE_X = HEIGHT/2,
      MIDDLE_Y = WIDTH/2;

const canvas = document.getElementById("main-canvas"),
      ctx = canvas.getContext("2d");

let node_number = 6, distance = 200,
    radius = 40, font_size = 30;

let angle_increment,
    neighbor_matrix = [];

let tree = 0, directed = 1;

let root = 0, tree_rows, parents = [],
    children = [], tree_position;

let arrow_color = "#ff7777",
    line_color = "#000000",
    node_color = "#33eeee",
    node_number_color = "#ffffff";

let connection_width = 5;

neighbor_matrix = createInitializedMatrix(
                    node_number, node_number, 0);

if(location.hash.length){
  evaluateStateCode();
}

addMatrix();
addListeners();

updateInputFields();

update();
