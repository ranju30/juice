d3.json('./juice_orders',function(data){
	var drinks = _.map(data,"drinkName");
	drinks=_.pull(drinks,'CTL','ctl','Register User')
	var totalDrinks = _.countBy(drinks,_.identity);
	var scale = d3.scale.linear()
		.domain([0,d3.max(Object.keys(totalDrinks),function(d){return totalDrinks[d]})])
		.range([10,1000]);
	d3.select(".bar")
		.selectAll("div")
	    .data(Object.keys(totalDrinks))
		.enter().append("div")
	    .attr("transform", "translate(4,6)")
	    .style("width", function(d) {return scale(totalDrinks[d]) + "px"; })
	    .text(function(d) { return d; })
});