// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  $scope.selectedDish = Dinner.Dish.get({id:$routeParams.dishId});

  console.log($scope.selectedDish);

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.addDishToMenu = function() {
    console.log("Add dish to menu!");
    Dinner.addDishToMenu($scope.selectedDish);
  }

});
