function initialize_matrix(){
  for(let i = 0; i < node_nr; i++){
    neighbour_matrix[i] = [];
    for(let j = 0; j < node_nr; j++){
      neighbour_matrix[i][j] = 0;
    }
  }
}

function initialize_to_size(last_index, current_index){
  for(let i = last_index; i < current_index; i++){
    if(!neighbour_matrix[i]){
      neighbour_matrix[i] = [];

      for(let j = 0; j <= i; j++){
        neighbour_matrix[i][j] = 0;
        neighbour_matrix[j][i] = 0;
      }
    }
  }
}

function update_neighbour_matrix(last_number){
  initialize_to_size(last_number, node_nr);

  $("#matrix_container").remove();
  add_matrix();
}

function toggle_matrix_position(x, y){
  if(neighbour_matrix[x][y]){
    neighbour_matrix[x][y] = 0;
  } else{
    neighbour_matrix[x][y] = 1;
  }
}

function update_button_matrix_position(x, y){
  $(`#matrix_button-${x*node_nr+y+1}`).text(neighbour_matrix[x][y]);
}

function toggle_connection(x, y){
  toggle_matrix_position(x, y);

  update_button_matrix_position(x, y);

  if(!directed){
    toggle_matrix_position(y, x);
    update_button_matrix_position(y, x);
  }

  draw();
}

function draw_arrow(node_a, node_b,
                    arrow_size, arrow_angle,
                    arrow_distance, percentage){
  let start   = angle_increment * node_a,
      end     = angle_increment * node_b,
      firstX, firstY,
      secondX, secondY;

  [firstX, firstY] = move_at_angle(middleX, middleY, start, distance),
  [secondX, secondY] = move_at_angle(middleX, middleY, end, distance);

  let line_angle = Math.atan2(secondY-firstY, secondX-firstX);

  if(percentage){
    let deltaX = secondX - firstX,
        deltaY = secondY - firstY,
        line_length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    arrow_distance = line_length * (arrow_distance / 100);
  }

  let point1X, point1Y,
      point2X, point2Y,
      point3X, point3Y;

  [point1X, point1Y] = move_at_angle(firstX, firstY,
                        line_angle, arrow_distance);
  [point2X, point2Y] = move_at_angle(point1X, point1Y,
                        line_angle + arrow_angle, arrow_size * (-1));
  [point3X, point3Y] = move_at_angle(point1X, point1Y,
                        line_angle - arrow_angle, arrow_size * (-1));

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
    [posX, posY] = move_at_angle(middleX, middleY, angle, distance);

    ctx.beginPath();

    ctx.fillStyle = node_color;
    ctx.arc(posX, posY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = node_number_color;
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
  let start = angle_increment * node_a,
      end = angle_increment * node_b,
      firstX, firstY,
      secondX, secondY,
      cp1X, cp1Y, //control points
      cp2X, cp2Y;

  [firstX, firstY] = move_at_angle(middleX, middleY, start, distance);
  [secondX, secondY] = move_at_angle(middleX, middleY, end, distance);
  [cp1X, cp1Y] = move_at_angle(middleX, middleY, start,
                  distance - bezierOffset);
  [cp2X, cp2Y] = move_at_angle(middleX, middleY, end,
                  distance - bezierOffset);

  ctx.strokeStyle = line_color;
  ctx.beginPath();

  ctx.moveTo(firstX, firstY);
  ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, secondX, secondY);

  ctx.stroke();
}

function convert_directed_connections(){
  for(let i = 0; i < node_nr; i++){
    for(let j = i; j < node_nr; j++){
      if(neighbour_matrix[i][j] || neighbour_matrix[j][i]){
        neighbour_matrix[i][j] = 1;
        neighbour_matrix[j][i] = 1;

        update_button_matrix_position(i, j);
        update_button_matrix_position(j, i);
      }
    }
  }
}
