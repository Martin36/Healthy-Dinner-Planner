// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.totalMenuPrice = Dinner.getTotalMenuPrice();
  $scope.fullMenu = Dinner.getFullMenu();
  $scope.menuPrice = Dinner.getTotalMenuPrice();
  $scope.extraCols = 5 - $scope.fullMenu.length;

  $scope.getSelectedDishes = function() {
    return Dinner.getSelectedDishes();
  }

  $scope.setNumberOfGuests = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.incrementGuests = function() {
    Dinner.setNumberOfGuests($scope.numberOfGuests++);
  }

  $scope.decreaseGuests = function() {
    Dinner.setNumberOfGuests($scope.numberOfGuests--);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.dishPrice = function(id){
    return Dinner.getDishPrice(id);
  }

  $scope.removeDishFromMenu = function(id){
    Dinner.removeDishFromMenu(id);
  }

  //$scope.selectedDish = Dinner.getSelectedDish();
  //console.log($scope.selectedDish);
  $scope.convertFloat = function(float){
    return parseFloat(float).toFixed(1);
  }

  $scope.printId = function(id){
    console.log(id);
  }
/*
  $scope.piecePrice = function(amount){
    return parseFloat(float).toFixed(1) * $scope.numberOfGuests;
  }
*/
});
