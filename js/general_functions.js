function add_collapsible_listeners(){
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

function add_listeners(){
  add_collapsible_listeners();

  $(window).click(function(event) {
    if(event.target.id === "options_modal"){
      hide_options_screen();
    }
  });
}

function set_default_values(){
  $("#node_number_input").val(6);
  $("#tree_root_input").val(1);
  $("#tree_checkbox").prop("checked", tree);
  $("#directed_checkbox").prop("checked", directed);
}

function update_checkbox_state(id, value){
  $(id).prop("checked", value);
}

function toggle_directed(){
  if(directed){
    if(tree){
      toggle_tree();
      update_checkbox_state("#tree_checkbox", tree);
    }

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
    update_checkbox_state("#directed_checkbox", directed);
  }
  tree = !tree;

  draw();
}

function fill_graph(){
  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      if(i != j){
        neighbour_matrix[i][j] = 1;

        update_button_matrix_position(i, j);
      }
    }
  }

  draw();
}

function clear_graph(){
  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
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

  update_all_information();
}

function update_node_number(){
  let last_number = node_number;

  node_number = Number($("#node_number_input").val());

  update_neighbour_matrix(last_number);
  draw();
}

function update_tree_root(){
  let input = Number($("#tree_root_input").val());

  if(input > node_number){
    input = node_number;
    $("#tree_root_input").val(input);
  }

  change_root(input - 1);

  draw();
}

function count_connections(){
  let connection_count = 0;

  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      if(neighbour_matrix[i][j]){
        connection_count++;
      }
    }
  }

  if(!directed){
    connection_count /= 2;
  }

  return connection_count;
}

function update_information_display(name, value){
  $("#"+name).text(value);
}

function update_all_information(){
  let value;

  value = count_connections();
  update_information_display("connection_count", value);

  value = count_leaves();
  update_information_display("leaf_count", value);

  if(tree){
    $("#tree_information").css("display", "block");
  } else {
    $("#tree_information").css("display", "none");
  }
}

function show_options_screen(){
  $("#options_modal").removeClass("transparent");
}

function hide_options_screen(){
  $("#options_modal").addClass("transparent");
}
