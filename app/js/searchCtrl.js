// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.
  $scope.showSearch = false;
  $scope.dishes = Dinner.getDishes();

  $scope.getDishes = function() {
    return Dinner.getDishes();
  }

  $scope.search = function(query,type) {
    // Empty shown dishes list
    Dinner.setDishes([]);
    $scope.showSearch = true;

   Dinner.DishSearch.get({query:query,type:type},function(data){
     //This will reset when we change view??
     $scope.dishes=data.results;

     Dinner.setDishes($scope.dishes);
     $scope.showSearch = false;
   },function(data){
     $scope.status = "There was an error";
   });
  }
});
