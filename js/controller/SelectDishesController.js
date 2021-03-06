var SelectDishesController = function(view, model) {

  model.addObserver(this);

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
    view.updateFilter();
    view.searchDishInput.val("");
    //updateButtons();
  });
  view.filterMain.on("click", function(event){
    view.selectedDropdown.html("Main");
    view.courseFilter = "main dish";
    view.updateFilter();
    view.searchDishInput.val("");
    //updateButtons();
  });
  view.filterDesert.on("click", function(event){
    view.selectedDropdown.html("Dessert");
    view.courseFilter = "dessert";
    view.updateFilter();
    view.searchDishInput.val("");
    //updateButtons();
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

  this.update = function(obj){
    if(obj == "buttons loaded"){
      updateButtons();
    }
  }

  var filterDish = function(){
    view.updateFilter(view.searchDishInput.val());
  };
}
