$(function() {
	//We instantiate our model
	var model = new DinnerModel();

	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"), model);
	var dinnerOverview = new DinnerOverview(model);

	model.addDishToMenu(2);
	model.getAllIngredients();
	model.getTotalMenuPrice();


});
