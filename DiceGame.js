"use strict"
//Variables
var currentRound = 1;
var listOfPlayers;
var listOfAllRolls = new Array

//Buttons

document.getElementById("start-game").onclick = function() {
    document.getElementById("start-game").style.display = "none";
    StartGame();
    
}

document.getElementById("roll-dice").onclick = function() {
    if(currentRound != 6) {
    RollDice(listOfPlayers);    
    document.getElementById("roll-dice").style.display = "none";
    document.getElementById("next-round").style.display = "block";
    }
    else{
        FinalShootout(listOfPlayers);
    }

    
    
}

document.getElementById("next-round").onclick = function(){
    NextRound();
    document.getElementById("roll-dice").style.display = "block";
    document.getElementById("next-round").style.display = "none";
    
}


//Calling Methods
function StartGame(){
    listOfPlayers = NamePlayers();
    DisplayNames(listOfPlayers)
    DisplayRound(currentRound);
    DisplayRollButton();
    PlayersLeft(listOfPlayers);
}

function NextRound() {    
    RemoveLoosers(listOfPlayers);
    currentRound++;
    ClearRolls(listOfPlayers)
    DisplayNames(listOfPlayers);
    DisplayRound(currentRound);
    PlayersLeft(listOfPlayers);
}

//Defining Methods

function NamePlayers() {
    let playerArray = new Array();

    for (let i = 0; i < 10; i++) {

        let playerName = prompt("Player " + (i + 1) + ", pelase type your name...");
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

    //for (let i = 0; i < listOfPlayers.length; i++){
        listOfPlayers.forEach(element => {
        
    

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
        document.getElementById("r" + element.rollId).innerHTML = pick;        
        element.roll = pick;
    });
   
}

function RemoveLoosers(listOfPlayers){

    if(currentRound < 4){
        listOfPlayers.sort(function(a, b){return a.roll - b.roll});
        listOfPlayers.splice(0,2);
        listOfPlayers.sort(function(a, b){return a.nameId - b.nameId});
    } else if (currentRound > 3 && currentRound < 6){
        listOfPlayers.sort(function(a, b){return a.roll - b.roll});
        listOfPlayers.splice(0,1);
        listOfPlayers.sort(function(a, b){return a.nameId - b.nameId});
    } else {
        FinalShootout();
    }
    
}

function ClearRolls(listOfPlayers){

    listOfPlayers.forEach(element => {
        element.roll = 0;
    });
}

function FinalShootout(listOfPlayers){
    let foundWinner = false;
    let player1Points = 0;
    let player2Points = 0;
    

    while(!foundWinner){
        RollDice(listOfPlayers);
        if(listOfPlayers[0].roll > listOfPlayers[1].roll) {
            player1Points++;
        } else if(listOfPlayers[0].roll < listOfPlayers[1].roll) {
            player2Points++;
        }

        if(player1Points == 3){
            foundWinner = true;
            alert("The WINNER of the Final Dice Shootout is " + listOfPlayers[0].name);
        } else if (player2Points == 3){
            foundWinner = true;
            alert("The WINNER of the Final Dice Shootout is " + listOfPlayers[1].name);
        }

    }
    location.reload();
}

function PlayersLeft(listOfPlayers) {
    let quantity = listOfPlayers.length;
    document.getElementById("players-left").innerHTML = quantity;
}


