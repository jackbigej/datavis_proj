d3.json("all-years-data.json", parseData);

// global variables to store data
var playerNames = [];
var allData = {};
var numPlayers = 1;

/*
var all_arcs = svg.select('g').selectAll('path');
all_arcs.on('mouseover', function(d, i){
    d3.select(this)
});*/

function parseData(error, data) {
    allData = data;
    for (const [key, value] of Object.entries(data)) {
        playerNames.push(key)
    }
    playerNames.sort();
    console.log(allData);
    console.log(playerNames);

    // create first datalist
    var datalist = document.createElement('datalist');

    for (let i = 0; i < playerNames.length; i++) {
        var option = document.createElement('option');
        option.value = playerNames[i];
        datalist.appendChild(option);
    }
    datalist.id = 'datalist1';
    document.getElementById('datalists').appendChild(datalist);
}

function addYear(data) {
    var div = document.getElementById('div' + data);
    var player = document.getElementById(data).value;

    if (playerNames.indexOf(player) > -1) {
        var select = document.createElement('select');
        select.setAttribute('id', 'select' + data);

        for (const [key, value] of Object.entries(allData[player])) {
            if (key.match(/^\d/)) {
                let option = document.createElement('option');
                option.value = key;
                option.text = key;
                select.appendChild(option);
            }
        }
        div.appendChild(select);
    } else {
        try {
            document.getElementById('select' + data).remove();
        } catch (error) { }
    }
}

function addInput() {
    var value = document.getElementById('addPlayerBtn').value;
    var intValue = parseInt(value) + 1;
    document.getElementById('addPlayerBtn').value = intValue;
    console.log(intValue);

    var div = document.createElement('div');
    div.setAttribute('id', 'divplayer' + intValue);
    div.setAttribute('class', 'playerInput');

    // create input text element
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'player' + intValue);
    input.setAttribute('list', 'datalist1');
    input.setAttribute('onchange', 'addYear("player' + intValue + '")');

    //document.getElementById('datalists').appendChild(input);
    div.appendChild(input);
    //div.appendChild(document.createElement('br'));
    document.getElementById('datalists').appendChild(div);

    //hide/show remove player btn
    if (intValue > 1) {
        document.getElementById('removePlayerBtn').style.visibility = 'visible';
    } else {
        document.getElementById('removePlayerBtn').style.visibility = 'hidden';
    }

    // hide add player btn
    if (intValue == 3) {
        // remove button
        document.getElementById('addPlayerBtn').style.visibility = 'hidden';
    }
}

function removeInput() {
    var value = document.getElementById('addPlayerBtn').value;
    var intValue = parseInt(value);

    if (intValue == 3) {
        // remove input
        document.getElementById('divplayer3').remove();

        intValue -= 1;
        document.getElementById('addPlayerBtn').value = intValue;
        // show addPlayer btn
        document.getElementById('addPlayerBtn').style.visibility = 'visible';
    } else if (intValue == 2) {
        // remove input
        document.getElementById('divplayer2').remove();

        // update value
        intValue -= 1;
        document.getElementById('addPlayerBtn').value = intValue;

        // hide removePlayer btn
        document.getElementById('removePlayerBtn').style.visibility = 'hidden';
    }
}

