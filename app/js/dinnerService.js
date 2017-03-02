// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource/*, $cookies*/) {

  //var numberOfGuests = ($cookies.get(guests) != undefined) ? $cookies.get(guests) : 2 ;
  var numberOfGuests = 2;
  var dishes = [];
  //var selectedDishes = ($cookies.get(selectedDishesCookie) != undefined) ? $cookies.get(selectedDishesCookie) : [];
  var selectedDishes = [];
  var dishTypes = ["starter", "main dish", "dessert"];


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
  this.setDishes = function(newDishes, type){
    dishes = newDishes;
    //Set the type for the dishes
    dishes.forEach(function(dish){
      dish.type = type;
    });
  }

  this.getAllDishes = function() {
    return dishes;
  }

  this.setNumberOfGuests = function(num) {
      numberOfGuests = (num <= 0) ? 0 : num;
      //$cookies.put(guests, numberOfGuests);
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

  //Removes dish from menu
  this.removeDishFromMenu = function(dish) {
    var index = selectedDishes.indexOf(dish);
    selectedDishes.splice(index,1);
    //$cookies.put(selectedDishesCookie, selectedDishes);
  }

  this.addDishToMenu = function(newDish) {
    //Need to check the type for the newDish
    //First find the object with the same id as the new one
    var dishObj = dishes.filter(function(dish){
      return dish.id == newDish.id
    })[0];
    //Then set the type for the newDish dish
    newDish.type = dishObj.type;
    //Append newDish to selectedDishes
    for(var i = 0; i <selectedDishes.length; i++){
      if(newDish.type == selectedDishes[i].type){
        this.removeDishFromMenu(selectedDishes[i]);
      }
    }
    selectedDishes.push(newDish);
    //$cookies.put(selectedDishesCookie, selectedDishes);
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
