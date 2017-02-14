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
  if ($("#selectDishesView").length){
    var selectDishesView = new SelectDishesView($("#selectDishesView"), model);
    var selectDishesController = new SelectDishesController(selectDishesView, model);
  }

  if ($("#sidebar").length){
    var sidebarView = new SidebarView($("#sidebar"), model);
    var sidebarController = new SidebarController(sidebarView, model);
  }

  if ($("#dinnerOverview").length){
    var dinnerOverview = new DinnerOverview($("#dinnerOverview"), model);
    var dinnerOverviewController = new DinnerOverviewController(dinnerOverview, model);
  }

  if ($("#dinnerPreparation").length){
    var dinnerPreparation = new DinnerPreparation($("#dinnerPreparation"), model);
    var dinnerPreparationController = new DinnerPreparationController(dinnerPreparation, model);
  }

  if ($("#dishOverview").length)
    var view4 = new DishOverviewView($("#dishOverview"), model);



});