function fillStatsBox(player1, player1Yr, player2 = null, player2Yr = null, player3 = null, player3Yr = null) {
    document.getElementById('player1Name').innerHTML = player1;
    document.getElementById('player1Year').innerHTML = player1Yr;
    document.getElementById('player1TotalMake').innerHTML = allData[player1][player1Yr]["Make"];
    document.getElementById('player1TotalMiss').innerHTML = allData[player1][player1Yr]["Miss"];
    document.getElementById('player1TotalPercent').innerHTML = (100 * (allData[player1][player1Yr]["Make"] / allData[player1][player1Yr]["Total"])).toFixed(1);
    document.getElementById('player13ptMake').innerHTML = allData[player1][player1Yr]["threePt"]["Make"];
    document.getElementById('player13ptMiss').innerHTML = allData[player1][player1Yr]["threePt"]["Miss"];
    document.getElementById('player13ptPercent').innerHTML = (100 * (allData[player1][player1Yr]["threePt"]["Make"] / allData[player1][player1Yr]["threePt"]["Total"])).toFixed(1);
    document.getElementById('player1ShortMake').innerHTML = allData[player1][player1Yr]["twoShort"]["Make"];
    document.getElementById('player1ShortMiss').innerHTML = allData[player1][player1Yr]["twoShort"]["Miss"];
    document.getElementById('player1ShortPercent').innerHTML = (100 * (allData[player1][player1Yr]["twoShort"]["Make"] / allData[player1][player1Yr]["twoShort"]["Total"])).toFixed(1);
    document.getElementById('player12ptLongMake').innerHTML = allData[player1][player1Yr]["twoLong"]["Make"];
    document.getElementById('player12ptLongMiss').innerHTML = allData[player1][player1Yr]["twoLong"]["Miss"];
    document.getElementById('player12ptLongPercent').innerHTML = (100 * (allData[player1][player1Yr]["twoLong"]["Make"] / allData[player1][player1Yr]["twoLong"]["Total"])).toFixed(1);

    if (player2 && player2Yr) {
        var p2 = document.getElementById('player2Stats')
        p2.style.display = 'block';

        document.getElementById('player2Name').innerHTML = player2;
        document.getElementById('player2Year').innerHTML = player2Yr;
        document.getElementById('player2TotalMake').innerHTML = allData[player2][player2Yr]["Make"];
        document.getElementById('player2TotalMiss').innerHTML = allData[player2][player2Yr]["Miss"];
        document.getElementById('player2TotalPercent').innerHTML = (100 * (allData[player2][player2Yr]["Make"] / allData[player2][player2Yr]["Total"])).toFixed(1);
        document.getElementById('player23ptMake').innerHTML = allData[player2][player2Yr]["threePt"]["Make"];
        document.getElementById('player23ptMiss').innerHTML = allData[player2][player2Yr]["threePt"]["Miss"];
        document.getElementById('player23ptPercent').innerHTML = (100 * (allData[player2][player2Yr]["threePt"]["Make"] / allData[player2][player2Yr]["threePt"]["Total"])).toFixed(1);
        document.getElementById('player2ShortMake').innerHTML = allData[player2][player2Yr]["twoShort"]["Make"];
        document.getElementById('player2ShortMiss').innerHTML = allData[player2][player2Yr]["twoShort"]["Miss"];
        document.getElementById('player2ShortPercent').innerHTML = (100 * (allData[player2][player2Yr]["twoShort"]["Make"] / allData[player2][player2Yr]["twoShort"]["Total"])).toFixed(1);
        document.getElementById('player22ptLongMake').innerHTML = allData[player2][player2Yr]["twoLong"]["Make"];
        document.getElementById('player22ptLongMiss').innerHTML = allData[player2][player2Yr]["twoLong"]["Miss"];
        document.getElementById('player22ptLongPercent').innerHTML = (100 * (allData[player2][player2Yr]["twoLong"]["Make"] / allData[player2][player2Yr]["twoLong"]["Total"])).toFixed(1);
    }
    else {
        var p2 = document.getElementById('player2Stats')
        p2.style.display = 'none';
    }

    if (player3 && player3Yr) {
        var p3 = document.getElementById('player3Stats')
        p3.style.display = 'block';

        document.getElementById('player3Name').innerHTML = player3;
        document.getElementById('player3Year').innerHTML = player3Yr;
        document.getElementById('player3TotalMake').innerHTML = allData[player3][player3Yr]["Make"];
        document.getElementById('player3TotalMiss').innerHTML = allData[player3][player3Yr]["Miss"];
        document.getElementById('player3TotalPercent').innerHTML = (100 * (allData[player3][player3Yr]["Make"] / allData[player3][player3Yr]["Total"])).toFixed(1);
        document.getElementById('player33ptMake').innerHTML = allData[player3][player3Yr]["threePt"]["Make"];
        document.getElementById('player33ptMiss').innerHTML = allData[player3][player3Yr]["threePt"]["Miss"];
        document.getElementById('player33ptPercent').innerHTML = (100 * (allData[player3][player3Yr]["threePt"]["Make"] / allData[player3][player3Yr]["threePt"]["Total"])).toFixed(1);
        document.getElementById('player3ShortMake').innerHTML = allData[player3][player3Yr]["twoShort"]["Make"];
        document.getElementById('player3ShortMiss').innerHTML = allData[player3][player3Yr]["twoShort"]["Miss"];
        document.getElementById('player3ShortPercent').innerHTML = (100 * (allData[player3][player3Yr]["twoShort"]["Make"] / allData[player3][player3Yr]["twoShort"]["Total"])).toFixed(1);
        document.getElementById('player32ptLongMake').innerHTML = allData[player3][player3Yr]["twoLong"]["Make"];
        document.getElementById('player32ptLongMiss').innerHTML = allData[player3][player3Yr]["twoLong"]["Miss"];
        document.getElementById('player32ptLongPercent').innerHTML = (100 * (allData[player3][player3Yr]["twoLong"]["Make"] / allData[player3][player3Yr]["twoLong"]["Total"])).toFixed(1);
    }
    else {
        var p3 = document.getElementById('player3Stats')
        p3.style.display = 'none';
    }
}

