let num_row = 5;
let board = [];

for (let i = 0; i < num_row; i++) {
    board.push([]);
}

for (let i = 0; i < num_row; i++) {
    for (let j = 0; j < num_row; j++) {
        board[i].push(0);
    }
}

function print_board() {
    document.getElementById("demo1").innerHTML = board[0]
    document.getElementById("demo2").innerHTML = board[1]
    document.getElementById("demo3").innerHTML = board[2]
    document.getElementById("demo4").innerHTML = board[3]
    document.getElementById("demo5").innerHTML = board[4]
}

function move(i, j) {
    board[i][j] = board[i][j] + 1;
    check(i, j);
}

function check(i, j) {
    if (board[i][j] == 5) {
        board[i][j] = 0;
        // up
        for (let k = 0; k < i; k++) {
            if (board[i - k - 1][j] != 0) {
                board[i - k - 1][j] = board[i - k - 1][j] + 1;
                console.log("transect up");
                check(i - k - 1, j);
                break;
            }
        }

        //down
        for (let k = i + 1; k < num_row; k++) {
            if (board[k][j] != 0) {
                board[k][j] = board[k][j] + 1;
                check(k, j);
                break;
            }
        }

        //left
        for (let k = 0; k < j; k++) {
            if (board[i][j - k - 1] != 0) {
                board[i][j - k - 1] = board[i][j - k - 1] + 1;
                check(i, j - k - 1);
                break;
            }
        }

        //right
        for (let k = j + 1; k < num_row; k++) {
            if (board[i][k] != 0) {
                board[i][k] = board[i][k] + 1;
                check(i, k);
                break;
            }
        }
    }
}

function play(){
    for (let i = 0; i < num_row; i++) {
    for (let j = 0; j < num_row; j++) {
        board[i][j] = Math.floor(Math.random() * 5);
    }
}
    print_board();
}

function dropWater(){
    let inputStr = prompt();
    let inputArr = inputStr.split(" ");
    let i = parseInt(inputArr[0]);
    let j = parseInt(inputArr[1]);
    move(i-1, j-1);
    print_board();

    // transaction
}