// d3.json("test_data.json", parseData);
d3.json("test_data.json", parseData);

// global variables to store data
var playerNames = [];
var allData = {};
var numPlayers = 1;

function parseData(error, data) {
    allData = data;
    for (const [key, value] of Object.entries(data)) {
        playerNames.push(key)
    }
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
    console.log(document.getElementById(data).value)
    var div = document.getElementById('div' + data.originalTarget.id);

    if (playerNames.indexOf(data.data) > -1) {
        var select = document.createElement('select');
        select.setAttribute('id', 'select' + data.originalTarget.id);

        for (const [key, value] of Object.entries(allData[data.data])) {
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
            document.getElementById('select' + data.originalTarget.id).remove();
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

    // create input text element
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'player' + intValue);
    input.setAttribute('class', 'playerInput');
    input.setAttribute('list', 'datalist1');
    input.setAttribute('onchange', 'addYear("player' + intValue + '")');

    //document.getElementById('datalists').appendChild(input);
    div.appendChild(input);
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
            drawSinglePlayer(playerOption1, p1_yr);
            break;
        case 2:
            playerOption1 = document.getElementById('player1').value;
            playerOption2 = document.getElementById('player2').value;
            p1_yr = document.getElementById('selectplayer1').value;
            p2_yr = document.getElementById('selectplayer2').value;
            drawTwoPlayers(playerOption1, p1_yr, playerOption2, p2_yr);
            break;
        case 3:
            playerOption1 = document.getElementById('player1').value;
            playerOption2 = document.getElementById('player2').value;
            playerOption3 = document.getElementById('player3').value;
            p1_yr = document.getElementById('selectplayer1').value;
            p2_yr = document.getElementById('selectplayer2').value;
            p3_yr = document.getElementById('selectplayer3').value;
            drawThreePlayers(playerOption1, p1_yr, playerOption2, p2_yr, playerOption3, p3_yr);
            break;
    }
}

function drawSinglePlayer(player1, p1_yr) {
    console.log(player1);

    var svg = d3.select("svg");
    svg.selectAll('path').remove();

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

function drawTwoPlayers(player1, p1_yr, player2, p2_yr) {
    console.log(player1);
    console.log(player2);

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
}

function drawThreePlayers(player1, p1_yr, player2, p2_yr, player3, p3_yr) {
    console.log(player1);
    console.log(player2);
    console.log(player3);

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

}