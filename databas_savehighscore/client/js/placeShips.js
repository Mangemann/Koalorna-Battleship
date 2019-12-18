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