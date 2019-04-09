function drawTreeConnection(parent, child,
                              vertical_padding, parent_horizontal_padding,
                              vertical_spacing, horizontal_spacing){
  let child_horizontal_padding = (WIDTH - 2 * radius -
                horizontal_spacing *
                (tree_rows[tree_position[child].y].length - 1)) / 2,
      parent_y = vertical_padding + radius +
                (tree_position[parent].y * radius * 2) +
                (tree_position[parent].y * vertical_spacing),
      parent_x = parent_horizontal_padding + radius +
                (tree_position[parent].x * horizontal_spacing),
      child_x  = child_horizontal_padding + radius +
                (tree_position[child].x * horizontal_spacing),
      child_y  = parent_y + vertical_spacing + radius * 2;

  ctx.strokeStyle = line_color;

  ctx.beginPath();

  ctx.lineWidth = 5;

  ctx.moveTo(parent_x, parent_y);
  ctx.lineTo(child_x, child_y);

  ctx.stroke();
}

function drawRowConnections(row, vertical_padding, horizontal_padding,
                              vertical_spacing, horizontal_spacing){
  for(let i = 0; i < tree_rows[row].length; i++){
    let parent = tree_rows[row][i];

    for(let j = 0; j < children[parent].length; j++){
      drawTreeConnection(parent, children[parent][j],
                           vertical_padding, horizontal_padding,
                           vertical_spacing, horizontal_spacing);
    }
  }
}

function drawTree(){
  let pos_x, pos_y,
      vertical_padding, horizontal_padding
      vertical_spacing = 130,
      horizontal_spacing = 120;

  vertical_padding = (HEIGHT - radius * 2 * tree_rows.length -
                    vertical_spacing * (tree_rows.length - 1)) / 2;

  ctx.font = font_size + "px Arial";

  for(let i = 0; i < tree_rows.length; i++){
    horizontal_padding = (WIDTH - 2 * radius -
                        horizontal_spacing * (tree_rows[i].length - 1)) / 2;

    drawRowConnections(i, vertical_padding, horizontal_padding,
                        vertical_spacing, horizontal_spacing);

    pos_x = horizontal_padding + radius;
    pos_y = vertical_padding + radius + (i * radius * 2)  +
          (i * vertical_spacing);

    for(let j = 0; j < tree_rows[i].length; j++){
      ctx.beginPath();

      ctx.fillStyle = node_color;
      ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = node_number_color;
      ctx.fillText(tree_rows[i][j]+1, pos_x-font_size/3, pos_y+font_size/3);

      pos_x += horizontal_spacing;
    }
  }
}

function updateTreeParents(){
  let done = false,
      stack = [];

  parents = [];
  parents[root] = -1;
  stack[0] = root;

  while(stack.length){
    current_node = stack.pop();

    for(let i = 0; i < node_number; i++){
      if(neighbor_matrix[current_node][i] && parents[i] == undefined){
        parents[i] = current_node;
        stack.push(i);
      }
    }
  }
}

function clearTreeChildren(){
  children = [];
  for(let i = 0; i < node_number; i++){
    children[i] = [];
  }
}

function updateTreeChildren(){
  updateTreeParents();

  clearTreeChildren();

  for(let i = 0; i < node_number; i++){
    if(parents[i] != -1 && children[parents[i]]){
      children[parents[i]].push(i);
    }
  }
}

function updateTreeRows(){
  updateTreeChildren();

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

function updateTreePosition(){
  updateTreeRows();

  tree_position = [];

  for(let i = 0; i < tree_rows.length; i++){
    for(let j = 0; j < tree_rows[i].length; j++){
      tree_position[tree_rows[i][j]] = {"x": j, "y": i};
    }
  }
}

function updateTreeInformation(){
  updateTreePosition();
}

function changeRoot(new_root){
  let current_node = parents[new_root],
      last_node = new_root;

  while(current_node != -1 && current_node != undefined){
    toggleMatrixPosition(current_node, last_node);
    toggleMatrixPosition(last_node, current_node);
    last_node = current_node;
    current_node = parents[last_node];
  }

  parents[root] = -1;
  root = new_root;
}

function countLeaves(){
  let number = 0;

  for(let i = 0; i < node_number; i++){
    if(parents[i] != undefined && parents[i] != -1 && children[i].length == 0){
      number++;
    }
  }

  return number;
}
