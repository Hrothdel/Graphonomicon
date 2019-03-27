function draw_tree_connection(parent, child,
                              verticalPadding, parentHorizontalPadding,
                              verticalSpacing, horizontalSpacing){
  let childHorizontalPadding = (width - 2 * radius -
                horizontalSpacing *
                (tree_rows[tree_position[child].y].length - 1)) / 2,
      parentY = verticalPadding + radius +
                (tree_position[parent].y * radius * 2) +
                (tree_position[parent].y * verticalSpacing),
      parentX = parentHorizontalPadding + radius +
                (tree_position[parent].x * horizontalSpacing),
      childX  = childHorizontalPadding + radius +
                (tree_position[child].x * horizontalSpacing),
      childY  = parentY + verticalSpacing + radius * 2;

  ctx.strokeStyle = line_color;

  ctx.beginPath();

  ctx.lineWidth = 5;

  ctx.moveTo(parentX, parentY);
  ctx.lineTo(childX, childY);

  ctx.stroke();
}

function draw_row_connections(row, verticalPadding, horizontalPadding,
                              verticalSpacing, horizontalSpacing){
  for(let i = 0; i < tree_rows[row].length; i++){
    let parent = tree_rows[row][i];

    for(let j = 0; j < children[parent].length; j++){
      draw_tree_connection(parent, children[parent][j],
                           verticalPadding, horizontalPadding,
                           verticalSpacing, horizontalSpacing);
    }
  }
}

function draw_tree(){
  let posX, posY,
      verticalPadding, horizontalPadding
      verticalSpacing = 130,
      horizontalSpacing = 120;

  verticalPadding = (height - radius * 2 * tree_rows.length -
                    verticalSpacing * (tree_rows.length - 1)) / 2;

  ctx.font = fontSize + "px Arial";

  for(let i = 0; i < tree_rows.length; i++){
    horizontalPadding = (width - 2 * radius -
                        horizontalSpacing * (tree_rows[i].length - 1)) / 2;

    draw_row_connections(i, verticalPadding, horizontalPadding,
                        verticalSpacing, horizontalSpacing);

    posX = horizontalPadding + radius;
    posY = verticalPadding + radius + (i * radius * 2)  +
          (i * verticalSpacing);

    for(let j = 0; j < tree_rows[i].length; j++){
      ctx.beginPath();

      ctx.fillStyle = node_color;
      ctx.arc(posX, posY, radius, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = node_number_color;
      ctx.fillText(tree_rows[i][j]+1, posX-fontSize/3, posY+fontSize/3);

      posX += horizontalSpacing;
    }
  }
}

function update_tree_parents(){
  let done = false,
      stack = [];

  parents = [];
  parents[root] = -1;
  stack[0] = root;

  while(stack.length){
    current_node = stack.pop();

    for(let i = 0; i < node_number; i++){
      if(neighbour_matrix[current_node][i] && parents[i] == undefined){
        parents[i] = current_node;
        stack.push(i);
      }
    }
  }
}

function clear_tree_children(){
  children = [];
  for(let i = 0; i < node_number; i++){
    children[i] = [];
  }
}

function update_tree_children(){
  update_tree_parents();

  clear_tree_children();

  for(let i = 0; i < node_number; i++){
    if(parents[i] != -1 && children[parents[i]]){
      children[parents[i]].push(i);
    }
  }
}

function update_tree_rows(){
  update_tree_children();

  let current_row_nodes = [],
      current_row_number = 0,
      next_row_nodes = [];

  tree_rows = [];
  current_row_nodes.push(root);

  while(current_row_nodes.length > 0 && current_row_number < 20){
    tree_rows[current_row_number] = current_row_nodes;
    next_row_nodes = [];

    for(let i = 0; i < current_row_nodes.length; i++){
      let current_node = current_row_nodes[i];

      for(let j = 0; j < children[current_node].length; j++){
        next_row_nodes.push(children[current_node][j]);
      }
    }
    current_row_nodes = next_row_nodes;
    current_row_number++;
  }
}

function update_tree_position(){
  update_tree_rows();

  tree_position = [];

  for(let i = 0; i < tree_rows.length; i++){
    for(let j = 0; j < tree_rows[i].length; j++){
      tree_position[tree_rows[i][j]] = {"x": j, "y": i};
    }
  }
}

function update_tree_information(){
  update_tree_position();
}

function change_root(new_root){
  let current_node = parents[new_root],
      last_node = new_root;

  while(current_node != -1 && current_node != undefined){
    toggle_matrix_position(current_node, last_node);
    toggle_matrix_position(last_node, current_node);
    last_node = current_node;
    current_node = parents[last_node];
  }

  parents[root] = -1;
  root = new_root;
}
