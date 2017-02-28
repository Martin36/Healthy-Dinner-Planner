// Here we create an Angular service that we will use for our
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {

  var numberOfGuests = 2;
  var selectedDishes = [];
  var observers = [];
  var inspectedDish;
  var dataLoaded = false;
  var dataLoading = false;
  var dishTypes = ["starter", "main dish", "dessert"];
  var dishes = [];
  var defaultUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=3&tags=';
  var request;

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

  this.setNumberOfGuests = function(num) {
      //don't use this.numberOfGuests to access class variable
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

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
      var totalCost = 0;
      var nrGuests = this.getNumberOfGuests();
      $.each(this.getAllIngredients(), function(index, ingredient) {
          totalCost += ingredient.amount * numberOfGuests;
      });
      return totalCost.toFixed(1);
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(id) {
    //Get the dish (in an array) with the specified id
    var newDish = $(dishes).filter(function(index, dish) {
        return dish.id == id;
    })[0];
    //Check if there is another dish of the same type
    for(var i = 0; i < dishTypes.length; i++){
      if(newDish.type == dishTypes[i]){
        var selectedDishOfType = this.getSelectedDish(dishTypes[i]);
        if(selectedDishOfType != undefined){
          this.removeDishFromMenu(selectedDishOfType.id);
        }
      }
    }
    //Append newDish to selectedDishes
    selectedDishes.push(newDish);
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

  //Removes dish from menu
  this.removeDishFromMenu = function(id) {
      selectedDishes = $(selectedDishes).filter(function(index, dish) {
          return dish.id !== id;
      });
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  function loadData(type, filter, cb, cbObj){
    dataLoading = true;
    if(request != undefined){
      request.abort();
    }
    dishes = [];
    var typeUrl;
    if(filter != undefined){
      typeUrl = defaultUrl + type + "," +filter ;
      console.log(typeUrl);
    }else{
      typeUrl = defaultUrl + "," + type;
    }
    request = $.ajax( {
      url: typeUrl,
      headers: {
        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
      },
      success: function(data) {
        console.log(data);
        dishes.push.apply(dishes, data.recipes);
        console.log(dishes);
        setTypeForDishes();
        dataLoaded = true;
        //When data is loaded call the callback function
        cb.apply(cbObj, [dishes]);
      },
      error: function(data) {
        //console.log(data)
        cb.apply(cbObj, ["Dish not found"]);
      }
    });
  }

  //Function that returns price of selected dish of type
  this.getDishPrice = function(id){
    var totalPrice = 0;
    var ingredients = this.getDish(id).extendedIngredients;
    for(index in ingredients){
      totalPrice += ingredients[index].amount;
    }
    return totalPrice.toFixed(1);
  }

  //Get and set function for inspectedDish
  this.inspectedDish = function(id){
    if(id == undefined)
      return inspectedDish;
    else {
      inspectedDish = this.getDish(id);
    }
  }

  this.dataLoaded = function(){
    return dataLoaded;
  }

  loadData("starter", undefined, function(data){
    selectedDishes = data;

  }, this);
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
