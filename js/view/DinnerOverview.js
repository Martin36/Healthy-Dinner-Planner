var DinnerOverview = function(container, model) {
  //Add this view as observer
  model.addObserver(this);
  //Find the buttons on the view
  this.printRecipeButton = container.find("#specialButton");
  this.backButton = container.find("#backButton");
  this.toggleButton = $("#toggleButton");
  //Select if animation should be used
  var animate = false;
  //Function for getting the name of dish type used the ids
  var converDishType = function(type){
    var courseString = "";
    switch (type) {
      case "starter":
      case "dessert":
        courseString = type;
        break;
      case "main dish":
        courseString = "mainCourse";
        break;
      default:
    }
    return courseString;
  }
  //Fixes the layout when a new dish type is added
  var updateLayout = function(){
    //Clear the row
    container.find("#coursesRow").empty();
    //First add the empty column to center dishes
    var nrOfExtraDivCols = 5 - model.getFullMenu().length;
    container.find("#coursesRow").append($("<div>").attr("class", "col-md-" + nrOfExtraDivCols + " col-sm-" + nrOfExtraDivCols + " frame"));
    //Then add the dishes
    var dishTypes = ["starter", "main dish", "dessert"];
    for(i in dishTypes){
      var dish = model.getSelectedDish(dishTypes[i]);
      if(dish != undefined){
        initDish(dish.type);
        updateDish(dish.type);
      }
    }
    //Set up view of total price
    container.find("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame noHilight").attr("id", "container")
        .append($("<h3>Total: <span id='totalPrice'></span> SEK</h3>")));
    //Set total price to the one contained in the model
    container.find("#totalPrice").html(model.getTotalMenuPrice());
  }
  //Updates the dish's div with new values
  var updateDish = function(type){

    var dish = model.getSelectedDish(type);

    var courseString = converDishType(dish.type);

    //Check if the dish's div exists
    if($("#" + courseString + "Container").length){
      //Add data to view
      $("#" + courseString + "Title").html(dish.name);
      $("#" + courseString + "Image").attr("src", "../images/" + dish.image);
      $("#" + courseString + "Price").html(model.getDishPrice(dish.id) * model.getNumberOfGuests());
    }
  }
  //Function for initializing the divs for the dishes
  var initDish = function(type){

    var dish = model.getSelectedDish(type);

    var courseString = converDishType(dish.type);

    container.find("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame").attr("id", courseString + "Container").attr("style", "")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id",courseString + "Image"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", courseString + "Title"))
              .append($("<h3>Price: <span id='" + courseString + "Price'></span> SEK</h3>"))))));
  }
  //Function for updating the price of everything
  var updatePrice = function(){
    //Update price of the dishes
    var dishTypes = ["starter", "main dish", "dessert"];
    for(i in dishTypes){
      //Check if model contains that dish type
      if(model.getSelectedDish(dishTypes[i]) != undefined){
        //Get the price element
        var priceTag = container.find("#" + converDishType(dishTypes[i]) + "Price");
        if(priceTag != undefined){
          priceTag.html(model.getDishPrice(model.getSelectedDish(dishTypes[i]).id) * model.getNumberOfGuests())
        }
      }
    }
    //Update total price
    container.find("#totalPrice").html(model.getTotalMenuPrice());
  }
  //Run initial update to create the elements (only needed if the model contains dishes from the start)
  updateLayout();
  //Function called by the observable
  this.update = function(obj){
    switch (obj) {
      case "nrGuests":
        //Set nr of guests
        container.find("#numberOfGuests").html(model.getNumberOfGuests());
        updatePrice();
        break;
      case "starter":
      case "main dish":
      case "dessert":
        //Check if div exists
        if(container.find("#" + converDishType(obj) + "Container").length == 0){
          updateLayout();
        }
        updateDish(obj);
        break;
      case "dishRemoved":
        updateLayout();
        break;
      default:
        break;
    }
  }
}
