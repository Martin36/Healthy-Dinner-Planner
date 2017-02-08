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
          .append($("<h1><span id='starterTitle'></span></h1>")))
          .append($("<p>").attr("id", "starterDescription"))
        .append($("<div>").attr("class", "col-md-5 col-sm-5")
          .append($("<h2>Preparation</h2>")))
          .append($("<p>").attr("id", "starterPreparation")));
  }

  $("#starterTitle").html(starter.name);
  $("#starterImage").attr("src", "images/" + starter.image);
  $("#starterDescription").html(starter.description);



  /*
  <div class="row" style="margin-top: 20px;display: flex;">

    <div class="col-md-2">
      <div class="center-content">
        <img class="img-responsive center-block border" src="images/bakedbrie.jpg" />
      </div>
    </div>

    <div class="col-md-5">
      <h1>Dish 1</h1>
      <p>
        slifjsdlkgfjs.ldfgkmnb.,dafmnb.,adfnb.aj,mnbadfkbjadlkfbn
      </p>
    </div>

    <div class="col-md-5">
      <h2>Preparation</h2>
      <p>
        slifjsdlkgfjs.ldfgkmnb.,dafmnb.,adfnb.aj,mnbadfkbjadlkfbn
      </p>
    </div>
  </div>
  <!-- Second Dish -->
  <div class="row" style="margin-top: 20px;display: flex;">

    <div class="col-md-2">
      <div class="center-content">
        <img class="img-responsive center-block border" src="images/icecream.jpg" />
      </div>
    </div>

    <div class="col-md-5">
      <h1>Dish 2</h1>
      <p>
        slifjsdlkgfjs.ldfgkmnb.,dafmnb.,adfnb.aj,mnbadfkbjadlkfbn
      </p>
    </div>

    <div class="col-md-5">
      <h2>Preparation</h2>
      <p>
        slifjsdlkgfjs.ldfgkmnb.,dafmnb.,adfnb.aj,mnbadfkbjadlkfbn
      </p>
    </div>
  </div>
  <!-- Third Dish -->
  <div class="row" style="margin-top: 20px;display: flex;">
    <div class="col-md-2" >
      <div class="center-content">
        <img class="img-responsive center-block border" src="images/meatballs.jpg" />
      </div>
    </div>

    <div class="col-md-5">
      <h1>Dish 3</h1>
      <p>
        slifjsdlkgfjs.ldfgkmnb.,dafmnb.,adfnb.aj,mnbadfkbjadlkfbn
      </p>
    </div>

    <div class="col-md-5">
      <h2>Preparation</h2>
      <p>
        slifjsdlkgfjs.ldfgkmnb.,dafmnb.,adfnb.aj,mnbadfkbjadlkfbn
      </p>
    </div>

  </div>
*/
}
