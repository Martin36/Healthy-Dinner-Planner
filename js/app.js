$(function() {
  //We instantiate our model
  var model = new DinnerModel();
 // model.getAllDishes();
  //And create the needed controllers and views
  if ($("#exampleView").length){
    var exampleView = new ExampleView($("#exampleView"), model);
    var exampleViewController = new ExampleViewController(exampleView,model);
  }

  if($("#startView").length){
    var startView = new StartView($("#startView"), model);
    var startViewController = new StartViewController(startView, model);
  }

  //Send away with #selectDishView as root element
  if ($("#selectDishesView").length){
    var selectDishesView = new SelectDishesView($("#selectDishesView"), model);
    var selectDishesController = new SelectDishesController(selectDishesView, model);
  }

  if ($("#sidebar").length){
    var sidebar = new SidebarView($("#sidebar"), model);
    var sidebarController = new SidebarController(sidebar, model);
  }

  if ($("#dinnerOverview").length){
    var dinnerOverview = new DinnerOverview($("#dinnerOverview"), model);
    var dinnerOverviewController = new DinnerOverviewController(dinnerOverview, model);
  }

  if ($("#dinnerPreparation").length){
    var dinnerPreparation = new DinnerPreparation($("#dinnerPreparation"), model);
    var dinnerPreparationController = new DinnerPreparationController(dinnerPreparation, model);
  }

  if ($("#dishOverview").length){
    var dishOverview = new DishOverviewView($("#dishOverview"), model);
    var dishOverviewController = new DishOverviewController(dishOverview, model);
  }
  model.setNumberOfGuests(0);
});
