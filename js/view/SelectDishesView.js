//ExampleView Object constructor
var SelectDishesView = function(container, model) {

  // Add this as observer
  model.addObserver(this);

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  this.searchDishInput = container.find("#searchDishInput");
  this.searchDishButton = container.find("#searchDishButton");
  this.selectedDropdown = container.find("#selectedDropdown");
  this.filterStarter = container.find("#filterStarter");
  this.filterMain = container.find("#filterMain");
  this.filterDesert = container.find("#filterDesert");
  this.courseFilter = "starter";

  //Buttons
  this.dishButtons = [];

  var dishes = container.find("#selectableDishes");
  var dishList = container.find("#listWithDishes");
  var loadingScreen = container.find("#loading");
//  var allDishes = model.getAllDishes().prevObject;
  var filter = "";
  var allDishes = [];

  this.showDishesWithFilter = function(){

//    container.find("#loading").toggle();



    }



  this.updateFilter = function(filter){
    
    container.find("#dishNotFound").hide();
    dishList.hide();
    loadingScreen.show();

    model.getAllDishes(this.courseFilter, filter, function(data){
        console.log(data);
        if(data == "Dish not found"){
          loadingScreen.hide();
          container.find("#dishNotFound").show();
          return;
        }else{
          container.find("#dishNotFound").hide();
          loadingScreen.hide();
          clearAllDishes(this.dishButtons);
          allDishes = data;
          for (var i = 0; i < allDishes.length; i++) {
            dishList
            .append($("<div>").addClass("col-md-2 frame")
                .append($("<div>").addClass("thumbnail fixedHeight")
                  .append($("<a>").attr("href", "#").attr("id", allDishes[i].id)
                    .append($("<img>").attr("src", allDishes[i].image)
                      .attr("style", "width: 100%"))
                    .append($("<div>").addClass("caption")
                      .append($("<h4>").html(allDishes[i].title))))));

            // Clearfix to keep rows on the same level
            // Call some sort of update on this when screensize reach a sertain minimum
            if ((i + 1) % 5 == 0) {
              var clearFix = $("<div>").addClass("clearfix visible-md visible-lg");
              dishList.append(clearFix);
            }
            //Add buttons
            this.dishButtons.push(container.find("a#" + allDishes[i].id));
          }
            model.buttonsLoaded();
            //Hide the loading screen and toggle the selectDishesView
            container.find("#loading").hide();
            dishList.show(1000);
        }
      }, this);


  }

  this.updateFilter();

  var clearAllDishes = function(dishButtons){
    dishList.empty();
    dishButtons = [];
  }


//  this.showDishesWithFilter();
  // Changes the dishes shown if new ones are added to database.
  // Also change when filter is applied.
  this.update = function(obj){
    switch (obj) {
      case "data loaded":
        this.showDishesWithFilter();
        break;
      default:

    }
  }
}
