//ExampleView Object constructor
var View2_SelectedDishesView = function(container, model) {

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  this.dishContainer = container.find("#selectedDishes");
  this.selectedDishes = model.getFullMenu();

  console.log(this.dishContainer);

  for (var i = 0; i < this.selectedDishes.length; i++) {
    var dish = this.selectedDishes[i];
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
    this.dishContainer.append(selDish);
  }
}

/*
<div class="row">
  <div class="col-md-12">
    <div class="well margin">
      <p class="alignLeft">Ice Cream</p>
      <p class="alignRight">77.00</p>
      <button type="button" class="btn btn-danger circle"><span class="glyphicon glyphicon-remove"></span></button>
    </div>
  </div>
</div>
*/