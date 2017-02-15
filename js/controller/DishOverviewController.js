var DishOverviewController = function(view, model){

  view.confirmDishButton.on("click", function(event){
    console.log("Button clicked! Adding id " + view.getDishID());
    model.addDishToMenu(view.getDishID());

  });

}
