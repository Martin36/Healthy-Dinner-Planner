//ExampleView Object constructor
var SidebarView = function(container, model) {

  //Buttons
  this.confirmButton = container.find("#confirmButton");
  this.plusButton = container.find("#plusGuest");
  this.minusButton = container.find("#minusGuest");


  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var totalPrice = container.find("#totalPrice").html("SEK 0");
  var dishTypes = ["starter", "main course", "dessert"];

  var initSelectedDishes = function(){
    var dishID = ""
    for (dish in dishTypes){
      if(dishTypes[dish] == "main course")
        dishID = "maincourse";
      else
        dishID = dishTypes[dish];

      dishContainer
      .append($("<div>").addClass("row").attr("id", dishID+"Container").attr("style", "display: none;")
        .append($("<div>").addClass("col-md-12")
          .append($("<div>").addClass("well margin")
            .append($("<p>").addClass("alignLeft").attr("id", dishID+"Name"))
            .append($("<p>").addClass("alignRight").attr("id", dishID+"Cost"))//.html(model.getDishPrice(dish.id)))
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

  this.starterCost = container.find("#starterCost");
  this.mainCourseCost = container.find("#maincourseCost");
  this.dessertCost = container.find("#dessertCost");

  // Update content of selected dishes
  this.addSelectedDishes = function() {

    var dishes = model.getFullMenu();
    for(i = 0; i < dishes.length; i++){
      switch (dishes[i].type) {
        case "starter":
            this.starterName.html(dishes[i].name);
            this.deleteStarterButton.attr("dishID", dishes[i].id);
            this.starterCost.html(model.getDishPrice(dishes[i].id));
            if(this.starterContainer.attr("style") == "display: none;")
              this.starterContainer.toggle();
          break;
        case "main dish":
            this.mainCourseName.html(dishes[i].name);
            this.deleteMainCourseButton.attr("dishID", dishes[i].id);
            this.mainCourseCost.html(model.getDishPrice(dishes[i].id));
            if(this.mainCourseContainer.attr("style") == "display: none;")
              this.mainCourseContainer.toggle();
          break;
        case "dessert":
            this.dessertName.html(dishes[i].name);
            this.deleteDessertButton.attr("dishID", dishes[i].id);
            this.dessertCost.html(model.getDishPrice(dishes[i].id));
            if(this.dessertContainer.attr("style") == "display: none;")
              this.dessertContainer.toggle();
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

  this.changeTotalPrice = function(){
    totalPrice.html("SEK " + model.getTotalMenuPrice().toString());
  }

  // Update each sidebar button depending on what type of dish was added.
  this.update = function(obj) {
    switch (obj) {
      case "nrGuests":
        container.find($("#nrGuests")).html(model.getNumberOfGuests());
        break;
      case "starter":
        this.addSelectedDishes();
        break;
      case "main dish":
        this.addSelectedDishes();
      break;
      case "dessert":
          this.addSelectedDishes();
        break;
      case "dishRemoved":
          this.changeTotalPrice();
        break;
      default:
    }
  }
  model.addObserver(this);
}