function displayVisual() {
    // read value of 
    var value = document.getElementById('addPlayerBtn').value;
    var intValue = parseInt(value);

    // read player options
    let playerOption1 = '';
    let playerOption2 = '';
    let playerOption3 = '';
    let p1_yr = '';
    let p2_yr = '';
    let p3_yr = '';

    switch (intValue) {
        case 1:
            playerOption1 = document.getElementById('player1').value;
            p1_yr = document.getElementById('selectplayer1').value;
            fillStatsBox(playerOption1, p1_yr);
            drawSinglePlayer(playerOption1, p1_yr);
            break;
        case 2:
            playerOption1 = document.getElementById('player1').value;
            playerOption2 = document.getElementById('player2').value;
            p1_yr = document.getElementById('selectplayer1').value;
            p2_yr = document.getElementById('selectplayer2').value;
            fillStatsBox(playerOption1, p1_yr, playerOption2, p2_yr);
            drawTwoPlayers(playerOption1, p1_yr, playerOption2, p2_yr);
            break;
        case 3:
            playerOption1 = document.getElementById('player1').value;
            playerOption2 = document.getElementById('player2').value;
            playerOption3 = document.getElementById('player3').value;
            p1_yr = document.getElementById('selectplayer1').value;
            p2_yr = document.getElementById('selectplayer2').value;
            p3_yr = document.getElementById('selectplayer3').value;
            fillStatsBox(playerOption1, p1_yr, playerOption2, p2_yr, playerOption3, p3_yr);
            drawThreePlayers(playerOption1, p1_yr, playerOption2, p2_yr, playerOption3, p3_yr);
            break;
    }
}

