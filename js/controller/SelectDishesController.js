var SelectDishesController = function(view, model) {

  view.searchDishButton.click(function(event){
    filterDish();
  });

  view.searchDishInput.on("keypress", function(e){
    if(e.keyCode == 13){
      filterDish();
    }
  });


  var filterDish = function(){
    view.clearAllDishes();
    view.showDishesWithFilter(view.searchDishInput.val());
  }
}
