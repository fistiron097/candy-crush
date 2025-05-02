let candies = ["Blue","Orange","Green","Yellow","Red","Purple"];
let board=[];
let row = 9
let column = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function(){
    startGame();

    window.setInterval(function(){
        crushCandy();
        slidecandy();
        generateCandy();
    },100);

}
// return krega single candies
function randomCandy(){
    return candies[Math.floor(Math.random()* candies.length)];// candies.length ki jagah we can use 3 also
}

function startGame(){
    for(let r=0; r< row; r++){
        let row = []; // every row ke liye new array creation
        for(let c = 0; c < column; c++){
            let tile = document.createElement("img");
            tile.id = r.toString()+"-"+c.toString();// co-ordinates le liye 
            tile.src ="./images/" + randomCandy()+".png";

            // drag functionality
            tile.addEventListener("dragstart",dragStart);// 
            tile.addEventListener("dragover", dragOver);//
            tile.addEventListener("dragenter",dragEnter);//
            tile.addEventListener("dragleave", dragLeave);//
            tile.addEventListener("drop",dragDrop);//
            tile.addEventListener("dragend",dragEnd);//
        
            document.getElementById("board").append(tile);//handles Ui without this we cannot display our tiles 
            row.push(tile);
        }
        board.push(row);// internal logic for manipultating tiles or creating 2D array 
    }
    console.log(board);
}

function dragStart(){
    currTile = this; //which tile you want to move is that 
    console.log("Current tile ye hai "+currTile);
}
function dragOver(e){
    e.preventDefault();
}
function dragEnter(e){
    e.preventDefault();
}

function dragLeave(e){
    e.preventDefault();
}

function dragDrop(){
    // this refers to the target tile that was dropped on (Ye apne browser ko pta hai ki ye This konsa hai )
    otherTile = this; // target tile
    console.log("Other tile ye hai"+otherTile);
}
function dragEnd(){

    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]); 
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    // basic operation

    // moving left
    let moveLeft = c2 == c-1 && r == r2;

    // moving right
    let moveRight = c2 == c+1 && r == r2;

    // move up
    let moveUp = r2 == r-1 && c2 ==c;
    // move down
    let moveDown = r2 == r+1 && c2 ==c;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        // swapping will occur using src
    let currImg = currTile.src; // suppose green color // create a variable with currImg jismei currTile ki src define kr rhe hai
    let otherImg = otherTile.src;// suppose red color
    currTile.src= otherImg; // other img ---> green
    otherTile.src = currImg;// curr img ---- red

    //
    let validMove = checkValid();
    if(!validMove){
    let currImg = currTile.src; // suppose green color
    let otherImg = otherTile.src;// suppose red color
    currTile.src= otherImg; // other img ---> green
    otherTile.src = currImg;// curr img ---- red
    }

  }

}

function checkValid(){
    for(let r = 0; r < row; r++){
        for(let c = 0; c < column-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            //check if three candy have same image source or not
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                return true;
            }
        }
    }
    // check column
    for(let c = 0; c < column; c++){
        for(let r = 0; r < row-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            //check if three candy have same image source or not
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                return true;
            }
        }
    }

}

function crushCandy(){
    //crushFive();
    crushFour();
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushFour(){

        function getColorFromSrc(src) {
            // Assuming the image name is like "./images/Red.png", we extract "red"
            return src.split("/")[2].split(".")[0];  // This extracts 'red', 'blue', etc.
        }

    // row
    for(let r = 0; r < row; r++){
        for(let c = 0; c < column-3; c++){
            let candy1 = board[r][c]; 
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            let candy4 = board[r][c+3];

            let color = getColorFromSrc(candy1.src);
            console.log(color);            
            //check if three candy have same image source or not
            if(candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                //candy3.src = "./images/blank.png";
                candy3.src =  `./images/${color}-Wrapped.png`;
                candy4.src = "./images/blank.png";
                score+=30;
                //move = move-1;
            }
        }
    }

    // check column
    
    for(let c = 0; c < column; c++){
        for(let r = 0; r < row-3; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            let candy4 = board[r+3][c];

            let color = getColorFromSrc(candy1.src);

            //check if three candy have same image source or not
            if(candy1.src == candy2.src && candy2.src == candy3.src && candy3.src == candy4.src &&!candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                //candy3.src = "./images/blank.png";
                candy3.src =`./images/${color}-Wrapped.png` ;
                candy4.src = "./images/blank.png";
                score+=30;
            }
        }
    }
}

function crushThree(){
    // check rows
    for(let r = 0; r < row; r++){
        for(let c = 0; c < column-2; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            //check if three candy have same image source or not
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score+=30;
            }
        }
    }

    // check column
    
    for(let c = 0; c < column; c++){
        for(let r = 0; r < row-2; r++){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            //check if three candy have same image source or not
            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score+=30;
            }
        }
    }
}


function slidecandy(){
    for(let c =0; c < column; c++){
        let ind = row-1;
        for(let r = row-1; r>=0 ; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind--;    
            }
        }
        for(let r = ind; r>=0;r--){
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy(){
    for(let c = 0; c<column;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src = "./images/"+randomCandy()+".png";
        }
    }
}
