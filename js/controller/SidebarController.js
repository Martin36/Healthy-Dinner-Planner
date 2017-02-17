var SidebarController = function(view, model){

  view.plusButton.click(function(){
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  });

  view.minusButton.click(function(){
    model.setNumberOfGuests(model.getNumberOfGuests() - 1);
  });

  view.deleteStarterButton.on("click", function(){
    view.starterContainer.toggle();
    var dishID = view.deleteStarterButton.attr("dishID");
    model.removeDishFromMenu(dishID);
  });
  view.deleteMainCourseButton.on("click", function(){
    view.mainCourseContainer.toggle();
    var dishID = view.deleteMainCourseButton.attr("dishID");
    model.removeDishFromMenu(dishID);
  });
  view.deleteDessertButton.on("click", function(){
    view.dessertContainer.toggle();
    var dishID = view.deleteDessertButton.attr("dishID");
    model.removeDishFromMenu(dishID);
  });

  view.confirmButton.click(function(){
    $("#selectDishes").toggle();
    $("#dinnerOverview").toggle();
  });

  }
