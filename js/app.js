$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  model.addDishToMenu(2);
  model.addDishToMenu(1);
  model.addDishToMenu(100);
  model.getAllIngredients();
  model.getTotalMenuPrice();

  //And create the needed controllers and views
  if ($("#exampleView").length)
    var exampleView = new ExampleView($("#exampleView"), model);

  //Send away with #selectDishView as root element
  if ($("#selectDishesView").length)
    var selectDishView = new SelectDishesView($("#selectDishesView"), model);

  if ($("#sidebar").length)
    var view2 = new View2_SelectedDishesView($("#sidebar"), model);

  if ($("#coursesRow").length)
    var dinnerOverview = new DinnerOverview(model);

  if ($("#preparationContainer").length)
    var dinnerPreparation = new DinnerPreparation($("#preparationContainer"), model);

  if ($("#dishOverview").length)
    var view4 = new View4_DishOverview($("#dishOverview"), model);

});
