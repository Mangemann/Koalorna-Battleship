
//Så här stora ska rutorna vara på spelplanen
let squareSize = 55;

let x;
let y;
let numHitsToWin = 0
let aiNumHitsToWin = 0
let playerCounter = 0
let start;


/*
 *
 * id = "s78"
 * y = id[1];
 * x = id[2];
 * s-4-7
 * s-11-15  
 * Detta är vår spelplan. Den motsvaras av en helt vanlig array med siffror i.
 * Siffran 0 betyder att där finns vatten.
 * Siffran 1 betyder att där finns ett (hemligt!) skepp som ska sänkas. Alltså, från början är det hemligt för spelaren...
 *
 * Varje ruta på spelplanen har ett eget id som motsvarar ett index i den här arrayen.
 * <div id=0 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=1 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=2 class="square"><img src="water.jpg" width="50"/></div>
 */
//let name = prompt('Vad heter du?')
 let length = prompt('Hur många rader vill du ha?')
let width = prompt('hur många kolumner vill du ha?')
startGame();

function startGame(){
    start = confirm('Vad vill du spela mot? [Avbryt] Easy AI [OK] Hard AI');
    console.log ("selected" + start);
    if (start === true){
        $("#vilkenAI").text("Du spelar mot Hard AI nu.")
    } else {
        $("#vilkenAI").text("Du spelar mot Easy AI nu.")
    }
    
}

let playermap = createGrid(length, width)
let aimap = createGrid(length, width)

function createGrid(rows, cols) {

    //skapar basic array
    var array = [];
    for (var i = 0; i < rows; i++) {
        //här deklareras att varje element i arrayen ska vara en array
        array[i] = [];

        for (var j = 0; j < cols; j++) {
            array[i][j] = 0;
        }
    }

    return array;

}


//Leta upp HTML-elementet med id = "status". 
function updateStatus(newStatusText){
    $("#status").text(newStatusText);  //Sätt en ny text där: T ex: "Tyvärr, du missade! Skjut igen!"
}

//När man har träffat alla skeppsrutor har man vunnit...
//Så många skeppsrutor finns det på kartan?... vi kollar... 

//Bygg upp kartan på spelplanen. Det börjar med vatten överallt.
buildMapPlayer(length, width);
buildMapAi(length, width);
let answer = false
let ai = 0

while(answer == false){

    alert('Placera ut en båt genom att mata in koordinater i rutorna och trycka på "Go".')
    answer = true

}

function placeShipAnswer(){

    if(answer == true){
        
        answer = confirm('Vill du placera ut en båt till?')
        if(answer == false){
            aiNumHitsToWin = getNumberOfShipsOnPlayerMap(playermap)
            aiPlaceShips()
            numHitsToWin = getNumberOfShipsOnAiMap(aimap)
        }

    }
}

function someFunction(){
    placeShips()
    placeShipAnswer()
}

function playerEasyAI(){
    //alert("Easy AI is playing")

    //randomiserad skjutning
    nedskjutningsvariabelY = Math.floor((Math.random()*100) % length);
    nedskjutningsvariabelX = Math.floor((Math.random()*100) % width);

 
    gissning = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY];

    //här jämförs det om man redan skjutit på en specifik punkt. 
//ett meddelande kommer då. 
    if (playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "*" || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "X"){
        playerEasyAI()

    } 
    else if (playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] != '0'){

        playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "*";
        a = nedskjutningsvariabelX.toString()
        b = nedskjutningsvariabelY.toString()
        c = a + b
        document.getElementById(`${c}`).src = "ship.jpg"

        //alert("Easy AI : träff");
        document.getElementById(`${c}`).src = "playerboatHit.jpg"
        aiNumHitsToWin--
        //console.log(gameGrid);
        //console.log(shipGrid);
    }
    else {
        a = nedskjutningsvariabelX.toString()
        b = nedskjutningsvariabelY.toString()
        c = a + b
        playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "X";
        document.getElementById(`${c}`).src = "AImiss.jpg"
        
        //alert("Easy AI : miss");
        //console.log(gameGrid);
        //console.log(shipGrid);
    }
    if (aiNumHitsToWin < 1){

        alert('AI vann detta spelet, men bra kämpat!')

    }
}


