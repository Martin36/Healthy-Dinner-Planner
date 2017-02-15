//ExampleView Object constructor
var SidebarView = function(container, model) {

  model.addDishToMenu(2);

  model.addObserver(this);

  this.confirmButton = container.find("#confirmButton");
  
  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var selectedDishes = model.getFullMenu();
  var totalPrice = container.find("#totalPrice");
  var dishTypes = ["starter", "main course", "dessert"];

  var initSelectedDishes = function(){
    var dishID = ""
    for (dish in dishTypes){
      if(dishTypes[dish] == "main course")
        dishID = "maincourse";
      else
        dishID = dishTypes[dish];

      dishContainer
      .append($("<div>").addClass("row").attr("id", dishID+"Container")
        .append($("<div>").addClass("col-md-12")
          .append($("<div>").addClass("well margin")
            .append($("<p>").addClass("alignLeft").html(dishTypes[dish]))
            .append($("<p>").addClass("alignRight"))//.html(model.getDishPrice(dish.id)))
            .append($("<button>").addClass("btn btn-danger circle")
            .attr("type", "button").attr("id", "delete"+dishID+"Button")
              .append($("<span>").addClass("glyphicon glyphicon-remove"))))));
    }
  }

  initSelectedDishes();
  this.deleteStarterButton = container.find("#deletestarterButton");
  this.deleteMainCourseButton = container.find("#deletemaincourseButton");
  this.deleteDessertButton = container.find("#deletedessertButton");

  this.starterContainer = container.find("#starterContainer");
  this.mainCourseContainer = container.find("#maincourseContainer");
  this.dessertContainer = container.find("#dessertContainer");

  var addSelectedDishes = function() {
    totalPrice.html("SEK " + model.getTotalMenuPrice().toString());
    /*
    // Can only choose 3
    for (var i = 0; i < 3; i++) {
      var dish = selectedDishes[i];
      var dishExists = "display:null";
      if(dish == undefined) {
        dishExists = "display:none";
      }
      dishContainer
        .append($("<div>").addClass("row").attr("style", dishExists)
          .append($("<div>").addClass("col-md-12")
            .append($("<div>").addClass("well margin")
              .append($("<p>").addClass("alignLeft").html(dish.name))
              .append($("<p>").addClass("alignRight").html(model.getDishPrice(dish.id)))
              .append($("<button>").attr("id", "deleteDish").addClass("btn btn-danger circle")
              .attr("type", "button").attr("dishid", dish.id)
                .append($("<span>").addClass("glyphicon glyphicon-remove"))))));
    }
    */
  }


  //addSelectedDishes();

  //this.deleteButton = container.find("#deleteDish");
  var clearSelectedDishes = function() {
    while (dishContainer.firstChild) {
        dishContainer.removeChild(dishContainer.firstChild);
    }
  }

  this.update = function() {
    this.deleteButton = container.find("#deleteDish");
    clearSelectedDishes();
    addSelectedDishes();
  }
}
