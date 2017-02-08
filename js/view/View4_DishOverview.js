//ExampleView Object constructor
var View4_DishOverview = function(container, model) {

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var dishImage = container.find("img");
  var dishTitle = container.find("#dishTitle");
  var prepIns = container.find("#preparations p");
  var listTitle = container.find("#listTitle");
  var ingredients = container.find("#ingredientList");
  var totalCost = container.find("#totalCost");

  var selectedDish = model.getDish(1);
  var nr = model.getNumberOfGuests();

  dishImage.attr("src", "images/" + selectedDish.image);
  dishTitle.html(selectedDish.name);
  prepIns.html(selectedDish.description);
  listTitle.html("Ingredients for " + nr + " People");

  var totalPrice = 0;
  for (var i = 0; i < selectedDish.ingredients.length; i++) {
    var ingredient = selectedDish.ingredients[i];
    var amount = $("<div>").addClass("col-md-3 space");
    amount.html((parseFloat(ingredient.quantity) * nr).toString() + " " + ingredient.unit);
    var name = $("<div>").addClass("col-md-5 space").html(ingredient.name);
    var priceTemp = parseFloat(ingredient.price) * nr;
    var price = $("<div>").addClass("col-md-4 space");
    var priceText = $("<p>").addClass("alignRight").html("SEK " + priceTemp)

    ingredients.append(amount);
    ingredients.append(name);
    ingredients.append(price);
    price.append(priceText);
    totalPrice += priceTemp;
  }

  totalCost.html("SEK " + totalPrice.toString());
}