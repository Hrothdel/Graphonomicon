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

      ctx.fillStyle = "#3ee";
      ctx.arc(posX, posY, radius, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = "#fff";
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

    for(let i = 0; i < node_nr; i++){
      if(neighbour_matrix[current_node][i] && parents[i] == undefined){
        parents[i] = current_node;
        stack.push(i);
      }
    }
  }
}

function clear_tree_children(){
  for(let i = 0; i < node_nr; i++){
    children[i] = [];
  }
}

function update_tree_children(){
  clear_tree_children();

  for(let i = 0; i < node_nr; i++){
    if(parents[i] != -1){
      children[parents[i]].push(i);
    }
  }
}

function update_tree_rows() {
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
  tree_position = [];

  for(let i = 0; i < tree_rows.length; i++){
    for(let j = 0; j < tree_rows[i].length; j++){
      tree_position[tree_rows[i][j]] = {"x": j, "y": i};
    }
  }
}

function update_tree_information(){
  update_tree_parents();
  update_tree_children();
  update_tree_rows();
  update_tree_position();
}