function updatePlayerStats(players) {

    var player1Stats = document.getElementById('player1Stats');
    var player2Stats = document.getElementById('player2Stats');
    var player3Stats = document.getElementById('player3Stats');

    var num_players = players.length;

    if (num_players >= 1) {
        player1Stats.style.display = "block";
        player2Stats.style.display = "none";
        player3Stats.style.display = "none";

        player1 = players[0]["Name"];
        p1_yr = players[0]["Year"];

        var player1Name = document.getElementById('player1Name');
        var player1Year = document.getElementById('player1Year');
        var p1_all_makes = document.getElementById('player1TotalMake')
        var p1_all_miss = document.getElementById('player1TotalMiss')
        var p1_all_perc = document.getElementById('player1TotalPercent')
        var p1_3pt_makes = document.getElementById('player13ptMake')
        var p1_3pt_miss = document.getElementById('player13ptMiss')
        var p1_3pt_perc = document.getElementById('player13ptPercent')
        var p1_2ptLong_makes = document.getElementById('player12ptLongMake')
        var p1_2ptLong_miss = document.getElementById('player12ptLongMiss')
        var p1_2ptLong_perc = document.getElementById('player12ptLongPercent')
        var p1_2ptShort_makes = document.getElementById('player1ShortMake')
        var p1_2ptShort_miss = document.getElementById('player1ShortMiss')
        var p1_2ptShort_perc = document.getElementById('player1ShortPercent')

        player1Name.innerText = player1;
        player1Year.innerText = p1_yr;
        p1_all_makes.innerText = allData[player1][p1_yr]["Make"];
        p1_all_miss.innerText = allData[player1][p1_yr]["Miss"];
        p1_all_perc.innerText = Number.parseFloat((allData[player1][p1_yr]["Make"] / allData[player1][p1_yr]["Total"]) * 100).toFixed(2);
        p1_3pt_makes.innerText = allData[player1][p1_yr]["threePt"]["Make"];
        p1_3pt_miss.innerText = allData[player1][p1_yr]["threePt"]["Miss"];
        p1_3pt_perc.innerText = Number.parseFloat((allData[player1][p1_yr]["threePt"]["Make"] / allData[player1][p1_yr]["threePt"]["Total"]) * 100).toFixed(2);
        p1_2ptShort_makes.innerText = allData[player1][p1_yr]["twoShort"]["Make"];
        p1_2ptShort_miss.innerText = allData[player1][p1_yr]["twoShort"]["Miss"];
        p1_2ptShort_perc.innerText = Number.parseFloat((allData[player1][p1_yr]["twoShort"]["Make"] / allData[player1][p1_yr]["twoShort"]["Total"]) * 100).toFixed(2);
        p1_2ptLong_makes.innerText = allData[player1][p1_yr]["twoLong"]["Make"];
        p1_2ptLong_miss.innerText = allData[player1][p1_yr]["twoLong"]["Miss"];
        p1_2ptLong_perc.innerText = Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"] / allData[player1][p1_yr]["twoLong"]["Total"]) * 100).toFixed(2);

    }

    if (num_players >= 2) {
        player1Stats.style.display = "block";
        player2Stats.style.display = "block";
        player3Stats.style.display = "none";

        player2 = players[1]["Name"];
        p2_yr = players[1]["Year"];

        var player2Name = document.getElementById('player2Name');
        var player2Year = document.getElementById('player2Year');
        var p2_all_makes = document.getElementById('player2TotalMake')
        var p2_all_miss = document.getElementById('player2TotalMiss')
        var p2_all_perc = document.getElementById('player2TotalPercent')
        var p2_3pt_makes = document.getElementById('player23ptMake')
        var p2_3pt_miss = document.getElementById('player23ptMiss')
        var p2_3pt_perc = document.getElementById('player23ptPercent')
        var p2_2ptLong_makes = document.getElementById('player22ptLongMake')
        var p2_2ptLong_miss = document.getElementById('player22ptLongMiss')
        var p2_2ptLong_perc = document.getElementById('player22ptLongPercent')
        var p2_2ptShort_makes = document.getElementById('player2ShortMake')
        var p2_2ptShort_miss = document.getElementById('player2ShortMiss')
        var p2_2ptShort_perc = document.getElementById('player2ShortPercent')

        player2Name.innerText = player2;
        player2Year.innerText = p2_yr;
        p2_all_makes.innerText = allData[player2][p2_yr]["Make"];
        p2_all_miss.innerText = allData[player2][p2_yr]["Miss"];
        p2_all_perc.innerText = Number.parseFloat((allData[player2][p2_yr]["Make"] / allData[player2][p2_yr]["Total"]) * 100).toFixed(2);
        p2_3pt_makes.innerText = allData[player2][p2_yr]["threePt"]["Make"];
        p2_3pt_miss.innerText = allData[player2][p2_yr]["threePt"]["Miss"];
        p2_3pt_perc.innerText = Number.parseFloat((allData[player2][p2_yr]["threePt"]["Make"] / allData[player2][p2_yr]["threePt"]["Total"]) * 100).toFixed(2);
        p2_2ptShort_makes.innerText = allData[player2][p2_yr]["twoShort"]["Make"];
        p2_2ptShort_miss.innerText = allData[player2][p2_yr]["twoShort"]["Miss"];
        p2_2ptShort_perc.innerText = Number.parseFloat((allData[player2][p2_yr]["twoShort"]["Make"] / allData[player2][p2_yr]["twoShort"]["Total"]) * 100).toFixed(2);
        p2_2ptLong_makes.innerText = allData[player2][p2_yr]["twoLong"]["Make"];
        p2_2ptLong_miss.innerText = allData[player2][p2_yr]["twoLong"]["Miss"];
        p2_2ptLong_perc.innerText = Number.parseFloat((allData[player2][p2_yr]["twoLong"]["Make"] / allData[player2][p2_yr]["twoLong"]["Total"]) * 100).toFixed(2);

    }

    if (num_players == 3) {
        player1Stats.style.display = "block";
        player2Stats.style.display = "block";
        player3Stats.style.display = "block";

        player3 = players[2]["Name"];
        p3_yr = players[2]["Year"];

        var player3Name = document.getElementById('player3Name');
        var player3Year = document.getElementById('player3Year');
        var p3_all_makes = document.getElementById('player3TotalMake')
        var p3_all_miss = document.getElementById('player3TotalMiss')
        var p3_all_perc = document.getElementById('player3TotalPercent')
        var p3_3pt_makes = document.getElementById('player33ptMake')
        var p3_3pt_miss = document.getElementById('player33ptMiss')
        var p3_3pt_perc = document.getElementById('player33ptPercent')
        var p3_2ptLong_makes = document.getElementById('player32ptLongMake')
        var p3_2ptLong_miss = document.getElementById('player32ptLongMiss')
        var p3_2ptLong_perc = document.getElementById('player32ptLongPercent')
        var p3_2ptShort_makes = document.getElementById('player3ShortMake')
        var p3_2ptShort_miss = document.getElementById('player3ShortMiss')
        var p3_2ptShort_perc = document.getElementById('player3ShortPercent')

        player3Name.innerText = player3;
        player3Year.innerText = p3_yr;
        p3_all_makes.innerText = allData[player3][p3_yr]["Make"];
        p3_all_miss.innerText = allData[player3][p3_yr]["Miss"];
        p3_all_perc.innerText = Number.parseFloat((allData[player3][p3_yr]["Make"] / allData[player3][p3_yr]["Total"]) * 100).toFixed(2);
        p3_3pt_makes.innerText = allData[player3][p3_yr]["threePt"]["Make"];
        p3_3pt_miss.innerText = allData[player3][p3_yr]["threePt"]["Miss"];
        p3_3pt_perc.innerText = Number.parseFloat((allData[player3][p3_yr]["threePt"]["Make"] / allData[player3][p3_yr]["threePt"]["Total"]) * 100).toFixed(2);
        p3_2ptShort_makes.innerText = allData[player3][p3_yr]["twoShort"]["Make"];
        p3_2ptShort_miss.innerText = allData[player3][p3_yr]["twoShort"]["Miss"];
        p3_2ptShort_perc.innerText = Number.parseFloat((allData[player3][p3_yr]["twoShort"]["Make"] / allData[player3][p3_yr]["twoShort"]["Total"]) * 100).toFixed(2);
        p3_2ptLong_makes.innerText = allData[player3][p3_yr]["twoLong"]["Make"];
        p3_2ptLong_miss.innerText = allData[player3][p3_yr]["twoLong"]["Miss"];
        p3_2ptLong_perc.innerText = Number.parseFloat((allData[player3][p3_yr]["twoLong"]["Make"] / allData[player3][p3_yr]["twoLong"]["Total"]) * 100).toFixed(2);
    }


}

