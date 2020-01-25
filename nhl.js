var Http = new XMLHttpRequest();
var url = 'https://nhl-score-api.herokuapp.com/api/scores/latest';

Http.open("GET", url);
Http.send();

showGames = 6
currentSpot = 0
interval = 20000

setInterval(update, interval);
    function update() {
    var allGames = JSON.parse(Http.responseText)["games"];
    if (allGames.length <= 0) {
        console.log("0 games")
        interval = 10000
        var i;
        for(i=1;i<7;i++){
        document.getElementById("awayTeam" + i.toString()).innerHTML = "---";
        document.getElementById("homeTeam" + i.toString()).innerHTML = "---";
        document.getElementById("awayScore" + i.toString()).innerHTML = "-";
        document.getElementById("homeScore" + i.toString()).innerHTML = "-";
        document.getElementById("timeRemaining" + i.toString()).innerHTML = "0:00";
        document.getElementById("periodNum" + i.toString()).innerHTML = "-";
        }
        return
    }
    var games = JSON.parse(allGames)["games"];
    var numGames = Object.keys(games).length
    if (numGames <= 0) {
        return
    }

    for (i = 0; i < showGames; i++) {
        if (currentSpot >= numGames) {
        currentSpot = 0
        }
        getScores(currentSpot, games, i)
        currentSpot += 1;
    }
}
function getScores(currentSpot, games, position) {
    var game = games[currentSpot]
    var homeTeam = "---"
    var awayTeam = "---"
    var homeScore = "-"
    var awayScore = "-"
    var timeRemaining = "0:00"
    var periodNum = 0
    var isOvertime = false
    var isShootout = false

    // Team names
    homeTeam = game["teams"]["home"]["abbreviation"]
    awayTeam = game["teams"]["away"]["abbreviation"]

    // Scores
    homeScore = game["scores"][homeTeam]
    awayScore = game["scores"][awayTeam]

    // Overtime and Shootout
    if (game["scores"]["overtime"] == true) {
        isOvertime = true
    }
    if (game["scores"]["shootout"] == true) {
        isShootout = true
    }

    // Time and Period
    if (game["status"]["state"] === "LIVE") {
        timeRemaining = game["status"]["progress"]["currentPeriodTimeRemaining"]["pretty"]
        period = game["status"]["progress"]["currentPeriodOrdinal"]
    } else if (game["status"]["state"] === "FINAL") {
        timeRemaining = "FINAL"
        period = "---"
    } else if (game["status"]["state"] === "PREVIEW") {
        timeRemaining = "20:00"
        period = "1st"
    } else {
        timeRemaining = "Error"
        period = "Err"
    }

    position = position + 1
    var posStr = position.toString()
    document.getElementById("awayLogo" + posStr).src = "logos/"+awayTeam+".svg"; 
    document.getElementById("homeLogo" + posStr).src = "logos/"+homeTeam+".svg"; 
    document.getElementById("awayTeam" + posStr).innerHTML = awayTeam;
    document.getElementById("homeTeam" + posStr).innerHTML = homeTeam;
    document.getElementById("awayScore" + posStr).innerHTML = awayScore;
    document.getElementById("homeScore" + posStr).innerHTML = homeScore;
    document.getElementById("timeRemaining" + posStr).innerHTML = timeRemaining;
    document.getElementById("periodNum" + posStr).innerHTML = periodNum;

    var periodNum = timeRemaining = game["status"]["progress"]["currentPeriod"]
    if(periodNum>3){
        document.getElementById("timeBox" + posStr).style.backgroundColor = "#962715"
    }

    var minsRemaining = game["status"]["progress"]["currentPeriodTimeRemaining"]["min"]
    if(Math.abs(awayScore-homeScore)<=1 && periodNum==3 && minsRemaining <= 5){
        document.getElementById("timeBox" + posStr).style.backgroundColor = "#FF8D3F"
    }
}