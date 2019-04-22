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

function generateMatrixCode(){
  let binary_code = "";

  for(let i = node_number - 1; i >= 0; i--){
    for(let j = node_number - 1; j >= 0; j--){
      binary_code += neighbor_matrix[i][j];
    }
  }

  return parseInt(binary_code, 2).toString(36);
}

function generateStateCode(){
  let code = node_number.toString(36) +
            "_" + directed % 2 +
            "_" + tree % 2 +
            "_" + root.toString(36) +
            "_" + generateMatrixCode();

  return code;
}
