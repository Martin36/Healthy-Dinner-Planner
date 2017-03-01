// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case

  $scope.nrOfGuests = Dinner.getNumberOfGuests();

  $scope.getNumberOfGuests = function(){
    return Dinner.getNumberOfGuests();
  }
  console.log($scope.nrOfGuests);

  $scope.selectedDish = Dinner.Dish.get({id:$routeParams.dishId});
  console.log($scope.selectedDish);

  //Amount for single ingredient
  $scope.piecePrice = function(amount){
    return (parseFloat(amount) * Dinner.getNumberOfGuests()).toFixed(1);
  }

});
