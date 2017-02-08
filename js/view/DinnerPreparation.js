var DinnerPreparation = function(container, model){

  //Add the dishes
  model.addDishToMenu(1);
  model.addDishToMenu(100);
  model.addDishToMenu(200);
  model.setNumberOfGuests(10);

  var starter = model.getSelectedDish("starter");
  if(starter != undefined){
    //Create the row with starter
    //Create cols containing image, dish name and description
    container
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
    $("#starterTitle").html(starter.name);
    $("#starterImage").attr("src", "images/" + starter.image);
    $("#starterPreparation").html(starter.description);
  }

  var mainCourse = model.getSelectedDish("main dish");
  if(mainCourse != undefined){
    //Create the row with starter
    //Create cols containing image, dish name and description
    container
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
    $("#mainCourseTitle").html(mainCourse.name);
    $("#mainCourseImage").attr("src", "images/" + mainCourse.image);
    $("#mainCoursePreparation").html(mainCourse.description);
  }

  var dessert = model.getSelectedDish("dessert");
  if(dessert != undefined){
    //Create the row with dessert
    //Create cols containing image, dish name and description
    container
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
    $("#dessertTitle").html(dessert.name);
    $("#dessertImage").attr("src", "images/" + dessert.image);
    $("#dessertPreparation").html(dessert.description);
  }
}
