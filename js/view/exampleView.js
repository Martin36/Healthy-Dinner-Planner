//ExampleView Object constructor
var ExampleView = function(container, model) {

  model.addObserver(this);
  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  this.numberOfGuests = container.find("#numberOfGuests");
  this.plusButton = container.find("#plusGuest");
  console.log(this.plusButton);
  this.minusButton = container.find("#minusGuest");
  this.toggleButton = $("body").find("#toggleButton");

  this.numberOfGuests.html(model.getNumberOfGuests());
  //this.numberOfGuests.html("FJORTON");

  this.update = function(obj){
    switch (obj) {
      case "nrGuests":
      this.numberOfGuests.html(model.getNumberOfGuests());
        break;
      default:

    }
  }
}
