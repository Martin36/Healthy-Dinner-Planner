$(function() {
  //We instantiate our model
  var model = new DinnerModel();

  model.getAllIngredients();
  model.getTotalMenuPrice();

  //And create the needed controllers and views
  if ($("#exampleView").length){
    var exampleView = new ExampleView($("#exampleView"), model);
    var exampleViewController = new ExampleViewController(exampleView,model);
  }

  //Send away with #selectDishView as root element
  if ($("#selectDishesView").length)
    var selectableDishesView = new View3_SelectableDishes($("#selectDishesView"), model);

  if ($("#sidebar").length)
    var sidebar = new View2_Sidebar($("#sidebar"), model);

  if ($("#coursesRow").length){
    var dinnerOverview = new DinnerOverview(model);
    var dinnerOverviewController = new DinnerOverviewController(dinnerOverview, model);
  }

  if ($("#preparationContainer").length)
    var dinnerPreparation = new DinnerPreparation($("#preparationContainer"), model);

  if ($("#dishOverview").length)
    var view4 = new View4_DishOverview($("#dishOverview"), model);



});
