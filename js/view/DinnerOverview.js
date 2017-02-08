var DinnerOverview = function(model){

  //Add the dishes
  model.addDishToMenu(1);
  model.addDishToMenu(100);
  model.addDishToMenu(200);
  model.setNumberOfGuests(10);

  var nrOfExtraDivCols = 5 - model.getFullMenu().length;

  //Add fisrt extra div
  $("#coursesRow").append($("<div>").attr("class", "col-md-" + nrOfExtraDivCols + " col-sm-" + nrOfExtraDivCols + " frame"));


  //Set up view of starter
  var starter = model.getSelectedDish("starter");
  if(starter != undefined){
    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id", "starterImage"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", "starterTitle"))
              .append($("<h3>Price: <span id='starterPrice'></span> SEK</h3>"))))));

    //Add data to view
    $("#starterTitle").html(starter.name);
    $("#starterImage").attr("src", "images/" + starter.image);
    $("#starterPrice").html(model.getDishPrice(starter.id));
  }

  //Set up view of main course
  var mainCourse = model.getSelectedDish("main dish");
  if(mainCourse != undefined){
    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id", "mainCourseImage"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", "mainCourseTitle"))
              .append($("<h3>Price: <span id='mainCoursePrice'></span> SEK</h3>"))))));

    //Add data to view
    $("#mainCourseTitle").html(mainCourse.name);
    $("#mainCourseImage").attr("src", "images/" + mainCourse.image);
    $("#mainCoursePrice").html(model.getDishPrice(mainCourse.id));
  }

  //Set up view of dessert
  var dessert = model.getSelectedDish("dessert");
  if(dessert != undefined){
    console.log(dessert);
    $("#coursesRow")
      .append($("<div>").attr("class", "col-md-2 col-sm-2 frame")
        .append($("<div>").attr("class", "thumbnail")
          .append($("<a>").attr("href", "#")
            .append($("<img>").attr("class", "foodImage").attr("id", "dessertImage"))
            .append($("<div>").attr("class", "caption")
              .append($("<h3>").attr("id", "dessertTitle"))
              .append($("<h3>Price: <span id='dessertPrice'></span> SEK</h3>"))))));

    //Add data
    $("#dessertTitle").html(dessert.name);
    $("#dessertImage").attr("src", "images/" + dessert.image);
    $("#dessertPrice").html(model.getDishPrice(dessert.id));
  }

  //Set up view of total price
  $("#coursesRow")
    .append($("<div>").attr("class", "col-md-2 col-sm-2 frame").attr("id", "container")
      .append($("<h3>Total: <span id='totalPrice'></span> SEK</h3>")));

  $("#totalPrice").html(model.getTotalMenuPrice());


  //Set nr of guests
  this.numberOfGuests = $("#numberOfGuests");
  this.numberOfGuests.html(model.getNumberOfGuests());


}
