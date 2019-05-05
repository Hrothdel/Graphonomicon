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

function convert2to32(code){
  let chunk, index, result = "";
  index = Math.max(0, code.length - 5);
  while(index >= 0){
    chunk = code.substr(index, 5);
    index -= 5;

    while(chunk.length < 5){
      chunk = "0" + chunk;
    }

    result = parseInt(chunk, 2).toString(32) + result;
  }

  return result;
}

function convert32to2(code){
  let result = "", chunk;

  for(let i = 0; i < code.length; i++){
    chunk = parseInt(code[i], 32).toString(2);
    while(chunk.length < 5){
      chunk = "0" + chunk;
    }
    result += chunk;
  }

  return result;
}

function generateMatrixCode(){
  let binary_code = "";

  for(let i = node_number - 1; i >= 0; i--){
    for(let j = node_number - 1; j >= 0; j--){
      binary_code += neighbor_matrix[i][j];
    }
  }

  return convert2to32(binary_code);
}

function generateStateCode(){
  let code = node_number.toString(36) +
            "_" + directed % 2 +
            "_" + tree % 2 +
            "_" + root.toString(36) +
            "_" + generateMatrixCode();

  return code;
}

function getFirstNumber(input){
  let output = "", trash = "", index = 0;

  while(index < input.length &&
        isNaN(parseInt(input[index], 10))){
    trash += input[index];

    index++;
  }

  while(index < input.length &&
        !isNaN(parseInt(input[index], 10))){
    output += input[index];

    index ++;
  }

  return [output, trash];
}
