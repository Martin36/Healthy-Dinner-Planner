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

  var updateDish = function(dish){
    var type = dish.type
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

    //Check if starter div exists
    if($("#" + courseString + "Container").length){
      //Add data to view
      $("#" + courseString + "Title").html(dish.name);
      $("#" + courseString + "Image").attr("src", "images/" + dish.image);
      $("#" + courseString + "Price").html(model.getDishPrice(dish.id));
    }
  }


  //Add fisrt extra div
  $("#coursesRow").append($("<div>").attr("class", "col-md-" + nrOfExtraDivCols + " col-sm-" + nrOfExtraDivCols + " frame"));


  //Set up view of starter
  var starter = model.getSelectedDish("starter");
  if (starter != undefined) {
    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame").attr("id", "starterContainer").attr("style", "")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id", "starterImage"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", "starterTitle"))
              .append($("<h3>Price: <span id='starterPrice'></span> SEK</h3>"))))));

    updateDish(starter);
  }


  //Set up view of main course
  var mainCourse = model.getSelectedDish("main dish");
  if (mainCourse != undefined) {
    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame").attr("id", "mainCourseContainer")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id", "mainCourseImage"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", "mainCourseTitle"))
              .append($("<h3>Price: <span id='mainCoursePrice'></span> SEK</h3>"))))));

    updateDish(mainCourse);
  }

  //Set up view of dessert
  var dessert = model.getSelectedDish("dessert");
  if (dessert != undefined) {
    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame").attr("id", "dessertContainer")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id", "dessertImage"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", "dessertTitle"))
              .append($("<h3>Price: <span id='dessertPrice'></span> SEK</h3>"))))));

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
