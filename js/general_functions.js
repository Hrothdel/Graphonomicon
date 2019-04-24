function addCollapsibleListeners(){
  let elements = $(".collapsible");

  for(let i = 0; i < elements.length; i++){
    let sibling = elements[i].nextElementSibling;

    $(elements[i]).click(function(){
      $(sibling).toggleClass("collapsed");
      $(this).toggleClass("active");
    });

    if($(elements[i]).hasClass("active") == false){
      $(sibling).addClass("collapsed");
    }
  }
}

function addListeners(){
  addCollapsibleListeners();

  $(window).click(function(event) {
    if(event.target.id === "options-modal"){
      hideOptionsScreen();
    }
  });
}

function updateInputFields(){
  $("#node-number-input").val(node_number);
  $("#tree-root-input").val(root + 1);
  $("#tree-checkbox").prop("checked", tree);
  $("#directed-checkbox").prop("checked", directed);
  $("#graph-radius-input").val(distance);
  $("#node-radius-input").val(radius);
  $("#node-font-size-input").val(font_size);
  $("#node-color-input").val(node_color);
  $("#line-color-input").val(line_color);
  $("#node-number-color-input").val(node_number_color);
  $("#arrow-color-input").val(arrow_color);
}

function updateCheckboxState(id, value){
  $(id).prop("checked", value);
}

function toggleDirected(){
  if(directed){
    if(tree){
      toggleTree();
      updateCheckboxState("#tree-checkbox", tree);
    }

    directed = 0;
    convertDirectedConnections();
  } else{
    directed = 1;
  }

  update();
}

function toggleTree(){
  if(!tree && !directed){
    toggleDirected();
    updateCheckboxState("#directed-checkbox", directed);
  }
  tree = !tree;

  update();
}

function fillGraph(){
  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      if(i != j){
        neighbor_matrix[i][j] = 1;

        updateButtonMatrixPosition(i, j);
      }
    }
  }

  update();
}

function clearGraph(){
  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      neighbor_matrix[i][j] = 0;

      updateButtonMatrixPosition(i, j);
    }
  }

  update();
}

function draw(){
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  if(tree){
    updateTreeInformation();
    drawTree();
  } else {
    drawGraph();
  }

  updateAllInformation();
}

function update(){
  updateStateHash();
  draw();
}

function updateStateHash(){
  let code = generateStateCode();

  location.hash = code;
}

function setMatrix(code){
  initializeToSize(node_number);

  for(let i = code.length - 1; i >= 0; i--){
    let index = code.length - 1 - i;
    let row = Math.floor(index / node_number),
        column = index % node_number;
    neighbor_matrix[row][column] = parseInt(code[i], 2);
  }
}

function evaluateStateCode(){
  let code_array = location.hash.substr(1).split("_");

  node_number = parseInt(code_array[0], 36);
  directed = parseInt(code_array[1], 2);
  tree = parseInt(code_array[2], 2);
  root = parseInt(code_array[3], 36);

  setMatrix(parseInt(code_array[4], 36).toString(2))
}

function evaluateConnections(){
  let input = $("#connections-textarea").val(),
      x, y, trash;

  while(input.length){
    [x, trash] = getFirstNumber(input);
    input = input.substr(x.length + trash.length);

    [y, trash] = getFirstNumber(input);
    input = input.substr(y.length + trash.length);

    x = parseInt(x) - 1;
    y = parseInt(y) - 1;

    if(!isNaN(x) && !isNaN(y)){
      setConnection(x, y, 1);
    }
  }

  update();
}

function updateNodeNumber(){
  let last_number = node_number;

  node_number = Number($("#node-number-input").val());

  updateNeighborMatrix(last_number);
  update();
}

function updateTreeRoot(){
  let input = Number($("#tree-root-input").val());

  if(input > node_number){
    input = node_number;
    $("#tree-root-input").val(input);
  }

  changeRoot(input - 1);

  update();
}

function updateGraphRadius(){
  let input = Number($("#graph-radius-input").val());

  distance = input;

  update();
}

function updateNodeRadius(){
  let input = Number($("#node-radius-input").val());

  radius = input;

  update();
}

function updateNodeFontSize(){
  let input = Number($("#node-font-size-input").val());

  font_size = input;

  update();
}

function updateColors(){
  let input = $("#node-color-input").val();

  node_color = input;

  input = $("#line-color-input").val();
  line_color = input;

  input = $("#node-number-color-input").val();
  node_number_color = input;

  input = $("#arrow-color-input").val();
  arrow_color = input;

  update();
}

function countConnections(){
  let connection_count = 0;

  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      if(neighbor_matrix[i][j]){
        connection_count++;
      }
    }
  }

  if(!directed){
    connection_count /= 2;
  }

  return connection_count;
}

function updateInformationDisplay(name, value){
  $("#"+name).text(value);
}

function updateAllInformation(){
  let value;

  value = countConnections();
  updateInformationDisplay("connection-count", value);

  value = countLeaves();
  updateInformationDisplay("leaf-count", value);

  if(tree){
    $("#tree-information").css("display", "block");
  } else {
    $("#tree-information").css("display", "none");
  }
}

function showOptionsScreen(){
  $("#options-modal").removeClass("transparent");
}

function hideOptionsScreen(){
  $("#options-modal").addClass("transparent");
}
