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

  var dishes = container.find("#selectableDishes");
  var dishList = container.find("#listWithDishes");
  var allDishes = model.getAllDishes().prevObject;
  var filter = "";

  var clearAllDishes = function(){
    dishList.empty();
  }

  this.showDishesWithFilter = function(filter){
    clearAllDishes();

    if(filter == "")
        allDishes = model.getAllDishes(this.courseFilter);
    else{
      allDishes = model.getAllDishes(this.courseFilter,filter);
    }
    for (var i = 0; i < allDishes.length; i++) {
      dishList
        .append($("<div>").addClass("col-md-2 frame")
          .append($("<div>").addClass("thumbnail fixedHeight")
            .append($("<a>").attr("href", "#")
              .append($("<img>").attr("src", "../images/" + allDishes[i].image)
                .attr("style", "width: 100%"))
              .append($("<div>").addClass("caption")
                .append($("<h4>").html(allDishes[i].name))))));

      // Clearfix to keep rows on the same level
      // Call some sort of update on this when screensize reach a sertain minimum
      if ((i + 1) % 5 == 0) {
        var clearFix = $("<div>").addClass("clearfix visible-md visible-lg");
        dishList.append(clearFix);
      }
    }
  }

  this.showDishesWithFilter();
  // Changes the dishes shown if new ones are added to database.
  // Also change when filter is applied.
  this.update = function(obj){

  }
}
