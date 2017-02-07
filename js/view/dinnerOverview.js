var DinnerOverview = function(model){

  //Add the dishes
  model.addDishToMenu(1);
  //model.addDishToMenu(2);
  //model.addDishToMenu(3);

  var starter = model.getSelectedDish("starter");
  console.log(starter);
  console.log(starter.name);
  $("#starterTitle").html(starter.name);
  console.log("images/" + starter.image);
  $("#starterImage").attr("src", "images/" + starter.image);
  $("#starterDescription").html("");
  $("#starterPrice").html();

  //Set nr of guests
  model.setNumberOfGuests(10);
  this.numberOfGuests = $("#numberOfGuests");
  this.numberOfGuests.html(model.getNumberOfGuests());


}
