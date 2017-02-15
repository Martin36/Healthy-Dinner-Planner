var SidebarController = function(view, model){

  view.plusButton.click(function(){
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  });

  view.minusButton.click(function(){
    model.setNumberOfGuests(model.getNumberOfGuests() - 1);
  });

  view.deleteStarterButton.on("click", function(){
    console.log("DELETE STARTER!");
    view.starterContainer.toggle();

  });
  view.deleteMainCourseButton.on("click", function(){
    console.log("DELETE MAIN COURSE!");
    view.mainCourseContainer.toggle();
  });
  view.deleteDessertButton.on("click", function(){
    console.log("DELETE DESSERT!");
    view.dessertContainer.toggle();
  });

  view.confirmButton.click(function(){
    $("#selectDishes").toggle();
    $("#dinnerOverview").toggle();
  });

  }
