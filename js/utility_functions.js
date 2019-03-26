function move_at_angle(posX, posY, angle, move_distance){
  return [posX + Math.cos(angle) * move_distance,
          posY + Math.sin(angle) * move_distance];
}

function create_initialized_matrix(rows, columns, initial_value){
  let matrix = [];

  for(let i = 0; i < rows; i++){
    matrix[i] = [];

    for(let j = 0; j < columns; j++){
      matrix[i][j] = initial_value;
    }
  }

  return matrix;
}
