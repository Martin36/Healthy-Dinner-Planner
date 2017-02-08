$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  model.addDishToMenu(2);
  model.addDishToMenu(1);
  model.getAllIngredients();
  model.getTotalMenuPrice();

  //And create the needed controllers and views
  if($("#exampleView").length)
    var exampleView = new ExampleView($("#exampleView"), model);

  //Send away with #selectDishView as root element
<<<<<<< HEAD
  var selectDishView = new SelectDishesView($("#selectDishesView"), model);
  var view2 = new View2_SelectedDishesView($("#sidebar"), model);
  var view4 = new View4_DishOverview($("#dishOverview"), model);
=======
  if($("#selectDishesView").length)
    var selectDishView = new SelectDishesView($("#selectDishesView"), model);

  if($("#sidebar").length)
    var view2 = new View2_SelectedDishesView($("#sidebar"), model);
>>>>>>> a041ed7cdbcdb9576bfab9a9b0187d4c2a358d04

  var dinnerOverview = new DinnerOverview(model);
});
