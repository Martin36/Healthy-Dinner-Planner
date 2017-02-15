//ExampleView Object constructor
var SidebarView = function(container, model) {



  this.confirmButton = container.find("#confirmButton");

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
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
      .append($("<div>").addClass("row").attr("id", dishID+"Container")//.attr("style", "display:none")
        .append($("<div>").addClass("col-md-12")
          .append($("<div>").addClass("well margin")
            .append($("<p>").addClass("alignLeft").attr("id", dishID+"Name"))
            .append($("<p>").addClass("alignRight").attr("id", dishID+"Price"))//.html(model.getDishPrice(dish.id)))
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

  this.starterName = container.find("#starterName");
  this.mainCourseName = container.find("#maincourseName");
  this.dessertName = container.find("#dessertName");

  // Update content of selected dishes
  this.addSelectedDishes = function() {
    totalPrice.html("SEK " + model.getTotalMenuPrice().toString());
    var dishes = model.getFullMenu();
    for(i = 0; i < dishes.length; i++){
      switch (dishes[i].type) {
        case "starter":
            this.starterName.html(dishes[i].name);
            this.starterName.attr("dishID", dishes[i].id);
            if(this.starterContainer.attr("style") == "display: none;"){
              this.starterContainer.toggle();
              console.log("SHOW STARTER");
            }

          break;
        case "main course":
            this.mainCourseName.html(dishes[i].name);
            this.mainCourseName.attr("dishID", dishes[i].id);
            if(mainCourseContainer.attr("style") == "display: none")
              mainCourseContainer.toggle();
          break;
        case "dessert":
            this.dessertName.html(dishes[i].name);
            this.dessertName.attr("dishID", dishes[i].id);
            if(dessertContainer.attr("style") == "display: none")
              dessertContainer.toggle();
          break;
        default:
      }
    }
  }

  // Change the cost on each dish and update total cost
  var numberOfGuestsChanged = function(){
    var totalPrice = 0;
    var nrOfGuests = model.getNumberOfGuests();
    for(dish in model.getFullMenu()){
      var dishCost = model.getDishPrice(dish.id) * nrOfGuests;
      totalPrice += dishCost;
      switch (dish.type) {
        case "starter":
          container.find("#starterPrice").html(dishCost);
          break;
        case "main course":
            container.find("#maincoursePrice").html(dishCost);
          break;
        case "dessert":
            container.find("#dessertPrice").html(dishCost);
          break;
        default:
      }
    }
    totalPrice.html(totalPrice);
  }

  // Update each sidebar button depending on what type of dish was added.
  this.update = function(obj) {
    switch (obj) {
      case "nrGuests":

        break;
      case "starter" || "main course" || "dessert":
        this.addSelectedDishes();
      default:

    }

  }

  model.addObserver(this);
  model.addDishToMenu(1);
}