/*
 * När vi klickar på ett element som har class="square", anropa då funktionen som heter shoot()!
 */
$(".aisquare").click(shoot);
//$(button).click(getCoords);



/*
 * Någon skjuter på en ruta.
 * Vi använder $(this) för att få reda på vilken ruta.
 * Vi använder $(this).attr('id') för att få reda på vilket ID rutan har.
 * Varje ruta har ett eget id som motsvarar ett index i arrayen map.
 */
function shoot(){
    console.log("shoot!");

    //Vilket id är det på den rutan vi just nu har skjutit på... 
    let id1 = $(this).attr('id1');
    let id2 = $(this).attr('id2');
    //console.log(aiNumHitsToWin + ' ' + numHitsToWin)
    //console.log(id);
    //console.log(destroyerarray)
    //console.log(submarinearray)
    //console.log(cruiserarray)
    //console.log(battleshiparray)
    //console.log('box coords', x + y)


    //Kolla om den här platsen på kartan innehåller 1. Då är det ett skepp! 
    //T ex... ifall id är 7, då är det index = 7 i arrayen, alltså map[7].
    if (aimap[id1][id2] != '0' && aimap[id1][id2] != '*'  && aimap[id1][id2] != 'X'){
        aimap[id1][id2] = '*'
        //Ja, det var ett skepp!  
        $(this).html(`<img src="ship.jpg" width="${squareSize}" height="${squareSize}"/>`);  //Uppdatera bilden till ett skepp!
        updateStatus("Träff! Skjut igen!"); //Uppdatera status-texten.
        checkSunkenShips(id1, id2)
        numHitsToWin--; //Vi kommer ett steg närmare att vinna!
    }
    else if(aimap[id1][id2] == '0'){
        aimap[id1][id2] = 'X'
        $(this).html(`<img src="miss.jpg" width="${squareSize}" height="${squareSize}"/>`);
        updateStatus("Tyvärr, du missade. Skjut igen!");
    }
    else{
        updateStatus("Du har redan skjutit här! Försök en annan plats!");
    }

    if (numHitsToWin<=0){
        updateStatus("Grattis, du har klarat spelet!")
        alert('Grattis! Du har sänkt alla skepp!')
        //createPlayer('JEns', '4')
    }

    chooseAI()

}

function calculateMaxScore(mapToCheck, length, width){
    let maxScoreOfMapMinusBoats = 0;

    for(i=0; i < length; i++){

        for(j=0; j < width; j++){

            if(mapToCheck[i][j] != '0'){

                maxScoreOfMapMinusBoats = maxScoreOfMapMinusBoats -15;

            }

            else{

                maxScoreOfMapMinusBoats = maxScoreOfMapMinusBoats + 100

            }

        }

    }

    /* 
    Räknar ut ett värde på spelplanen beroende på storlek
    och hur många båtar som är utplacerade. Detta ska göras direkt efter alla båtar
    är utplacerade, innan man börjar skjuta. Det som returnas ska sparas i
    en variabel som sedan kommer behövas i funktionen calculatePlayerScore.
    */
    return maxScoreOfMapMinusBoats;
    

}

function calculateScore(maxHighScore, missedShots){

    let playerScore = maxHighScore
    playerScore = playerScore - missedShots * 2

    return playerScore;

    /*här behöver vi skapa en counter i shoot() funktionen som ökar en counter när spelare
    missar. Denna counter + maxHighScore ska med i funktionen när vi kallar på den.
    MaxhighScore får vi av funktionen calculateMaxScore. Denna funktionen ska 
    kallas på när alla skepp är sänkta på någon spelares spelplan.
    */


}

//updateSquare(5, "ship.jpg")

function checkPlacement(playermap, x1, y1, x2, y2) {
    let counter = 0
    let length = x2+1
    let width = y2+1
    for( i = x1; i<length; i++){
        for(j = y1; j< width; j++){
            if(playermap[i][j] != '0'){
                counter++
            }
        }

       
    }
    if(counter>0){
        return true;
    }
    else{
        return false;
    }
}

