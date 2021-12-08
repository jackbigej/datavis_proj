drawSinglePlayer();

function drawSinglePlayer() {
    var svg = d3.select("svg");
    svg.selectAll('path').remove();

    var arcData = [

        { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: 140, outerRadius: 200 },
        { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: 70, outerRadius: 140 },
        { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: 20, outerRadius: 70 }
    ];

    var arcGenerator = d3.arc();

    var threePointArc = d3.select('g')
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d, i) {
            if (i == 0) {
                return 'orange';
            }
            else if (i == 1) {
                return 'blue';
            }
            else {
                return 'green';
            }
        })
        .attr('stroke', 'white');

}

function drawTwoPlayers() {
    var svg = d3.select("svg");
    svg.selectAll('path').remove();

    var arcData = [

        { startAngle: -Math.PI / 2, endAngle: 0, innerRadius: 140, outerRadius: 200 },
        { startAngle: 0, endAngle: Math.PI / 2, innerRadius: 140, outerRadius: 200 },
        { startAngle: -Math.PI / 2, endAngle: 0, innerRadius: 70, outerRadius: 140 },
        { startAngle: 0, endAngle: Math.PI / 2, innerRadius: 70, outerRadius: 140 },
        { startAngle: -Math.PI / 2, endAngle: 0, innerRadius: 20, outerRadius: 70 },
        { startAngle: 0, endAngle: Math.PI / 2, innerRadius: 20, outerRadius: 70 }

    ];

    var arcGenerator = d3.arc();

    var threePointArc = d3.select('g')
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d, i) {
            if (i < 2) {
                return 'orange';
            }
            else if (i < 4) {
                return 'blue';
            }
            else {
                return 'green';
            }
        })
        .attr('stroke', 'white');
}

function drawThreePlayers() {
    var svg = d3.select("svg");
    svg.selectAll('path').remove();

    var arcData = [

        { startAngle: -Math.PI / 2, endAngle: -Math.PI / 6, innerRadius: 140, outerRadius: 200 },
        { startAngle: -Math.PI / 6, endAngle: Math.PI / 6, innerRadius: 140, outerRadius: 200 },
        { startAngle: Math.PI / 6, endAngle: Math.PI / 2, innerRadius: 140, outerRadius: 200 },
        { startAngle: -Math.PI / 2, endAngle: -Math.PI / 6, innerRadius: 70, outerRadius: 140 },
        { startAngle: -Math.PI / 6, endAngle: Math.PI / 6, innerRadius: 70, outerRadius: 140 },
        { startAngle: Math.PI / 6, endAngle: Math.PI / 2, innerRadius: 70, outerRadius: 140 },
        { startAngle: -Math.PI / 2, endAngle: -Math.PI / 6, innerRadius: 20, outerRadius: 70 },
        { startAngle: -Math.PI / 6, endAngle: Math.PI / 6, innerRadius: 20, outerRadius: 70 },
        { startAngle: Math.PI / 6, endAngle: Math.PI / 2, innerRadius: 20, outerRadius: 70 }

    ];

    var arcGenerator = d3.arc();

    var threePointArc = d3.select('g')
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function (d, i) {
            if (i < 3) {
                return 'orange';
            }
            else if (i < 6) {
                return 'blue';
            }
            else {
                return 'green';
            }
        })
        .attr('stroke', 'white');

}