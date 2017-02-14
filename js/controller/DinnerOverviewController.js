//ExampleViewController Object constructor
var DinnerOverviewController = function(view, model) {

  view.printRecipeButton.click(function(){
    console.log("Printa repcept!!");
  })

  console.log(view.printRecipeButton.length);
/*
 view.plusButton.click(function(){
 model.setNumberOfGuests(model.getNumberOfGuests() + 1);
 });

 view.minusButton.click(function(){
 model.setNumberOfGuests(model.getNumberOfGuests() - 1);
 });
 */
}
