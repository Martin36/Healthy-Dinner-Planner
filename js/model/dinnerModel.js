//DinnerModel Object constructor
var DinnerModel = function() {

    var numberOfGuests;
    var selectedDishes = [];
    var observers = [];
    var inspectedDish;
    var dataLoaded = false;
    var dataLoading = false;
    var dishTypes = ["starter", "main dish", "dessert"];

    var defaultUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=10&tags=';

    var request;



    var notifyObservers = function(obj) {
      $.each(observers, function(index, observer){
        observer.update(obj);
      });
    }

    this.addObserver = function(observer) {
      observers.push(observer);
    }

    this.setNumberOfGuests = function(num) {
        //don't use this.numberOfGuests to access class variable
        numberOfGuests = (num <= 0) ? 0 : num;
        notifyObservers("nrGuests");
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
      notifyObservers(newDish.type);
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
        notifyObservers("dishRemoved");
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
          dishes.push.apply(dishes, data.recipes);
          setTypeForDishes();
          dataLoaded = true;
          notifyObservers("data loaded");
          //When data is loaded call the callback function
          cb.apply(cbObj, [dishes]);
        },
        error: function(data) {
          //console.log(data)
          cb.apply(cbObj, ["Dish not found"]);
        }
      });
    }

    this.getAllDishes = function(type, filter, cb, cbObj) {

      loadData(type, filter, cb, cbObj);

      if(!dataLoading && !dataLoaded){
      }
/*
        return $(dishes).filter(function(index, dish) {
            var found = true;
            if (filter) {
                found = false;
                $.each(dish.extendedIngredients, function(index, ingredient) {
                    if (ingredient.name.indexOf(filter) != -1) {
                        found = true;
                    }
                });
                if (dish.name.indexOf(filter) != -1) {
                    found = true;
                }
            }
            return dish.type == type && found;
        });
*/


    }

    //function that returns a dish of specific ID
    this.getDish = function(id) {
        for (var i = 0; i < dishes.length; i++) {
            if (dishes[i].id == id) {
                return dishes[i];
            }
        }
        //Also check the selected dishes because these will be removed when the filter changes
        for (var i = 0; i < selectedDishes.length; i++){
          if(selectedDishes[i].id == id){
            return selectedDishes[i];
          }
        }

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
        notifyObservers();
      }
    }

    this.dataLoaded = function(){
      return dataLoaded;
    }

    this.buttonsLoaded = function(){
      notifyObservers("buttons loaded");
    }


    // the dishes variable contains an array of all the
    // dishes in the database. each dish has id, name, type,
    // image (name of the image file), description and
    // array of ingredients. Each ingredient has name,
    // quantity (a number), price (a number) and unit (string
    // defining the unit i.e. "g", "slices", "ml". Unit
    // can sometimes be empty like in the example of eggs where
    // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
    var dishes = [{
        'id': 1,
        'name': 'French toast',
        'type': 'starter',
        'image': 'toast.jpg',
        'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
        'ingredients': [{
            'name': 'eggs',
            'quantity': 0.5,
            'unit': '',
            'price': 10
        }, {
            'name': 'milk',
            'quantity': 30,
            'unit': 'ml',
            'price': 6
        }, {
            'name': 'brown sugar',
            'quantity': 7,
            'unit': 'g',
            'price': 1
        }, {
            'name': 'ground nutmeg',
            'quantity': 0.5,
            'unit': 'g',
            'price': 12
        }, {
            'name': 'white bread',
            'quantity': 2,
            'unit': 'slices',
            'price': 2
        }]
    }, {
        'id': 2,
        'name': 'Sourdough Starter',
        'type': 'starter',
        'image': 'sourdough.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'active dry yeast',
            'quantity': 0.5,
            'unit': 'g',
            'price': 4
        }, {
            'name': 'warm water',
            'quantity': 30,
            'unit': 'ml',
            'price': 0
        }, {
            'name': 'all-purpose flour',
            'quantity': 15,
            'unit': 'g',
            'price': 2
        }]
    }, {
        'id': 3,
        'name': 'Baked Brie with Peaches',
        'type': 'starter',
        'image': 'bakedbrie.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'round Brie cheese',
            'quantity': 10,
            'unit': 'g',
            'price': 8
        }, {
            'name': 'raspberry preserves',
            'quantity': 15,
            'unit': 'g',
            'price': 10
        }, {
            'name': 'peaches',
            'quantity': 1,
            'unit': '',
            'price': 4
        }]
    }, {
        'id': 100,
        'name': 'Meat balls',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
        'ingredients': [{
            'name': 'extra lean ground beef',
            'quantity': 115,
            'unit': 'g',
            'price': 20
        }, {
            'name': 'sea salt',
            'quantity': 0.7,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'small onion, diced',
            'quantity': 0.25,
            'unit': '',
            'price': 2
        }, {
            'name': 'garlic salt',
            'quantity': 0.7,
            'unit': 'g',
            'price': 2
        }, {
            'name': 'Italian seasoning',
            'quantity': 0.6,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'dried oregano',
            'quantity': 0.3,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'crushed red pepper flakes',
            'quantity': 0.6,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'Worcestershire sauce',
            'quantity': 6,
            'unit': 'ml',
            'price': 7
        }, {
            'name': 'milk',
            'quantity': 20,
            'unit': 'ml',
            'price': 4
        }, {
            'name': 'grated Parmesan cheese',
            'quantity': 5,
            'unit': 'g',
            'price': 8
        }, {
            'name': 'seasoned bread crumbs',
            'quantity': 15,
            'unit': 'g',
            'price': 4
        }]
    }, {
        'id': 101,
        'name': 'MD 2',
        'type': 'main dish',
        'image': 'bakedbrie.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 1,
            'unit': 'pieces',
            'price': 8
        }, {
            'name': 'ingredient 2',
            'quantity': 15,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 10,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 102,
        'name': 'MD 3',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 2,
            'unit': 'pieces',
            'price': 8
        }, {
            'name': 'ingredient 2',
            'quantity': 10,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 5,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 103,
        'name': 'MD 4',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 1,
            'unit': 'pieces',
            'price': 4
        }, {
            'name': 'ingredient 2',
            'quantity': 12,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 6,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 200,
        'name': 'Chocolat Ice cream',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 201,
        'name': 'Vanilla Ice cream',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 202,
        'name': 'Strawberry',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }];

}
