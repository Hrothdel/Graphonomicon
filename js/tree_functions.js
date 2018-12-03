function draw_tree_connection(parent, child,
                              verticalPadding, parentHorizontalPadding,
                              verticalSpacing, horizontalSpacing){
  let childHorizontalPadding = (width - 2 * radius -
                horizontalSpacing * (tree_rows[tree_position[child].y].length - 1)) / 2,
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

  verticalPadding = (height - radius * 2 * tree_rows.length - verticalSpacing * (tree_rows.length - 1)) / 2;

  ctx.font = fontSize + "px Arial";

  for(let i = 0; i < tree_rows.length; i++){
    horizontalPadding = (width - 2 * radius - horizontalSpacing * (tree_rows[i].length - 1)) / 2;

    draw_row_connections(i, verticalPadding, horizontalPadding, verticalSpacing, horizontalSpacing);

    posX = horizontalPadding + radius;
    posY = verticalPadding + radius + (i * radius * 2)  + (i * verticalSpacing);

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
