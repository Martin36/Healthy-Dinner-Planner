//ExampleView Object constructor
var View2_Sidebar = function(container, model) {

  model.addDishToMenu(2);

  model.addObserver(this);

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var selectedDishes = model.getFullMenu();
  var totalPrice = container.find("#totalPrice");

  var addSelectedDishes = function() {
    totalPrice.html("SEK " + model.getTotalMenuPrice().toString());

    for (var i = 0; i < selectedDishes.length; i++) {
      var dish = selectedDishes[i];
      dishContainer
        .append($("<div>").addClass("row")
          .append($("<div>").addClass("col-md-12")
            .append($("<div>").addClass("well margin")
              .append($("<p>").addClass("alignLeft").html(dish.name))
              .append($("<p>").addClass("alignRight").html(model.getDishPrice(dish.id)))
              .append($("<button>").attr("id", "deleteDish").addClass("btn btn-danger circle")
              .attr("type", "button").attr("dishid", dish.id)
                .append($("<span>").addClass("glyphicon glyphicon-remove"))))));
    }
  }

  addSelectedDishes();
  this.deleteButton = container.find("#deleteDish");
  var clearSelectedDishes = function() {
    while (dishContainer.firstChild) {
        dishContainer.removeChild(dishContainer.firstChild);
    }
  }

  this.update = function() {
    this.deleteButton = container.find("#deleteDish");
    console.log("nr of buttons: " + this.deleteButton.length);
    clearSelectedDishes();
    addSelectedDishes();
  }
}