function playerEasyAI() {
    
    //randomiserad skjutning
    nedskjutningsvariabelY = Math.floor((Math.random() * 100) % length);
    nedskjutningsvariabelX = Math.floor((Math.random() * 100) % width);

    //här jämförs det om man redan skjutit på en specifik punkt. 
    //ett meddelande kommer då. 

    let hasAlreadyTried = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "X"
        || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "*";

    if (hasAlreadyTried) {
        playerEasyAI()

    }
    let didHitShip = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'S'
        || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'D'
        || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'C'
        || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'B';

    if (didHitShip) {

        playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "*";
        a = nedskjutningsvariabelX.toString()
        b = nedskjutningsvariabelY.toString()
        c = a + b

        document.getElementById(`${c}`).src = "playerboatHit.jpg"
        aiNumHitsToWin--

    }

    else {
        a = nedskjutningsvariabelX.toString()
        b = nedskjutningsvariabelY.toString()
        c = a + b
        playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "X";
        document.getElementById(`${c}`).src = "AImiss.jpg"

    }
    if (aiNumHitsToWin < 1) {

        alert('Du förlorar!')

    }
}

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

// Ta med typ av skepp till variable "boat"
var boat;

$(`#chooseShip`).change(function () {
    let select = $(this).get(0);
    boat = select.options[select.selectedIndex].value;
    //boatOption = $(".chooseShip option:selected").val();
    console.log(boat);
})


// Skape en till funktion så att man kan välja en av olika skepp som man vill oavsett ordning.
// Väljer vilken båt genom "placeShips()" och sen gå genom nästa funktion enligt båt typ.
function placeShips() {

    console.log ("placeShips " + boat);

    switch (boat){
        case "destroyerOpt":
        placeShipsDestroyer();
        console.log ("switch destroyer");
        break;

        case "submarineOpt":
        placeShipsSubmarine();
        console.log ("switch submarine");
        break;

        case "cruiserOpt":
        placeShipsCruiser();
        console.log ("switch cruise");
        break;

        case "battleshipOpt":
        placeShipsBattleship();
        console.log ("switch battle ship");
        break;
    }
}


function placeShipsDestroyer(){
    console.log ("placeShipsDestroyer");

    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined' || document.getElementById("x-coord2").value == 'undefined' || document.getElementById("y-coord2").value =='undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);

            if (destroyerCounter < 1) {

                
                
                // Lägger in ikonen för båten på de tidigare bestämda platserna
                 if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                     else{
                    let destroyer = x1 + 2;
                    destroyerCounter++;
                    båtcounter++;
                    for(let i =x1; i<destroyer ;i++){
                        playermap[i].splice(y1,1,"D"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        destroyerarray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let destroyer = y1 + 2;
                    playermap[x1].fill("D", y1, destroyer);
                    destroyerCounter++;
                    båtcounter++
                    for (let i = y1; i < destroyer; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
                }
            }
        }
    }
    document.getElementById("destroyer").style.visibility = "hidden";
    aiPlaceShips();
}
           

function placeShipsSubmarine(){
    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);
            if (submarineCounter < 1) {

                
                // Lägger in ikonen för båten på de tidigare bestämda platserna
                
               // else if (checkPlacement(playermap, submarine, y, x)) {
        
                 //   alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
        
                //}
                if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                     }
                     else{
                    let submarine = x1 + 3;
                    submarineCounter++;
                    båtcounter++;
                    for(let i =x1; i<submarine ;i++){
                        playermap[i].splice(y1,1,"S"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        submarinearray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let submarine = y1 + 3;
                    playermap[x1].fill("S", y1, submarine);
                    submarineCounter++;
                    båtcounter++
                    for (let i = y1; i < submarine; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
                }
            }
        }
    }
    document.getElementById("submarine").style.visibility = "hidden";
    aiPlaceShips();
}
    


function placeShipsCruiser(){
    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);


            if (cruiserCounter < 1) {

                
                if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                     }
                     else{
                    let cruiser = x1 + 4;
                    cruiserCounter++;
                    båtcounter++;
                    for(let i =x1; i<cruiser ;i++){
                        playermap[i].splice(y1,1,"S"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        cruiserarray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let cruiser = y1 + 4;
                    playermap[x1].fill("S", y1, cruiser);
                    cruiserCounter++;
                    båtcounter++
                    for (let i = y1; i < cruiser; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
            }
            }
        }
    }
    document.getElementById("cruiser").style.visibility = "hidden";
    aiPlaceShips();
}
    
          
function placeShipsBattleship(){
    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);


            if (battleshipCounter < 1) {

                
                if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                     }
                     else{
                    let battleship = x1 + 5;
                    battleshipCounter++;
                    båtcounter++;
                    for(let i =x1; i<battleship ;i++){
                        playermap[i].splice(y1,1,"S"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        battleshiparray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let battleship = y1 + 5;
                    playermap[x1].fill("S", y1, battleship);
                    battleshipCounter++;
                    båtcounter++
                    for (let i = y1; i < battleship; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
            }
            }
        }
    }
    document.getElementById("battleship").style.visibility = "hidden";
    aiPlaceShips();
}

