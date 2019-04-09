function moveAtAngle(pos_x, pos_y, angle, move_distance){
  return [pos_x + Math.cos(angle) * move_distance,
          pos_y + Math.sin(angle) * move_distance];
}

function createInitializedMatrix(rows, columns, initial_value){
  let matrix = [];

  for(let i = 0; i < rows; i++){
    matrix[i] = [];

    for(let j = 0; j < columns; j++){
      matrix[i][j] = initial_value;
    }
  }

  return matrix;
}
