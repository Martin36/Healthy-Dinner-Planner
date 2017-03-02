// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.totalMenuPrice = Dinner.getTotalMenuPrice();
  $scope.fullMenu = Dinner.getFullMenu();
  $scope.menuPrice = Dinner.getTotalMenuPrice();
  $scope.extraCols = 5 - $scope.fullMenu.length;
  $scope.selectedDishes = Dinner.getSelectedDishes();

  $scope.getSelectedDishes = function() {
    return Dinner.getSelectedDishes();
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getFullMenu = function() {
    return Dinner.getFullMenu();
  }

  $scope.getTotalMenuPrice = function() {
    return Dinner.getTotalMenuPrice();
  }

  $scope.setNumberOfGuests = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.incrementGuests = function() {
    Dinner.setNumberOfGuests(++$scope.numberOfGuests);
  }

  $scope.decreaseGuests = function() {
    Dinner.setNumberOfGuests(--$scope.numberOfGuests);
  }

  $scope.removeDishFromMenu = function(dish) {
//    var index = $scope.selectedDishes.indexOf(dish);
//    $scope.selectedDishes.splice(index,1);
    Dinner.removeDishFromMenu(dish.id);
    //WHY?
    $scope.selectedDishes = Dinner.getSelectedDishes();

  }

  //$scope.selectedDish = Dinner.getSelectedDish();
  //console.log($scope.selectedDish);
  $scope.convertFloat = function(float){
    return parseFloat(float).toFixed(1);
  }

  $scope.printId = function(id){
    console.log(id);
  }
});
