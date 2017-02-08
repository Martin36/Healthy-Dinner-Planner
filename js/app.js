$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  model.addDishToMenu(2);
  model.addDishToMenu(1);
  model.getAllIngredients();
  model.getTotalMenuPrice();

  //And create the needed controllers and views
  var exampleView = new ExampleView($("#exampleView"), model);

  //Send away with #selectDishView as root element
  var selectDishView = new SelectDishesView($("#selectDishesView"), model);
  var view2 = new View2_SelectedDishesView($("#sidebar"), model);
  var view4 = new View4_DishOverview($("#dishOverview"), model);

  var dinnerOverview = new DinnerOverview(model);
});