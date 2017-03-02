// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {

  var numberOfGuests = 2;
  var dishes = [];
  var selectedDishes = [];
  var dishTypes = ["starter", "main dish", "dessert"];
  //var defaultUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=3&tags=';

  this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
    get: {
      headers: {
        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      }
    }
  });
  this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
    get: {
      headers: {
         'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      }
    }
  });

  this.getDishes = function(){
    return dishes;
  }
  this.setDishes = function(newDishes){
    dishes = newDishes;
  }

  this.getAllDishes = function() {
    return dishes;
  }

  this.setNumberOfGuests = function(num) {
      numberOfGuests = (num <= 0) ? 0 : num;
  }

  // should return
  this.getNumberOfGuests = function() {
      return numberOfGuests;
  }

  //Returns the dish that is on the menu for selected type
  this.getSelectedDish = function(type) {
      return $(selectedDishes).filter(function(index, dish) {
          return dish.type == type;
      })[0];
  }
  this.getSelectedDishes = function() {
    return selectedDishes;
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
      var array = [];
      $.each(selectedDishes, function(key, value){
        array.push(value);
      })

      return array;
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
      var ingredients = [];
      $.each(selectedDishes, function(index, dish) {
          $.each(dish.extendedIngredients, function(index, ingredient) {
              ingredients.push(ingredient);
          });
      });
      return ingredients;
  }

  this.getTotalMenuPrice = function() {
    totalCost = 0;
    for(var i = 0; i < selectedDishes.length; i++) {
      totalCost += selectedDishes[i].pricePerServing * numberOfGuests;
    }
    return totalCost;
  }


  this.addDishToMenu = function(newDish) {
    //Append newDish to selectedDishes
    selectedDishes.push(newDish);
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(dish) {
    var index = selectedDishes.indexOf(dish);
    selectedDishes.splice(index,1);
  }




  var setTypeForDishes = function () {
    //Set type for dish
    $.each(dishes, function (index, dish) {

      for (var i = 0; i < dish.dishTypes.length; i++) {
        if (dishTypes.indexOf(dish.dishTypes[i]) > -1) {
          dish.type = dish.dishTypes[i];
          break;
        } else if (dish.dishTypes[i] == "main course") {
          //Convert to "main dish"
          dish.type = "main dish";
        }
      }
      //If there is no match
      if (dish.type == undefined) {
        dish.type = "main dish";
      }

     // console.log(dish.type);
    })

  }




  this.dataLoaded = function(){
    return dataLoaded;
  }

  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
