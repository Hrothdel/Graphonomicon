function initializeToSize(last_index, current_index){
  for(let i = last_index; i < current_index; i++){
    if(!neighbor_matrix[i]){
      neighbor_matrix[i] = [];

      for(let j = 0; j <= i; j++){
        neighbor_matrix[i][j] = 0;
        neighbor_matrix[j][i] = 0;
      }
    }
  }
}

function updateNeighborMatrix(last_number){
  initializeToSize(last_number, node_number);

  $("#matrix-container").remove();
  addMatrix();
}

function toggleMatrixPosition(x, y){
  if(neighbor_matrix[x][y]){
    neighbor_matrix[x][y] = 0;
  } else{
    neighbor_matrix[x][y] = 1;
  }
}

function updateButtonMatrixPosition(x, y){
  $(`#matrix-button-${x * node_number + y + 1}`).text(neighbor_matrix[x][y]);
}

function toggleConnection(x, y){
  toggleMatrixPosition(x, y);

  updateButtonMatrixPosition(x, y);

  if(!directed){
    toggleMatrixPosition(y, x);
    updateButtonMatrixPosition(y, x);
  }

  update();
}

function setConnection(x, y, state){
  neighbor_matrix[x][y] = state;
  updateButtonMatrixPosition(x, y);

  if(!directed){
    neighbor_matrix[y][x] = state;
    updateButtonMatrixPosition(y, x);
  }
}

function drawArrow(node_a, node_b,
                    arrow_size, arrow_angle,
                    arrow_distance, percentage){
  let start = angle_increment * node_a,
      end   = angle_increment * node_b,
      first_x, first_y,
      second_x, second_y;

  [first_x, first_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, start, distance),
  [second_x, second_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, end, distance);

  let line_angle = Math.atan2(second_y - first_y, second_x - first_x);

  if(percentage){
    let delta_x = second_x - first_x,
        delta_y = second_y - first_y,
        line_length = Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    arrow_distance = line_length * (arrow_distance / 100);
  }

  let point1_x, point1_y,
      point2_x, point2_y,
      point3_x, point3_y;

  [point1_x, point1_y] = moveAtAngle(first_x, first_y,
                        line_angle, arrow_distance);
  [point2_x, point2_y] = moveAtAngle(point1_x, point1_y,
                        line_angle + arrow_angle, arrow_size * (-1));
  [point3_x, point3_y] = moveAtAngle(point1_x, point1_y,
                        line_angle - arrow_angle, arrow_size * (-1));

  ctx.strokeStyle = arrow_color;
  ctx.beginPath();
  ctx.moveTo(point1_x, point1_y);
  ctx.lineTo(point2_x, point2_y);
  ctx.moveTo(point1_x, point1_y);
  ctx.lineTo(point3_x, point3_y);

  ctx.stroke();
}

function drawGraphArrows(){
  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      if(neighbor_matrix[i][j]){
        drawArrow(i, j, 20, Math.PI/6, 65, true);
      }
    }
  }
}

function drawGraphConnections(){
  let bezier_offset = 80;
  if(directed){
    bezier_offset = 0;
  }

  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      if(neighbor_matrix[i][j] == 1){
        connectNodes(i+1, j+1, bezier_offset);
      }
    }
  }
}

function drawGraphNodes(){
  let pos_x, pos_y, angle;

  ctx.font = font_size + "px Arial";

  angle = 0;

  for(let i = 0; i < node_number; i++){
    [pos_x, pos_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, angle, distance);

    ctx.beginPath();

    ctx.fillStyle = node_color;
    ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = node_number_color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(i+1, pos_x, pos_y);

    angle += angle_increment;
  }
}

function drawGraph(){
  angle_increment = Math.PI*2/node_number;
  drawGraphConnections();
  if(directed){
    drawGraphArrows();
  }
  drawGraphNodes();
}

function connectNodes(node_a, node_b, bezier_offset){
  node_a--;
  node_b--;
  let start = angle_increment * node_a,
      end = angle_increment * node_b,
      first_x, first_y,
      second_x, second_y,
      cp1_x, cp1_y, //control points
      cp2_x, cp2_y;

  [first_x, first_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, start, distance);
  [second_x, second_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, end, distance);
  [cp1_x, cp1_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, start,
                  distance - bezier_offset);
  [cp2_x, cp2_y] = moveAtAngle(MIDDLE_X, MIDDLE_Y, end,
                  distance - bezier_offset);

  ctx.strokeStyle = line_color;
  ctx.lineWidth = connection_width;
  ctx.beginPath();

  ctx.moveTo(first_x, first_y);
  ctx.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, second_x, second_y);

  ctx.stroke();
}

function convertDirectedConnections(){
  for(let i = 0; i < node_number; i++){
    for(let j = i; j < node_number; j++){
      if(neighbor_matrix[i][j] || neighbor_matrix[j][i]){
        neighbor_matrix[i][j] = 1;
        neighbor_matrix[j][i] = 1;

        updateButtonMatrixPosition(i, j);
        updateButtonMatrixPosition(j, i);
      }
    }
  }
}
