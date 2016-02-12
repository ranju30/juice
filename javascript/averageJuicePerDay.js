var visualizeWeekPie = function(data){
	var width = 600;
	var height = 550;
	var radius = 250;
	var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF562E"]
	var color = d3.scale.ordinal().range(colors);
	var tip = d3.tip()
	  	.attr('class', 'd3-tip')
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Quantity:</strong> <span style='color:black'>" + d.data.key +' : '+ d.value  + " Juices</span>";
	});
	var arc = d3.svg.arc()
		.outerRadius(250)
		.innerRadius(5);
	var pie = d3.layout.pie()
		.value(function(d){
			return d.values})
	var svg = d3.select('#weekPie').append('svg')
		.attr('width', width)
		.attr('height', height)
			.append('g')
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	svg.call(tip);

	var g = svg.selectAll('#weekPie')
		.data(pie(data))
		.enter().append('g');
	g.append('path')
		.attr('d', arc)
		.style("fill", function(d) { ;return color(d.value)})
		.style('stroke', 'black')
		.style('stroke-width', '1px')
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
};

var data = function(){
	d3.json("./data/juice_orders", function(error, data) {
		var newdata = d3.nest()
	.key(function(d) {return new Date(d.date).toString().slice(0,3)})	
	.rollup(function(v){
		return d3.sum(v, function(d){
			return d.quantity;
		})
	})
	.entries(data);
	visualizeWeekPie(newdata);
	})
}

data();

