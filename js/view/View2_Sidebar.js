//ExampleView Object constructor
var View2_Sidebar = function(container, model) {

  model.addDishToMenu(2);

  model.addObserver(this);

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var selectedDishes = model.getFullMenu();
  var totalPrice = container.find("#totalPrice");

  var refreshSelectedDishes = function() {
    totalPrice.html("SEK " + model.getTotalMenuPrice().toString());

    for (var i = 0; i < selectedDishes.length; i++) {
      var dish = selectedDishes[i];
      dishContainer
        .append($("<div>").addClass("row")
          .append($("<div>").addClass("col-md-12")
            .append($("<div>").addClass("well margin")
              .append($("<p>").addClass("alignLeft").html(dish.name))
              .append($("<p>").addClass("alignRight").html(model.getDishPrice(dish.id)))
              .append($("<button>").addClass("btn btn-danger circle")
                .append($("<span>").addClass("glyphicon glyphicon-remove"))))));
    }
  }

  var clearSelectedDishes = function() {}

  this.update = function() {

  }
}
