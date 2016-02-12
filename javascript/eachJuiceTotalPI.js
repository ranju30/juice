var visualizeitPie = function(data){
	var width = 600;
	var height = 550;
	var radius = 250;
	var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF562E", "#1F05FF", "#26FF4F", "#128128", "#812574", "#561134", "#243754", "#266219", "#446554", "#251399", "#227186", "#542625", "#530176", "#87941", "#695397", "#396707", "#371830", "#725629", "#479539", "#972173", "#161016", "#369194", "#203283", "#571481", "#927284", "#670136", "#807413", "#170631", "#750094", "#697640"]
	var color = d3.scale.ordinal().range(colors);
	var tip = d3.tip()
	  	.attr('class', 'd3-tip')
	 	 .offset([-10, 0])
	  	.html(function(d) {
	   	 return "<strong>Quantity:</strong> <span style='color:pink'>" + d.data.key +' : '+ d.value  + "</span>";
	});
	var arc = d3.svg.arc()
		.outerRadius(250)
		.innerRadius(5);
	var pie = d3.layout.pie()
		.value(function(d){
			return d.values})
	var svg = d3.select('#pie').append('svg')
		.attr('width', width)
		.attr('height', height)
			.append('g')
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	svg.call(tip);

	var g = svg.selectAll('#pie')
		.data(pie(data))
		.enter().append('g');
	g.append('path')
		.attr('d', arc)
		.style("fill", function(d) { return color(d.value)})
		.style('stroke', 'black')
		.style('stroke-width', '1px')
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
};


var dataForEachJuiceInTotal = function(){
 var juice = {};
 d3.json("data/juice_orders", function(error, data) {
   var juice = d3.nest()
     .key(function(d) {return d.drinkName; })
     .rollup(function(v) {
       return d3.sum(v, function(d){
         return d.quantity;
       })})
     .entries(data);
   for(var i = 0; i < juice.length; i++){
     if(juice[i].key == 'CTL' || juice[i].key == 'ctl' ||juice[i].key == 'Fruits' || juice[i].key == 'Register User' ){
       juice.splice(i,1);
     }
   };
   visualizeitPie(juice);
 });
};

dataForEachJuiceInTotal();