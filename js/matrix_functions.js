function add_matrix(){
  let matrix_container, row;

  $('#control').append('<table id="matrix_container"></table>');
  matrix_container = $('#matrix_container');

  matrix_container.append('<tr id="matrix_number_row"></tr>')
  row = $("#matrix_number_row");

  row.append('<td id="matrix_row_blank"></td>');
  for(let i = 0; i < node_nr; i++){
    row.append(`<td id="matrix_row_number-${i+1}" class="matrix_element">${i+1}</td>`);
  }

  for(let i = 0; i < node_nr; i++){
    matrix_container.append(`<tr id="matrix_row-${i+1}"></tr>`)
    row = $(`#matrix_row-${i+1}`);

    row.append(`<td id="matrix_column_number-${i+1}" class="matrix_element">${i+1}</td>`);

    for(let j = 0; j < node_nr; j++){
      let index = i*node_nr + j+1;
      row.append(`<td id="matrix_button_container-${index}" class="matrix_element"><button id="matrix_button-${index}" class="matrix_button">0</button></td>`);
    }
  }
}
