var SelectDishesController = function(view, model) {

  view.searchDishButton.click(function(event){
    filterDish();
  });

  // If you press enter in the text field
  view.searchDishInput.on("keypress", function(e){
    if(e.keyCode == 13){
      filterDish();
    }
  });

  // Filter with dropdown menu
  view.filterStarter.on("click", function(event){
    view.selectedDropdown.html("Starter");
    view.courseFilter = "starter"
    view.showDishesWithFilter();
    updateButtons();
  });
  view.filterMain.on("click", function(event){
    view.selectedDropdown.html("Main");
    view.courseFilter = "main dish";
    view.showDishesWithFilter();
    updateButtons();
  });
  view.filterDesert.on("click", function(event){
    view.selectedDropdown.html("Dessert");
    view.courseFilter = "dessert";
    view.showDishesWithFilter();
    updateButtons();
  });

  var updateButtons = function(){
    for(let button in view.dishButtons){
      view.dishButtons[button].on("click", function(event){
        model.inspectedDish(view.dishButtons[button].attr("id"));
        $("#selectDishesView").toggle();
        $("#dishOverview").toggle();
      });
    };
  };

  model.getAllDishes(undefined, undefined, updateButtons, this);


  var filterDish = function(){
    view.showDishesWithFilter(view.searchDishInput.val());
  };
}
