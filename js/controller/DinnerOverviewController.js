//ExampleViewController Object constructor
var DinnerOverviewController = function(view, model) {

  view.printRecipeButton.click(function(){

  });

  view.toggleButton.click(function(){
    $("#dinnerOverview").toggle();
    view.toggleButton.toggle();
  });

}
