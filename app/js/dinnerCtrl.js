// Dinner controller that we use whenever we have view that needs to
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  $scope.totalMenuPrice = Dinner.getTotalMenuPrice();

  $scope.setNumberOfGuests = function(number){
    Dinner.setNumberOfGuests(number);
  }
  $scope.incrementGuests = function() {
    Dinner.setNumberOfGuests($scope.numberOfGuests++);
  }
  $scope.decreaseGuests = function() {
    if($scope.numberOfGuests - 1 < 0) return;
    Dinner.setNumberOfGuests($scope.numberOfGuests--);
  }
  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }




  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

<<<<<<< HEAD
  $scope.fullMenu = Dinner.getFullMenu();

  $scope.dishPrice = function(id){
    return Dinner.getDishPrice(id);
  }

  $scope.extraCols = 5 - $scope.fullMenu.length;

  console.log($scope.fullMenu.length);

  $scope.menuPrice = Dinner.getTotalMenuPrice();
=======
>>>>>>> 42559d5ebaa825986a794db0837d6c227b9ef9d0
});
