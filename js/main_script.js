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