let lastGuessWasHit;
let lastGuessX;
let lastGuessY;

function playerHardAI() {


    //randomiserad skjutning
    if (lastGuessWasHit) {

        fireNearby()

    }
    else {
        nedskjutningsvariabelY = Math.floor((Math.random() * 100) % length);
        nedskjutningsvariabelX = Math.floor((Math.random() * 100) % width);



        let hasAlreadyTried = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "X"
            || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "*";


        //här jämförs det om man redan skjutit på en specifik punkt. 
        //ett meddelande kommer då. 

        if (hasAlreadyTried) {
            console.log("try again");
            playerHardAI()

        }
        
        let didHitShip = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'S'
                        ||playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'D'
                        ||playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'C'
                        ||playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'B';

        lastGuessX = nedskjutningsvariabelX;
        lastGuessY = nedskjutningsvariabelY;
        lastGuessWasHit = didHitShip;

        if (didHitShip) {

            a = nedskjutningsvariabelX.toString()
            b = nedskjutningsvariabelY.toString()
            c = a + b
            playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "*";

            document.getElementById(`${c}`).src = "playerboatHit.jpg"
            aiNumHitsToWin--

        }
        else {
            a = nedskjutningsvariabelX.toString()
            b = nedskjutningsvariabelY.toString()
            c = a + b
            playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "X";
            document.getElementById(`${c}`).src = "AImiss.jpg"


        }
        if (aiNumHitsToWin < 1) {

            alert('AI vann detta spelet, men bra kämpat!')

        }

    }

}

function fireNearby() {

    let guessX;
    let guessY;

     
    if (lastGuessY < length - 1 && playermap[lastGuessX][lastGuessY + 1] != "X"
        && playermap[lastGuessX][lastGuessY + 1] != "*") {

        guessX = lastGuessX;
        guessY = lastGuessY + 1;

    }
    else if (lastGuessY > 0 && playermap[lastGuessX][lastGuessY - 1] != "X"
        && playermap[lastGuessX][lastGuessY - 1] != "*") {

        guessX = lastGuessX;
        guessY = lastGuessY - 1;

    }
    else if (lastGuessX > 0 && playermap[lastGuessX - 1][lastGuessY] != "X"
        && playermap[lastGuessX - 1][lastGuessY] != "*") {

        guessX = lastGuessX - 1;
        guessY = lastGuessY;
    }
    else if (lastGuessX < width - 1 && playermap[lastGuessX + 1][lastGuessY] != "X"
        && playermap[lastGuessX + 1][lastGuessY] != "*") {

        guessX = lastGuessX + 1;
        guessY = lastGuessY;

    }
    else {

        lastGuessWasHit = false;
        playerEasyAI();
    }
    if (playermap[guessX][guessY] == 'S'
        || playermap[guessX][guessY] == 'D'
        || playermap[guessX][guessY] == 'C'
        || playermap[guessX][guessY] == 'B'){

        playermap[guessX][guessY] = "*";
        a = guessX.toString()
        b = guessY.toString()
        c = a + b

        document.getElementById(`${c}`).src = "playerboatHit.jpg"
        aiNumHitsToWin--;

        lastGuessX = guessX;
        lastGuessY = guessY;

    }
    else {
        a = guessX.toString()
        b = guessY.toString()
        c = a + b
        playermap[guessX][guessY] = "X";
        document.getElementById(`${c}`).src = "AImiss.jpg"

        lastGuessWasHit = false;

    }

}
function chooseAI(){
    if (start === true){
        console.log ("Du spelar mot Hard AI");
        playerHardAI();
      
    } else {
        console.log ("Du spelar mot Easy AI");
        playerEasyAI();
    }
    }
