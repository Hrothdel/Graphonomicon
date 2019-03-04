function add_collapsible_listners(){
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

function toggle_directed(){
  directed = !directed;
  tree = 0;
}
