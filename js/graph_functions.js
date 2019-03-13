function initialize_matrix(){
  for(let i = 0; i < node_nr; i++){
    neighbour_matrix[i] = [];
    for(let j = 0; j < node_nr; j++){
      neighbour_matrix[i][j] = 0;
    }
  }
}

function initialize_to_size(index){
  if(!neighbour_matrix[index-1]){
    neighbour_matrix[index-1] = [];

    for(let i = 0; i < index; i ++){
      neighbour_matrix[index-1][i] = 0;
      neighbour_matrix[i][index-1] = 0;
    }
  }
}

function toggle_position(x, y){
  if(neighbour_matrix[x][y]){
    neighbour_matrix[x][y] = 0;
  } else {
    neighbour_matrix[x][y] = 1;
  }
}

function update_button_matrix_position(x, y){
  $(`#matrix_button-${x*node_nr+y+1}`).text(neighbour_matrix[x][y]);
}

function toggle_connection(x, y){
  toggle_position(x, y);

  update_button_matrix_position(x, y);

  if(!directed){
    toggle_position(y, x);
    update_button_matrix_position(y, x);
  }

  draw();
}

function draw_arrow(node_a, node_b,
                    arrow_size, arrow_angle,
                    arrow_distance, percentage){
  let start   = angle_increment * node_a,
      end     = angle_increment * node_b,
      firstX  = middleX + Math.cos(start) * distance,
      firstY  = middleY + Math.sin(start) * distance
      secondX = middleX + Math.cos(end) * distance,
      secondY = middleY + Math.sin(end) * distance;

  let line_angle = Math.atan2(secondY-firstY, secondX-firstX);

  if(percentage){
    let deltaX = secondX - firstX,
        deltaY = secondY - firstY,
        line_length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    arrow_distance = line_length * (arrow_distance / 100);
  }

  let point1X = firstX + Math.cos(line_angle) * arrow_distance,
      point1Y = firstY + Math.sin(line_angle) * arrow_distance,
      point2X = point1X - Math.cos(line_angle + arrow_angle) * arrow_size,
      point2Y = point1Y - Math.sin(line_angle + arrow_angle) * arrow_size,
      point3X = point1X - Math.cos(line_angle - arrow_angle) * arrow_size,
      point3Y = point1Y - Math.sin(line_angle - arrow_angle) * arrow_size;

  ctx.strokeStyle = arrow_color;
  ctx.beginPath();
  ctx.moveTo(point1X, point1Y);
  ctx.lineTo(point2X, point2Y);
  ctx.moveTo(point1X, point1Y);
  ctx.lineTo(point3X, point3Y);

  ctx.stroke();
}

function draw_graph_arrows(){
  for(let i = 0; i < node_nr; i++){
    for(let j = 0; j < node_nr; j++){
      if(neighbour_matrix[i][j]){
        draw_arrow(i, j, 20, Math.PI/6, 65, true);
      }
    }
  }
}

function draw_graph_connections(){
  let bezierOffset = 80;
  if(directed){
    bezierOffset = 0;
  }

  for(let i = 0; i < node_nr; i++){
    for(let j = 0; j < node_nr; j++){
      if(neighbour_matrix[i][j] == 1){
        connect_nodes(i+1, j+1, bezierOffset);
      }
    }
  }
}

function draw_graph_nodes(){
  let posX, posY, angle;

  ctx.lineWidth = 5;
  ctx.font = fontSize + "px Arial";

  angle = 0;

  for(let i = 0; i < node_nr; i++){
    posX = middleX + Math.cos(angle)*distance;
    posY = middleY + Math.sin(angle)*distance;

    ctx.beginPath();

    ctx.fillStyle = "#3ee";
    ctx.arc(posX, posY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillText(i+1, posX-fontSize/3, posY+fontSize/3);

    angle += angle_increment;
  }
}

function draw_graph(){
  angle_increment = Math.PI*2/node_nr;
  draw_graph_connections();
  if(directed){
    draw_graph_arrows();
  }
  draw_graph_nodes();
}

function connect_nodes(node_a, node_b, bezierOffset){
  node_a--;
  node_b--;
  let start   = angle_increment * node_a,
      end     = angle_increment * node_b,
      firstX  = middleX + Math.cos(start)*distance,
      firstY  = middleY + Math.sin(start)*distance,
      secondX = middleX + Math.cos(end)*distance,
      secondY = middleY + Math.sin(end)*distance,
      cpx1    = middleX + Math.cos(start)*(distance - bezierOffset), // control points
      cpy1    = middleY + Math.sin(start)*(distance - bezierOffset),
      cpx2    = middleX + Math.cos(end)*(distance - bezierOffset),
      cpy2    = middleY + Math.sin(end)*(distance - bezierOffset);

  ctx.strokeStyle = "#000";
  ctx.beginPath();

  ctx.moveTo(firstX, firstY);
  ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, secondX, secondY);

  ctx.stroke();
}
