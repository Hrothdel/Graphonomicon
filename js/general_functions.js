function add_collapsible_listners(){
  let elements = $(".collapsible");

  for(let i = 0; i < elements.length; i++){
    let sibling = elements[i].nextElementSibling;

    $(elements[i]).click(function(){
      $(sibling).toggleClass("collapsed");
      $(this).toggleClass("active");
    });

    if($(elements[i]).hasClass("active") == false){
      $(sibling).addClass("collapsed");
    }
  }
}

function set_directed_checkbox(){
  $("#directed_checkbox").prop("checked", directed);
}

function set_tree_checkbox(){
  $("#tree_checkbox").prop("checked", tree);
}

function toggle_directed(){
  tree = 0;
  if(directed){
    directed = 0;
    convert_directed_connections();
  } else{
    directed = 1;
  }

  draw();
}

function toggle_tree(){
  if(!tree && !directed){
    toggle_directed();
  }
  tree = !tree;

  draw();
}

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

function fill_graph(){
  for(let i = 0; i < node_nr; i++){
    for(let j = 0; j < node_nr; j++){
      if(i != j){
        neighbour_matrix[i][j] = 1;

        update_button_matrix_position(i, j);
      }
    }
  }

  draw();
}

function clear_graph(){
  for(let i = 0; i < node_nr; i++){
    for(let j = 0; j < node_nr; j++){
      neighbour_matrix[i][j] = 0;

      update_button_matrix_position(i, j);
    }
  }

  draw();
}

function draw(){
  ctx.clearRect(0, 0, width, height);

  if(tree){
    update_tree_information();
    draw_tree();
  } else {
    draw_graph();
  }
}
