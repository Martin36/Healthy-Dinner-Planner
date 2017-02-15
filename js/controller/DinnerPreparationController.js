//ExampleViewController Object constructor
var DinnerPreparationController = function(view, model) {

  view.backButton.click(function(){
    $("#dinnerPreparation").toggle();
    $("#dinnerOverview").toggle();
  });

}
