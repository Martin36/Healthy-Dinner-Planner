$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  model.getAllIngredients();
  model.getTotalMenuPrice();

  //And create the needed controllers and views
  if ($("#exampleView").length)
    var exampleView = new ExampleView($("#exampleView"), model);

  //Send away with #selectDishView as root element
  if ($("#selectDishesView").length){
    var selectDishesView = new SelectDishesView($("#selectDishesView"), model);
    var selectDishesController = new SelectDishesController(selectDishesView, model);
  }

  if ($("#sidebar").length){
    var sidebarView = new SidebarView($("#sidebar"), model);
    var sidebarController = new SidebarController(sidebarView, model);
  }

  if ($("#coursesRow").length)
    var dinnerOverview = new DinnerOverview(model);

  if ($("#preparationContainer").length)
    var dinnerPreparation = new DinnerPreparation($("#preparationContainer"), model);

  if ($("#dishOverview").length)
    var view4 = new DishOverviewView($("#dishOverview"), model);

});
