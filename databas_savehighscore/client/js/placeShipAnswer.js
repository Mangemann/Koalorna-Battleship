
//Updaterade funktionen för funktionen frågar fortfarande efter alla båtar placerades.
function placeShipAnswer(){

    if(answer == true){
        if (destroyerCounter !== 1 && submarineCounter !== 1 && cruiserCounter !== 1 && battleshipCounter !== 1){
            answer = confirm('Vill du placera ut en båt till?')}
        else if (destroyerCounter == 1 && submarineCounter == 1 && cruiserCounter == 1 && battleshipCounter == 1){
            alert('Du har inga fler båtar att placera ut')
            document.getElementById("x-coord").value = ''
            document.getElementById("y-coord").value = ''
        }
        else {}
    }

    if(answer == false){
        aiNumHitsToWin = getNumberOfShipsOnPlayerMap(playermap)
        aiPlaceShips()
        numHitsToWin = getNumberOfShipsOnAiMap(aimap)
    }
}