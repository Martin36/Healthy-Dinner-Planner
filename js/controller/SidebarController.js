var SidebarController = function(view, model){

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
