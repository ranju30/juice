var visulizeIt = function(data){
 var colors = ['#F42F98', "#50f4FF", "#9B2DFF", "#FFFDDE", "#FF877E", "#1F05FF", "#26FF4F", "#128128", "#812574", "#561134", "#243754", "#266219", "#446554", "#251399", "#227186", "#542625", "#530176", "#87941", "#695397", "#396707", "#371830", "#725629", "#479539", "#972173", "#161016", "#369194", "#203283", "#571481", "#927284", "#fff136", "#807413", "#170631", "#750094", "#697640"].slice(0,31).reverse()
 var yScale = d3.scale.linear()
   .range([600, 0])
   .domain([0, 7000])
 var xScale = d3.scale.ordinal()
   .rangeRoundBands([0, 800])
 var xAxis = d3.svg.axis()
   .scale(xScale)
   .orient('bottom');
 var yAxis = d3.svg.axis()
   .scale(yScale)
   .orient('left');
 var svg = d3.select('#bar').append('svg') 
   .attr('width',1000)
   .attr('height',1000)
 var tip = d3.tip()
     .attr('class', 'd3-tip')
    .offset([-10, 0])
     .html(function(d) {
      return "<strong>Quantity:</strong> <span style='color:red'>" + d.values + "</span>";
 });
 svg.selectAll('g').data(data).enter()
   .append('rect')
     .attr('x', function(d, i){return i * 25+70})
     .attr('y', function(d, i){return yScale(d.values) + 10})
     .attr('fill', function(d, i){return colors[i]})
     .attr('width', 18)
     .attr('height', function(d, i){return 600 - yScale(d.values)})
     .on('mouseover', tip.show)
     .on('mouseout', tip.hide)
 svg.selectAll('g').data(data).enter()
   .append('text')
     .text(function(d){return d.key;})
     .attr('x', function(d, i){return i * 25-15})
     .attr('y', function(d, i){return 555})
     .attr('transform', function(d, i){return 'rotate(90 '+i * 25+' 630)'})
      
 svg.append('g')
   .call(yAxis)
   .attr('transform', 'translate(60 10)')
   .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
 svg.append('g')
   .call(xAxis)
   .attr('transform', 'translate(60 610)')
   .style({ 'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px'})
 svg.call(tip);
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
   visulizeIt(juice);
 });
};

dataForEachJuiceInTotal();

