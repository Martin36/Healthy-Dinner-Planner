var DinnerOverview = function(model) {

  //Add the dishes
  model.addDishToMenu(1);
  model.addDishToMenu(100);
  model.addDishToMenu(200);
  model.setNumberOfGuests(10);
  //Add this view as observer
  model.addObserver(this);

  var nrOfExtraDivCols = 5 - model.getFullMenu().length;
  //Select if animation should be used
  var animate = false;

  //Set nr of guests
  $("#numberOfGuests").html(model.getNumberOfGuests());

  //Add fisrt extra div
  $("#coursesRow").append($("<div>").attr("class", "col-md-" + nrOfExtraDivCols + " col-sm-" + nrOfExtraDivCols + " frame"));

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
  //Updates the dish's div with new values
  var updateDish = function(dish){

    var courseString = converDishType(dish.type);

    //Check if the dish's div exists
    if($("#" + courseString + "Container").length){
      //Add data to view
      $("#" + courseString + "Title").html(dish.name);
      $("#" + courseString + "Image").attr("src", "images/" + dish.image);
      $("#" + courseString + "Price").html(model.getDishPrice(dish.id));
    }
  }
  //Function for initializing the divs for the dishes
  var initDish = function(dish){

    var courseString = converDishType(dish.type);

    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame").attr("id", courseString + "Container").attr("style", "")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id","../"+ courseString + "Image"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", courseString + "Title"))
              .append($("<h3>Price: <span id='" + courseString + "Price'></span> SEK</h3>"))))));
  }

  //Set up view of starter
  var starter = model.getSelectedDish("starter");
  if (starter != undefined) {
    initDish(starter);
    updateDish(starter);
  }

  //Set up view of main course
  var mainCourse = model.getSelectedDish("main dish");
  if (mainCourse != undefined) {
    initDish(mainCourse);
    updateDish(mainCourse);
  }

  //Set up view of dessert
  var dessert = model.getSelectedDish("dessert");
  if (dessert != undefined) {
    initDish(dessert);
    updateDish(dessert);
  }

  //Set up view of total price
  $("#coursesRow")
    .append($("<div>").attr("class", "col-md-2 col-sm-2 frame noHilight").attr("id", "container")
      .append($("<h3>Total: <span id='totalPrice'></span> SEK</h3>")));

  $("#totalPrice").html(model.getTotalMenuPrice());
  if(animate){
    //Animate the starter button
    $("#starterContainer").hide();
    $("#starterContainer").show(5000);
  }

  this.update = function(obj){
    switch (obj) {
      case "nrGuests":
        //Set nr of guests
        $("#numberOfGuests").html(model.getNumberOfGuests());
        break;
      case "starter":
        updateStarter();

        break;
      default:
        break;
    }
  }
}
