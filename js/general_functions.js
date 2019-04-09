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

function setDefaultValues(){
  $("#node-number-input").val(6);
  $("#tree-root-input").val(1);
  $("#tree-checkbox").prop("checked", tree);
  $("#directed-checkbox").prop("checked", directed);
  $("#graph-radius-input").val(200);
  $("#node-radius-input").val(40);
  $("#node-font-size-input").val(30);
  $("#node-color-input").val("#33eeee");
  $("#line-color-input").val("#000000");
  $("#node-number-color-input").val("#ffffff");
  $("#arrow-color-input").val("#ff7777");
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

  draw();
}

function toggleTree(){
  if(!tree && !directed){
    toggleDirected();
    updateCheckboxState("#directed-checkbox", directed);
  }
  tree = !tree;

  draw();
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

  draw();
}

function clearGraph(){
  for(let i = 0; i < node_number; i++){
    for(let j = 0; j < node_number; j++){
      neighbor_matrix[i][j] = 0;

      updateButtonMatrixPosition(i, j);
    }
  }

  draw();
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

function updateNodeNumber(){
  let last_number = node_number;

  node_number = Number($("#node-number-input").val());

  updateNeighborMatrix(last_number);
  draw();
}

function updateTreeRoot(){
  let input = Number($("#tree-root-input").val());

  if(input > node_number){
    input = node_number;
    $("#tree-root-input").val(input);
  }

  changeRoot(input - 1);

  draw();
}

function updateGraphRadius(){
  let input = Number($("#graph-radius-input").val());

  distance = input;

  draw();
}

function updateNodeRadius(){
  let input = Number($("#node-radius-input").val());

  radius = input;

  draw();
}

function updateNodeFontSize(){
  let input = Number($("#node-font-size-input").val());

  font_size = input;

  draw();
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

  draw();
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
