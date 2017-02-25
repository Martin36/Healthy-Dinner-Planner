var SidebarController = function(view, model){

  view.plusButton.click(function(){
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  });

  view.minusButton.click(function(){
    model.setNumberOfGuests(model.getNumberOfGuests() - 1);
  });

  view.deleteStarterButton.on("click", function(){
    //view.starterContainer.toggle();
    view.starterContainer.slideUp(500);
    var dishID = view.deleteStarterButton.attr("dishID");
    model.removeDishFromMenu(+dishID); // Convert to int
  });
  view.deleteMainCourseButton.on("click", function(){
    //view.mainCourseContainer.toggle();
    view.mainCourseContainer.slideUp(500);
    var dishID = view.deleteMainCourseButton.attr("dishID");
    model.removeDishFromMenu(+dishID);
  });
  view.deleteDessertButton.on("click", function(){
    //view.dessertContainer.toggle();
    view.dessertContainer.slideUp(500);
    var dishID = view.deleteDessertButton.attr("dishID");
    model.removeDishFromMenu(+dishID);
  });

  view.confirmButton.click(function(){
    $("#selectDishes").toggle();
    $("#dinnerOverview").toggle();
  });

  }
