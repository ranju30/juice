var visualizeCircle = function(data){
	var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF562E", "#1F05FF", "#26FF4F", "#128128", "#812574", "#561134", "#243754", "#266219", "#446554", "#251399", "#227186", "#542625", "#530176", "#87941", "#695397", "#396707", "#371830", "#725629", "#479539", "#972173", "#161016", "#369194", "#203283", "#571481", "#927284", "#670136", "#807413", "#170631", "#750094", "#697640"]
	var color = d3.scale.ordinal().range(colors);
	var arc = d3.svg.arc()
			.outerRadius(250)
			.innerRadius(5);
		var pie = d3.layout.pie()
			.value(function(d){
				return (d.withoutSuger.values / d.total.values) *100})
		var svg = d3.select('#circle').append('svg')
			.attr('width', 700)
			.attr('height', 700)
				.append('g')
				.attr("transform", "translate(" + 300 + "," + 300 + ")");
		var tip = d3.tip()
		  	.attr('class', 'd3-tip')
		 	 .offset([-10, 0])
		  	.html(function(d) {
		   	 return "<strong>Quantity:</strong> <span style='color:pink'>" +((d.data.withoutSuger.values / d.data.total.values) *100).toFixed(2) +'% '+ d.data.total.key + "</span>";
		});
		svg.call(tip)
		var g = svg.selectAll('#circle')
			.data(pie(data))
			.enter().append('g');
		g.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i){return colors[i]})
			.style('stroke-width', '1px')
			.style('stroke', 'black')
			.on("mouseover", tip.show) 
			.on("mouseout", tip.hide) 
};

var data = function(){
	var juice = {};
	d3.json("./data/juice_orders", function(error, data) {
		juice["withoutSuger"] = d3.nest()
			.key(function(d) {return d.drinkName})
			.rollup(function(v) {
				return d3.sum(v, function(d){
					if(d.isSugarless) return d.quantity;
				})
			})
			.entries(data)
		juice["total"] = d3.nest()
			.key(function(d) {return d.drinkName})
			.rollup(function(v) {
				return d3.sum(v, function(d){
					return d.quantity;
				})
			})
			.entries(data)
 		var totalAndWithoutSugar = [];
 		for(var j = 0; j < juice['total'].length; j++){
 			var obj = {};
	 		for(var i in juice){
				obj[i] = juice[i][j];	 			
	 		};
	 		totalAndWithoutSugar.push(obj);
 		}
			visualizeCircle(totalAndWithoutSugar)
	})
}
data();

