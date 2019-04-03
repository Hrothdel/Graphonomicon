const height = 700, width = 700;
const middleX = height/2,
      middleY = width/2;

const canvas = document.getElementById("mainCanvas"),
      ctx = canvas.getContext("2d");

let node_number = 6, distance = 200,
    radius = 40, fontSize = 30;

let angle_increment,
    neighbour_matrix = [];

let tree = 0, directed = 1;

let root = 0, tree_rows, parents = [],
    children = [], tree_position;

let arrow_color = "#f77",
    line_color = "#000",
    node_color = "#3ee",
    node_number_color = "#fff";

neighbour_matrix = create_initialized_matrix(
                    node_number, node_number, 0);

add_matrix();
add_collapsible_listeners();

set_default_values();

draw();