function drawSinglePlayer(player1, p1_yr) {

    const players = [{ 'Name': player1, 'Year': p1_yr }];
    updatePlayerStats(players);

    console.log(player1);

    var svg = d3.select("svg");
    svg.selectAll('path').remove();
    svg.selectAll('text').remove();

    var arcData = [

        { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: 140, outerRadius: 200 },
        { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: 70, outerRadius: 140 },
        { startAngle: -Math.PI / 2, endAngle: Math.PI / 2, innerRadius: 20, outerRadius: 70 }
    ];

    var arcGenerator = d3.arc();

    var arc = d3.select('g')
        .selectAll('path')
        .data(arcData)
        .enter()
        .append('path')
        .attr('id', function (d, i) {
            return "path" + i;
        })
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
        .attr('stroke', 'white')
    /*
    var labels = d3.select('g').selectAll('path').append("text")
        .attr("transform", function(d,i) { 
            if (i == 0){
                d.outerRadius = 200;
                d.innerRadius = 140;
            }else if (i == 1){
                d.outerRadius = 140;
                d.innerRadius = 70;
            }else if (i == 2){
                d.outerRadius = 70;
                d.innerRadius = 0;
            }
            console.log(arcGenerator.centroid(d)); 
            return "translate(" + arcGenerator.centroid(d) + ")"; 
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "black")
        .text(function(d, i){
            if (i == 0){
                console.log(Number.parseFloat((allData[player1][p1_yr]["threePt"]["Make"]/allData[player1][p1_yr]["threePt"]["Total"])*100).toFixed(2).toString());
                return Number.parseFloat((allData[player1][p1_yr]["threePt"]["Make"]/allData[player1][p1_yr]["threePt"]["Total"])*100).toFixed(2).toString();
            }else if (i == 1){
                console.log(Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"]/allData[player1][p1_yr]["twoLong"]["Total"])*100).toFixed(2).toString());
                return Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"]/allData[player1][p1_yr]["twoLong"]["Total"])*100).toFixed(2).toString();
            }else if (i == 2){
                console.log(Number.parseFloat((allData[player1][p1_yr]["twoShort"]["Make"]/allData[player1][p1_yr]["twoShort"]["Total"])*100).toFixed(2).toString());
                return Number.parseFloat((allData[player1][p1_yr]["twoShort"]["Make"]/allData[player1][p1_yr]["twoShort"]["Total"])*100).toFixed(2).toString();
            }
        });*/

    var label0 = d3.select('g').append('text')
        .attr("stroke", 'white')
        .attr("fill", 'white')
        .attr("dy", 35)
        .append("textPath")
        .attr('xlink:href', function (d, i) {
            //return ('#path' + i).toString();
            return '#path0';
        })
        .style("text-anchor", "middle")
        .attr('startOffset', "26.5%")
        .text(function (d, i) {
            if (i == 0) {
                console.log(Number.parseFloat((allData[player1][p1_yr]["threePt"]["Make"] / allData[player1][p1_yr]["threePt"]["Total"]) * 100).toFixed(2).toString());
                return Number.parseFloat((allData[player1][p1_yr]["threePt"]["Make"] / allData[player1][p1_yr]["threePt"]["Total"]) * 100).toFixed(2).toString();
            } else if (i == 1) {
                console.log(Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"] / allData[player1][p1_yr]["twoLong"]["Total"]) * 100).toFixed(2).toString());
                return Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"] / allData[player1][p1_yr]["twoLong"]["Total"]) * 100).toFixed(2).toString();
            } else if (i == 2) {
                console.log(Number.parseFloat((allData[player1][p1_yr]["twoShort"]["Make"] / allData[player1][p1_yr]["twoShort"]["Total"]) * 100).toFixed(2).toString());
                return Number.parseFloat((allData[player1][p1_yr]["twoShort"]["Make"] / allData[player1][p1_yr]["twoShort"]["Total"]) * 100).toFixed(2).toString();
            }
        });

    var label1 = d3.select('g').append('text')
        .attr("stroke", 'white')
        .attr("fill", 'white')
        .attr("dy", 35)
        .append("textPath")
        .attr('xlink:href', function (d, i) {
            //return ('#path' + i).toString();
            return '#path1';
        })
        .style("text-anchor", "middle")
        .attr('startOffset', "27.5%")
        .text(function (d, i) {
            console.log(Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"] / allData[player1][p1_yr]["twoLong"]["Total"]) * 100).toFixed(2).toString());
            return Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"] / allData[player1][p1_yr]["twoLong"]["Total"]) * 100).toFixed(2).toString();
        });

    var label2 = d3.select('g').append('text')
        .attr("stroke", 'white')
        .attr("fill", 'white')
        .attr("dy", 35)
        .append("textPath")
        .attr('xlink:href', function (d, i) {
            //return ('#path' + i).toString();
            return '#path2';
        })
        .style("text-anchor", "middle")
        .attr('startOffset', "27.5%")
        .text(function (d, i) {
            console.log(Number.parseFloat((allData[player1][p1_yr]["twoLong"]["Make"] / allData[player1][p1_yr]["twoLong"]["Total"]) * 100).toFixed(2).toString());
            return Number.parseFloat((allData[player1][p1_yr]["twoShort"]["Make"] / allData[player1][p1_yr]["twoShort"]["Total"]) * 100).toFixed(2).toString();
        });

    var box = d3.select('g')
        .append('rect')
        .attr('x', -37.5)
        .attr('y', -95)
        .attr('width', 75)
        .attr('height', 95)
        .attr('fill', 'transparent')
        .attr('stroke', 'white');

    var court = d3.select('g')
        .append('rect')
        .attr('x', -200)
        .attr('y', -400)
        .attr('width', 400)
        .attr('height', 400)
        .attr('fill', 'transparent')
        .attr('stroke', 'black');

    var title = d3.select('g')
        .append('text')
        .attr('x', 0)
        .attr('y', -220)
        .attr('stroke', 'black')
        .style("text-anchor", "middle")
        .attr('startOffset', '50%')
        .text(player1);


}

function drawTwoPlayers(player1, p1_yr, player2, p2_yr) {
    console.log(player1);
    console.log(player2);

    const players = [{ 'Name': player1, 'Year': p1_yr }, { 'Name': player2, 'Year': p2_yr }];
    updatePlayerStats(players);

    var svg = d3.select("svg");
    svg.selectAll('path').remove();
    svg.selectAll('text').remove();

    var arcData = [

        { startAngle: -Math.PI / 2, endAngle: 0, innerRadius: 140, outerRadius: 200 },
        { startAngle: 0, endAngle: Math.PI / 2, innerRadius: 140, outerRadius: 200 },
        { startAngle: -Math.PI / 2, endAngle: 0, innerRadius: 70, outerRadius: 140 },
        { startAngle: 0, endAngle: Math.PI / 2, innerRadius: 70, outerRadius: 140 },
        { startAngle: -Math.PI / 2, endAngle: 0, innerRadius: 20, outerRadius: 70 },
        { startAngle: 0, endAngle: Math.PI / 2, innerRadius: 20, outerRadius: 70 }

    ];

    var arcGenerator = d3.arc();

    var arc = d3.select('g')
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

    var box = d3.select('g')
        .append('rect')
        .attr('x', -37.5)
        .attr('y', -95)
        .attr('width', 75)
        .attr('height', 95)
        .attr('fill', 'transparent')
        .attr('stroke', 'white');

    var court = d3.select('g')
        .append('rect')
        .attr('x', -200)
        .attr('y', -400)
        .attr('width', 400)
        .attr('height', 400)
        .attr('fill', 'transparent')
        .attr('stroke', 'black');

    var title = d3.select('g')
        .append('text')
        .attr('x', -100)
        .attr('y', -220)
        .attr('stroke', 'black')
        .style("text-anchor", "middle")
        .text(player1);

    var title2 = d3.select('g')
        .append('text')
        .attr('x', 100)
        .attr('y', -220)
        .attr('stroke', 'black')
        .style("text-anchor", "middle")
        .text(player2);
}

function drawThreePlayers(player1, p1_yr, player2, p2_yr, player3, p3_yr) {
    console.log(player1);
    console.log(player2);
    console.log(player3);

    const players = [{ 'Name': player1, 'Year': p1_yr }, { 'Name': player2, 'Year': p2_yr }, { 'Name': player3, 'Year': p3_yr }];
    updatePlayerStats(players);

    var svg = d3.select("svg");
    svg.selectAll('path').remove();
    svg.selectAll('text').remove();

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

    var arc = d3.select('g')
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

    var box = d3.select('g')
        .append('rect')
        .attr('x', -37.5)
        .attr('y', -95)
        .attr('width', 75)
        .attr('height', 95)
        .attr('fill', 'transparent')
        .attr('stroke', 'white');

    var court = d3.select('g')
        .append('rect')
        .attr('x', -200)
        .attr('y', -400)
        .attr('width', 400)
        .attr('height', 400)
        .attr('fill', 'transparent')
        .attr('stroke', 'black');

    var title1 = d3.select('g')
        .append('text')
        .attr('x', -250)
        .attr('y', -100)
        .attr('stroke', 'black')
        .style("text-anchor", "middle")
        .text(player1);

    var title2 = d3.select('g')
        .append('text')
        .attr('x', 0)
        .attr('y', -220)
        .attr('stroke', 'black')
        .style("text-anchor", "middle")
        .text(player2);

    var title3 = d3.select('g')
        .append('text')
        .attr('x', 250)
        .attr('y', -100)
        .attr('stroke', 'black')
        .style("text-anchor", "middle")
        .text(player3);

}