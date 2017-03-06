// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner', function ($resource, $cookieStore) {

  this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
    get: {
      headers: {
         'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      }
    }
  });

  this.getDishesFromCookies = function(){
    selectedDishesIds = $cookieStore.get("selDishes");
    var newSelectedDishes = [];
    for(var i = 0; i < selectedDishesIds.length; i++){
      var dish = this.Dish.get({id:selectedDishesIds[i]});
      newSelectedDishes.push(dish);
    }
    return newSelectedDishes;
  }


  var numberOfGuests = ($cookieStore.get("nrGuests") != undefined) ? $cookieStore.get("nrGuests") : 2 ;
  var dishes = [];
  // Only save the id's of the selectedDishes as cookies
  var dishTypes = ["starter", "main dish", "dessert"];
  var selectedDishes = ($cookieStore.get("selDishes") != undefined) ? this.getDishesFromCookies() : [];
  var selectedDishesIds = ($cookieStore.get("selDishes") != undefined) ? $cookieStore.get("selDishes") : [];

  this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
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
      //Save number of guests as a cookie
      $cookieStore.put("nrGuests", numberOfGuests);
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

  this.getTypes = function() {
    return dishTypes;
  }

  //Removes dish from menu
  this.removeDishFromMenu = function(dish) {
    var index = selectedDishes.indexOf(dish);
    selectedDishes.splice(index,1);
    selectedDishesIds.splice(index,1);
    $cookieStore.put("selDishes", selectedDishesIds);
    //$cookies.put(selectedDishesCookie, selectedDishes);
  }

  this.addDishToMenu = function(newDish) {
    //Need to check the type for the newDish
    //First find the object with the same id as the new one
    var dishObj = dishes.filter(function(dish){
      return dish.id == newDish.id
    })[0];
    //Then set the type for the newDish dish
    newDish.type = newDish.dishTypes[0];
    //Append newDish to selectedDishes
    for(var i = 0; i <selectedDishes.length; i++){
      if(newDish.type == selectedDishes[i].type){
        this.removeDishFromMenu(selectedDishes[i]);
      }
    }
    selectedDishes.push(newDish);
    selectedDishesIds.push(newDish.id);
    $cookieStore.put("selDishes", selectedDishesIds);
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
