//ExampleView Object constructor
var DishOverviewView = function(container, model) {

  // Add the view to the controller
  model.addObserver(this);

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)

  var dishImage = container.find("img");
  var dishTitle = container.find("#dishTitle");
  var prepIns = container.find("#preparations p");
  var listTitle = container.find("#listTitle");
  var totalCost = container.find("#totalCost");

  this.confirmDishButton = container.find("#confirmDishButton");
  this.backButton = container.find("#backButton");

  var updateDishToShow = function() {

    var selectedDish = model.inspectedDish(); //This is the dish that has been clicked on
    selectedDish = (selectedDish == undefined) ? model.getDish(1) : selectedDish; //Check that dish is not undefined
    var nr = model.getNumberOfGuests();

    dishImage.attr("src", "../images/" + selectedDish.image);
    dishTitle.html(selectedDish.name);
    prepIns.html(selectedDish.description);
    listTitle.html("Ingredients for " + nr + " People");

    // Go through all the ingredients
    var totalPrice = 0;
    for (var i = 0; i < selectedDish.ingredients.length; i++) {
      var ingredient = selectedDish.ingredients[i];
      var piecePrice = parseFloat(ingredient.price) * nr;
      container.find("#ingredientList")
        .append($("<div>").addClass("col-md-3 space")
          .html((parseFloat(ingredient.quantity) * nr).toString() + " " + ingredient.unit))
        .append($("<div>").addClass("col-md-5 space").html(ingredient.name))
        .append($("<div>").addClass("col-md-4 space").append($("<p>").addClass("alignRight").html("SEK " + piecePrice)));
      totalPrice += piecePrice;
    }
    totalCost.html("SEK " + totalPrice.toString());
  }

  // Maybe only update ingredient amount and cost if only nr of guests are changed.
  this.update = function(obj) {
    updateDishToShow();
  }

  /// Add stuff down here for testing
  model.addDishToMenu(1);
}
