//ExampleView Object constructor
var SelectDishesView = function(container, model) {

  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)
  this.dishes = container.find("#selectableDishes");
  this.dishList = container.find("#listWithDishes");

  this.allDishes = model.getAllDishes().prevObject;

  for (var i = 0; i < this.allDishes.length; i++) {

    // TODO: Don't create a new variable for every element
    var dish = $("<div>").addClass("col-md-2 frame");
    var thumb = $("<div>").addClass("thumbnail fixedHeight")
    var href = $("<a>").attr("href", "#")
    var img = $("<img>").attr("src", "images/" + this.allDishes[i].image);
    img.attr("style", "width: 100%")
    var caption = $("<div>").addClass("caption");
    var title = $("<h4>").html(this.allDishes[i].name);

    caption.append(title);
    href.append(img);
    href.append(caption);
    thumb.append(href);
    dish.append(thumb);
    this.dishList.append(dish);

    // Clearfix to keep rows on the same level
    if ((i + 1) % 5 == 0) {
      var clearFix = $("<div>").addClass("clearfix visible-md visible-lg");
      this.dishList.append(clearFix);
    }
  }
}

/*
<div class="clearfix visible-md visible-lg"></div>

<div class="col-md-2 col-sm-2 frame">
	<div class="thumbnail">
		<a href="#">
			<img src="images/meatballs.jpg" alt="Meatballs" style="width:100%">
			<div class="caption">
				<h3>Meatballs</h3>
				<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam.</p>
			</div>
		</a>
	</div>
</div>
*/