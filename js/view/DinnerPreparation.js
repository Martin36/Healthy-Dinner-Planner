var DinnerPreparation = function(container, model){

  //Add the dishes
  model.addDishToMenu(1);
  model.addDishToMenu(100);
  model.addDishToMenu(200);
  model.setNumberOfGuests(10);

  //Find buttons
  this.backButton = container.find("#backButton");
  //Set the number of guests
  var nrGuests = container.find("#nrGuests").html(model.getNumberOfGuests());

  var preparationContainer = container.find("#preparationContainer");

  var starter = model.getSelectedDish("starter");
  if(starter != undefined){
    //Create the row with starter
    //Create cols containing image, dish name and description
    preparationContainer
      .append($("<div>").attr("class", "row").attr("id", "preparationRow")
        .append($("<div>").attr("class", "col-md-2 col-sm-2")
          .append($("<div>").attr("class", "center-content")
            .append($("<img>").attr("class", "img-responsive center-block border").attr("id", "starterImage"))))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h1><span id='starterTitle'></span></h1>"))
          .append($("<p>").attr("id", "starterDescription")))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h2>Preparation</h2>"))
          .append($("<p>").attr("id", "starterPreparation"))));

    //Add data
    preparationContainer.find("#starterTitle").html(starter.name);
    container.find("#starterImage").attr("src", "../images/" + starter.image);
    container.find("#starterPreparation").html(starter.description);
  }

  var mainCourse = model.getSelectedDish("main dish");
  if(mainCourse != undefined){
    //Create the row with starter
    //Create cols containing image, dish name and description
    preparationContainer
      .append($("<div>").attr("class", "row").attr("id", "preparationRow")
        .append($("<div>").attr("class", "col-md-2 col-sm-2")
          .append($("<div>").attr("class", "center-content")
            .append($("<img>").attr("class", "img-responsive center-block border").attr("id", "mainCourseImage"))))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h1><span id='mainCourseTitle'></span></h1>"))
          .append($("<p>").attr("id", "mainCourseDescription")))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h2>Preparation</h2>"))
          .append($("<p>").attr("id", "mainCoursePreparation"))));

    //Add data
    container.find("#mainCourseTitle").html(mainCourse.name);
    container.find("#mainCourseImage").attr("src", "../images/" + mainCourse.image);
    container.find("#mainCoursePreparation").html(mainCourse.description);
  }

  var dessert = model.getSelectedDish("dessert");
  if(dessert != undefined){
    //Create the row with dessert
    //Create cols containing image, dish name and description
    preparationContainer
      .append($("<div>").attr("class", "row").attr("id", "preparationRow")
        .append($("<div>").attr("class", "col-md-2 col-sm-2")
          .append($("<div>").attr("class", "center-content")
            .append($("<img>").attr("class", "img-responsive center-block border").attr("id", "dessertImage"))))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h1><span id='dessertTitle'></span></h1>"))
          .append($("<p>").attr("id", "dessertDescription")))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h2>Preparation</h2>"))
          .append($("<p>").attr("id", "dessertPreparation"))));

    //Add data
    container.find("#dessertTitle").html(dessert.name);
    container.find("#dessertImage").attr("src", "../images/" + dessert.image);
    container.find("#dessertPreparation").html(dessert.description);
  }
}
