"use strict"
//Variables
var currentRound = 1;
var listOfPlayers;
var listOfAll

//Buttons

document.getElementById("start-game").onclick = function() {
    document.getElementById("start-game").style.display = "none";
    StartGame();
    
}

document.getElementById("roll-dice").onclick = function() {
    RollDice(listOfPlayers);

    document.getElementById("roll-dice").style.display = "none";
    document.getElementById("next-round").style.display = "block";
    
    
}

document.getElementById("next-round").onclick = function(){
    NextRound();
}


//Calling Methods
function StartGame(){
    listOfPlayers = NamePlayers();
    DisplayNames(listOfPlayers)
    DisplayRound(currentRound);
    DisplayRollButton();
}

function NextRound() {
    currentRound++;
    RemoveLoosers(listOfPlayers);
    ClearRolls(listOfPlayers)
    DisplayNames(listOfPlayers);
    DisplayRound(currentRound);
}

//Defining Methods

function NamePlayers() {
    let playerArray = new Array();

    for (let i = 1; i <= 10; i++) {

        let playerName = prompt("Player " + i + ", pelase type your name...");
        if (playerName != undefined){
        var player = {

            nameId: i,
            name: playerName,
            rollId: i,
            roll: 0,

        } 
    } else {

        var player = {
           
            nameId: i,
            name:  i,   
            rollId: i,
            roll: 0,

        } 
    }

    playerArray.push(player);

    }
    return playerArray;
}

function DisplayNames(listOfPlayers) {

    let html = "";

  listOfPlayers.forEach(element => {      
      html += '<p id="n' + element.nameId + '">';
      html +=  element.name + '</p>';
      html += '<p id="r' + element.rollId + '">';
      html += element.roll + '</p><hr />';
  }); 

  document.getElementById("players").innerHTML = html;
}

function DisplayRound(currentRound) {    

    document.getElementById("round").innerHTML = currentRound;
}

function DisplayRollButton(){
    document.getElementById("roll-dice").style.display = "block";
}

function RollDice(listOfPlayers) {

    for (let i = 1; i < listOfPlayers.length; i++){

        let listOfRolls = new Array();
        let d20;
        let d4;
        let pick;

        for (let j = 0; j < 4; j++){
            d20 = Math.floor((Math.random()*20)+1);
            listOfRolls.push(d20);
        }

        d4 = Math.floor((Math.random()*3));
        pick = listOfRolls[d4];

        document.getElementById("r" + i).innerHTML = pick;
        listOfRolls[i].roll = pick;
    }   
    
    document.getElementById("next-round").style.display = "block";
}

function RemoveLoosers(listOfPlayers){

    if(currentRound < 4){
        listOfPlayers.sort(function(a, b){return b.roll - a.roll});
        listOfPlayers.splice(0,2);
    } else if (currentRound > 3 && currentRound < 6){
        listOfPlayers.sort(function(a, b){return b.roll - a.rol});
        listOfPlayers.splice(0,);
    } else {

    }
    
}

function ClearRolls(listOfPlayers){

    listOfPlayers.forEach(element => {
        
    });
}


