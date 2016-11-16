 var itemSize = 70,
      cellSize = itemSize - 1,
      margin = {top: 90, right: 20, bottom: 20, left: 120};
      
  var width = 750 - margin.right - margin.left,
      height = 400 - margin.top - margin.bottom;

  var response=heatMapData.data;
  
    var data = response.map(function( item ) {
        var newItem = {};
        newItem.country = item.name;
        newItem.product = item.id;
        newItem.value = item.value;

        return newItem;
    })

    var x_elements = d3.set(data.map(function( item ) { return item.product; } )).values(),
        y_elements = d3.set(data.map(function( item ) { return item.country; } )).values();

    var xScale = d3.scaleBand()
        .domain(x_elements)
        .range([0, x_elements.length * itemSize]);

    var xAxis = d3.axisTop(xScale)        
        .tickFormat(function (d) {
            return d;
        });

    var yScale = d3.scaleBand()
        .domain(y_elements)
        .range([0, y_elements.length * itemSize]);

    var yAxis = d3.axisLeft(yScale)
        .tickFormat(function (d) {
            return d;
        });

    var colorScale = d3.scaleThreshold()
        .domain([0.85, 1])
        .range(["#2980B9", "#E67E22", "#27AE60", "#27AE60"]);

    var svg = d3.select('.heatmap')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var cells = svg.selectAll('rect')
        .data(data)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('y', function(d) { return yScale(d.country); })
        .attr('x', function(d) { return xScale(d.product); })
        .attr('fill', function(d) { return colorScale(d.value); })
		.on('mouseover',function(){
			d3.select(this).style('opacity','0.5');			
		})
		.on('mouseout',function(){
			d3.select(this).style('opacity','1');			
		});;

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .selectAll('text')
        .attr('font-weight', 'normal');

    svg.append("g")
        .attr("class", "x axis")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "start")
        .attr("dx", ".8em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
            return "rotate(-65)";
        });