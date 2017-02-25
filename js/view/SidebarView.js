//ExampleView Object constructor
var SidebarView = function(container, model) {

  model.addObserver(this);

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  var dishContainer = container.find("#selectedDishes");
  var totalCost = container.find("#totalCost").html("SEK 0");
  var dishTypes = ["starter", "main course", "dessert"];
  var pendingCost = container.find("#pendingCost");

  // Initialize all 3 different dishtypes in the sidebar
  var initSelectedDishes = function(){
    var dishID = ""
    for (dish in dishTypes){
      if(dishTypes[dish] == "main course")
        dishID = "maincourse";
      else
        dishID = dishTypes[dish];

      dishContainer
      .append($("<div>").addClass("row  well margin").attr("id", dishID+"Container").attr("style", "display: none;")
        .append($("<div>").addClass("col-md-12")
          .append($("<div>")//.addClass("well margin")
            .append($("<div>").addClass("row")
            .append($("<div>").addClass("col-md-8 alignLeft").attr("id", dishID+"Name"))
            .append($("<div>").addClass("col-md-4 alignRight").attr("id", dishID+"Cost")))//.html(model.getDishPrice(dish.id)))
            .append($("<button>").addClass("btn btn-danger circle")
            .attr("type", "button").attr("id", "delete"+dishID+"Button")
              .append($("<span>").addClass("glyphicon glyphicon-remove"))))));
    }
  }
  initSelectedDishes();

  // Buttons
  this.confirmButton = container.find("#confirmButton");
  this.plusButton = container.find("#plusGuest");
  this.minusButton = container.find("#minusGuest");

  this.deleteStarterButton = container.find("#deletestarterButton");
  this.deleteMainCourseButton = container.find("#deletemaincourseButton");
  this.deleteDessertButton = container.find("#deletedessertButton");

  // Text containers
  this.starterContainer = container.find("#starterContainer");
  this.mainCourseContainer = container.find("#maincourseContainer");
  this.dessertContainer = container.find("#dessertContainer");

  this.starterName = container.find("#starterName");
  this.mainCourseName = container.find("#maincourseName");
  this.dessertName = container.find("#dessertName");

  this.starterCost = container.find("#starterCost");
  this.mainCourseCost = container.find("#maincourseCost");
  this.dessertCost = container.find("#dessertCost");

  // Changes the cost shown
  this.changeTotalCost = function(){
    totalCost.html("SEK " + model.getTotalMenuPrice().toString());
    pendingCost.html(model.getTotalMenuPrice().toString());
  }

  // Change the cost on each dish and update total cost
  this.numberOfGuestsChanged = function(){
    container.find("#nrGuests").html(model.getNumberOfGuests());
    this.changeTotalCost();
  }

  // Update content of selected dishes
  this.addSelectedDishes = function(type) {
    var dishes = model.getFullMenu();
    for(i = 0; i < dishes.length; i++){
      switch (dishes[i].type) {
        case "starter":
            this.starterName.html(dishes[i].title+". ");
            this.deleteStarterButton.attr("dishID", dishes[i].id);
            this.starterCost.html(model.getDishPrice(dishes[i].id) + " /each");
            if(this.starterContainer.attr("style") == "display: none;")
              this.starterContainer.slideDown(500);
            else if (dishes[i].type == type)
              this.starterContainer.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          break;
        case "main dish":
            this.mainCourseName.html(dishes[i].title+". ");
            this.deleteMainCourseButton.attr("dishID", dishes[i].id);
            this.mainCourseCost.html(model.getDishPrice(dishes[i].id) + " /each");
            if(this.mainCourseContainer.attr("style") == "display: none;")
              this.mainCourseContainer.slideDown(500);
            else if (dishes[i].type == type)
              this.mainCourseContainer.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          break;
        case "dessert":
            this.dessertName.html(dishes[i].title+". ");
            this.deleteDessertButton.attr("dishID", dishes[i].id);
            this.dessertCost.html(model.getDishPrice(dishes[i].id) + " /each");
            if(this.dessertContainer.attr("style") == "display: none;")
              this.dessertContainer.slideDown(500);
            else if (dishes[i].type == type)
              this.dessertContainer.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
          break;
        default:
      }
    }
  }

  // Update each sidebar button depending on what type of dish was added.
  this.update = function(obj) {
    switch (obj) {
      case "nrGuests":
        this.numberOfGuestsChanged();
        break;
      case "starter":
        this.addSelectedDishes(obj);
        break;
      case "main dish":
        this.addSelectedDishes(obj);
      break;
      case "dessert":
          this.addSelectedDishes(obj);
        break;
      case "dishRemoved":
          this.changeTotalCost();
        break;
      default:
    }
    this.changeTotalCost();
  }
}
