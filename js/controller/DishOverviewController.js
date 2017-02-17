var DishOverviewController = function(view, model){

  view.confirmDishButton.click(function(){
    console.log(model.inspectedDish().id);
    model.addDishToMenu(model.inspectedDish().id);
    $("#dishOverview").toggle();
    $("#selectDishesView").toggle();
  });

  view.backButton.click(function() {
    $("#dishOverview").toggle();
    $("#selectDishesView").toggle();
  })

}
