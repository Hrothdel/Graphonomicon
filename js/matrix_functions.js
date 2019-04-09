function addMatrix(){
  let matrix_container, row;

  $('#matrix-section').append('<table id="matrix-container"></table>');
  matrix_container = $('#matrix-container');

  matrix_container.append('<tr id="matrix-number-row"></tr>')
  row = $("#matrix-number-row");

  row.append('<td id="matrix-row-blank"></td>');
  for(let i = 0; i < node_number; i++){
    row.append(`<td id="matrix-row-number-${i + 1}" class="matrix-element">${i+1}</td>`);
  }

  for(let i = 0; i < node_number; i++){
    matrix_container.append(`<tr id="matrix-row-${i + 1}"></tr>`)
    row = $(`#matrix-row-${i + 1}`);

    row.append(`<td id="matrix-column-number-${i + 1}" class="matrix-element">${i + 1}</td>`);

    for(let j = 0; j < node_number; j++){
      let index = i * node_number + j + 1, button_properties = "";

      if(i == j){
        button_properties += 'disabled = "disabled"';
      }

      row.append(`<td id="matrix-button-container-${index}" class="matrix-element">
        <button id="matrix-button-${index}" class="matrix-button" onclick="toggleConnection(${i}, ${j})" ${button_properties}>${neighbor_matrix[i][j]}</button></td>`);
    }
  }
}
