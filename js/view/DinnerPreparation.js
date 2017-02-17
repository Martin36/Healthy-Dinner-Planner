var DinnerPreparation = function(container, model){

  model.addObserver(this);
  //Find buttons
  this.backButton = container.find("#backButton");
  //Set the number of guests
  var nrGuests = container.find("#nrGuests").html(model.getNumberOfGuests());

  var preparationContainer = container.find("#preparationContainer");

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
  //Function for initializing the dish of type "type"
  var initDish = function(type){

    var courseString = converDishType(type);

    //Create cols containing image, dish name and description
    preparationContainer
      .append($("<div>").attr("class", "row").attr("id", "preparationRow")
        .append($("<div>").attr("class", "col-md-2 col-sm-2")
          .append($("<div>").attr("class", "center-content")
            .append($("<img>").attr("class", "img-responsive center-block border").attr("id", courseString + "Image"))))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h1><span id='" + courseString + "Title'></span></h1>"))
          .append($("<p>").attr("id", courseString + "Description")))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h2>Preparation</h2>"))
          .append($("<p>").attr("id", courseString + "Preparation"))));

    //Add data to the row
    updateDish(type);
  };
  //Function for updating the dish of type "type"
  var updateDish = function(type){
    var dish = model.getSelectedDish(type);
    var courseString = converDishType(type);
    //Add data
    container.find("#" + courseString + "Title").html(dish.name);
    container.find("#" + courseString + "Image").attr("src", "../images/" + dish.image);
    container.find("#" + courseString + "Preparation").html(dish.description);

  }
  //When a dish is removed or added the whole layout needs to be updated
  var updateLayout = function(){
    preparationContainer.empty();

    var starter = model.getSelectedDish("starter");
    if(starter != undefined){
      initDish(starter.type);
    }

    var mainCourse = model.getSelectedDish("main dish");
    if(mainCourse != undefined){
      initDish(mainCourse.type);
    }

    var dessert = model.getSelectedDish("dessert");
    if(dessert != undefined){
      initDish(dessert.type);
    }
  }

  this.update = function(obj){
    switch (obj) {
      case "nrGuests":
        //Set nr of guests
        nrGuests.html(model.getNumberOfGuests());
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
