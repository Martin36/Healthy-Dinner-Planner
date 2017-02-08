//ExampleView Object constructor
var View2_SelectedDishesView = function(container, model) {

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var selectedDishes = model.getFullMenu();
  var totalPrice = container.find("#totalPrice");

  //console.log(this.dishContainer);

  totalPrice.html("SEK " + model.getTotalMenuPrice().toString());

  for (var i = 0; i < selectedDishes.length; i++) {
    var dish = selectedDishes[i];
    var selDish = $("<div>").addClass("row");
    var col = $("<div>").addClass("col-md-12");
    var well = $("<div>").addClass("well margin");
    var title = $("<p>").addClass("alignLeft").html(dish.name);
    var price = $("<p>").addClass("alignRight").html(model.getDishPrice(dish.id));
    var button = $("<button>").addClass("btn btn-danger circle");
    var cross = $("<span>").addClass("glyphicon glyphicon-remove");

    selDish.append(col);
    col.append(well);
    well.append(title);
    well.append(price);
    well.append(button);
    button.append(cross);
    dishContainer.append(selDish);
  }
}