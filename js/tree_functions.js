function draw_tree(){
  let verticalPadding, horizontalPadding
      verticalSpacing = 130,
      horizontalSpacing = 120;

  verticalPadding = (height - radius * 2 * tree_rows.length - verticalSpacing * (tree_rows.length - 1)) / 2;

  ctx.font = fontSize + "px Arial";

  for(let i = 0; i < tree_rows.length; i++){
    horizontalPadding = (width - 2 * radius - horizontalSpacing * (tree_rows[i].length - 1)) / 2;

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
