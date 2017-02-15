var SidebarController = function(view, model){

  // When a selected dish is deleted from the sidebar
  view.deleteButton.click(function(eventObject){
    console.log(eventObject);
    model.removeDishFromMenu(view.deleteButton.attr("dishid"));
  });

  view.confirmButton.click(function(){
    $("#selectDishes").toggle();
    $("#dinnerOverview").toggle();
  })
  }
