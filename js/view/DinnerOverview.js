var DinnerOverview = function(model){

  //Add the dishes
  model.addDishToMenu(1);
  model.addDishToMenu(100);
  //model.addDishToMenu(3);

  //Set up view of starter
  var starter = model.getSelectedDish("starter");
  if(starter != "undefined"){
    $("#starterTitle").html(starter.name);
    $("#starterImage").attr("src", "images/" + starter.image);
    $("#starterPrice").html(model.getDishPrice(starter.id));
  }

  //Set up view of main course
  var mainCourse = model.getSelectedDish("main dish");
  if(mainCourse != "undefined"){
    $("#mainCourseTitle").html(mainCourse.name);
    $("#mainCourseImage").attr("src", "images/" + mainCourse.image);
    $("#mainCoursePrice").html(model.getDishPrice(mainCourse.id));
  }

  //Set up view of dessert
  var dessert = model.getSelectedDish("dessert");
  if(dessert != "undefined"){

  }

  //Set nr of guests
  model.setNumberOfGuests(10);
  this.numberOfGuests = $("#numberOfGuests");
  this.numberOfGuests.html(model.getNumberOfGuests());


}
