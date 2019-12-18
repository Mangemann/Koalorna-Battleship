

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