var visualizeExoplanets = function(data){
	var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF562E", "#1F05FF", "#26FF4F", "#128128", "#812574", "#561134", "#243754", "#266219", "#446554", "#251399", "#227186", "#542625", "#530176", "#87941", "#695397", "#396707", "#371830", "#725629", "#479539", "#972173", "#161016", "#369194", "#203283", "#571481", "#927284", "#670136", "#807413", "#170631", "#750094", "#697640"]
	var color = d3.scale.ordinal().range(colors);
	var tip = d3.tip()
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Emp ID: <span style='color:red'>" + d.key +' : '+ d.value  + " Juices</span></strong>";
	});
	var desc = function(x, y){
		return x.value - y.value;
	}
	var pack = d3.layout.pack()
	    .sort(desc)
	    .size([1000, 1000])
	    .value(function(d) { return d.values})
	    .padding(1);
	var svg = d3.select("#EmpExoplanet").append("svg")
	    .attr("width", 1000)
	    .attr("height", 1000);
	svg.call(tip);
	svg.selectAll("circle")
	      .data(pack.nodes({children: data}))
	    .enter().append("circle")
			.attr("r", function(d) {return d.values/10 + 2; })
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.style("fill", function(d, i) { return color(i); })
			.on('mouseover', tip.show) 		
			.on('mouseout', tip.hide) 		
};

var data = function(){
	d3.json("./data/juice_orders", function(error, data) {
		var newdata = d3.nest()
		.key(function(d) {return d.employeeId})	
		.rollup(function(v){
			return d3.sum(v, function(d){
				return d.quantity;
			})
		})
		.entries(data);
		visualizeExoplanets(newdata);
	});
};
data();
