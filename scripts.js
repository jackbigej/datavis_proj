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

    // create datalist entries
    var d1 = document.createElement('datalist');
    var d2 = document.createElement('datalist');
    var d3 = document.createElement('datalist');
    var d4 = document.createElement('datalist');
    var d5 = document.createElement('datalist');
    var d6 = document.createElement('datalist');

    for (let i = 0; i < playerNames.length; i++) {
        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');
        var option4 = document.createElement('option');
        var option5 = document.createElement('option');
        var option6 = document.createElement('option');
        option1.value = playerNames[i];
        option2.value = playerNames[i];
        option3.value = playerNames[i];
        option4.value = playerNames[i];
        option5.value = playerNames[i];
        option6.value = playerNames[i];
        d1.appendChild(option1);
        d2.appendChild(option2);
        d3.appendChild(option3);
        d4.appendChild(option4);
        d5.appendChild(option5);
        d6.appendChild(option6);
    }
    // append to first input
    d1.id = 'datalistOne1';
    document.getElementById('firstPlayer1').appendChild(d1);

    // append to second input
    d2.id = 'datalistTwo1';
    document.getElementById('secondPlayer1').appendChild(d2);
    d3.id = 'datalistTwo2';
    document.getElementById('secondPlayer2').appendChild(d3);

    // append to third input
    d4.id = 'datalistThree1';
    document.getElementById('thirdPlayer1').appendChild(d4);
    d5.id = 'datalistThree2';
    document.getElementById('thirdPlayer2').appendChild(d5);
    d6.id = 'datalistThree3';
    document.getElementById('thirdPlayer3').appendChild(d6);
}

function displayVisual() {
    // read radio button
    var radioBtn = document.getElementsByName('numPlayers');
    var radioBtnValue;

    for (let i = 0; i < radioBtn.length; i++) {
        if (radioBtn[i].checked) {
            radioBtnValue = radioBtn[i].value;
        }
    }

    // read player options
    let playerOption1 = '';
    let playerOption2 = '';
    let playerOption3 = '';
    switch (radioBtnValue) {
        case 'one':
            playerOption1 = document.getElementById('firstPlayer1').value;
            drawSinglePlayer(playerOption1);
            break;
        case 'two':
            playerOption1 = document.getElementById('secondPlayer1').value;
            playerOption2 = document.getElementById('secondPlayer2').value;
            drawTwoPlayers(playerOption1, playerOption2);
            break;
        case 'three':
            playerOption1 = document.getElementById('thirdPlayer1').value;
            playerOption2 = document.getElementById('thirdPlayer2').value;
            playerOption3 = document.getElementById('thirdPlayer3').value;
            drawThreePlayers(playerOption1, playerOption2, playerOption3);
            break;
    }
}

function drawSinglePlayer(player1) {
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

function drawTwoPlayers(player1, player2) {
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

function drawThreePlayers(player1, player2, player3) {
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