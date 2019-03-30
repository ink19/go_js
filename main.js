var  judege_qis;
var go_data = [
];

var go_board = [[]];

var stack_board = [[]];

var now_color = 0;
var now_step = 0;
var color_model = 2; //0摆白，1摆黑，2正常

var _draw;

var down_image;

function judege_qi(x, y, board) {
    console.log(x, y);
    if(go_board[x][y] == -1) return 0;
    if(board[x][y] == 1) return 0;
    board[x][y] = 1;
    var qi = 0;
    if(y > 1) {
        if(go_board[x][y] == go_board[x][y - 1]) qi += judege_qi(x, y-1, board);
        else if(go_board[x][y - 1] == -1) qi += 1;
    }

    if(y < 19) {
        if(go_board[x][y] == go_board[x][y + 1]) qi += judege_qi(x, y + 1, board);
        else if(go_board[x][y + 1] == -1) qi += 1;
    }

    if(x > 1) {
        if(go_board[x][y] == go_board[x - 1][y]) qi += judege_qi(x - 1, y, board);
        else if(go_board[x - 1][y] == -1) qi += 1;
    }

    if(x < 19) {
        if(go_board[x][y] == go_board[x + 1][y]) qi += judege_qi(x + 1, y, board);
        else if(go_board[x + 1][y] == -1) qi += 1;
    }
    return qi;
}
function judege_qi2(x, y) {
    for(loop_i = 0; loop_i < 20; ++loop_i) {
        stack_board[loop_i] = [];
        for(loop_j = 0; loop_j < 20; ++ loop_j) {
            stack_board[loop_i][loop_j] = -1;
        }
    }

    return judege_qi(x, y, stack_board);
}

function eat_chess(x, y) {
    eated = 0;
    if(x > 1 && go_board[x - 1][y] == !now_color) {
        if(judege_qi2(x - 1, y) == 0) {
            eated++;
            go_data.forEach((value, index, arr) => {
                if(stack_board[value[0]][value[1]] == 1) {
                    arr[index][4] = 0;
                    go_board[value[0]][value[1]] = -1;
                }
            })
        }
    }

    if(y > 1 && go_board[x][y - 1] == !now_color) {
        if(judege_qi2(x, y - 1) == 0) {
            eated++;
            go_data.forEach((value, index, arr) => {
                if(stack_board[value[0]][value[1]] == 1) {
                    arr[index][4] = 0;
                    go_board[value[0]][value[1]] = -1;
                }
            })
        }
    }

    if(x < 19 && go_board[x + 1][y] == !now_color) {
        if(judege_qi2(x + 1, y) == 0) {
            eated++;
            go_data.forEach((value, index, arr) => {
                if(stack_board[value[0]][value[1]] == 1) {
                    arr[index][4] = 0;
                    go_board[value[0]][value[1]] = -1;
                }
            })
        }
    }

    if(y < 19 && go_board[x][y + 1] == !now_color) {
        if(judege_qi2(x, y + 1) == 0) {
            eated++;
            go_data.forEach((value, index, arr) => {
                if(stack_board[value[0]][value[1]] == 1) {
                    arr[index][4] = 0;
                    go_board[value[0]][value[1]] = -1;
                }
            })
        }
    }
    return eated;
}


function set_black() {
    console.log("set black");
    now_color = 1;
    color_model = 1;
}

function set_white() {
    console.log("set black");
    now_color = 0;
    color_model = 0;
}

function first_black() {
    console.log("set black");
    now_color = 1;
    color_model = 2;
}

function first_white() {
    console.log("set black");
    now_color = 0;
    color_model = 2;
}

function switch_color() {
    if(color_model == 2) {
        now_color = !now_color;
    } else {
        now_color = color_model;
    }
}

function last_step() {
    now_step--;
    var go_data_length = go_data.length;
    var go_temp_data = go_data.slice(0, go_data_length - 1);
    go_data = [];

    for(loop_i = 0; loop_i < 20; ++loop_i) {
        go_board[loop_i] = [];
        for(loop_j = 0; loop_j < 20; ++ loop_j) {
            go_board[loop_i][loop_j] = -1;
        }
    }

    for(var loop_i = 0; loop_i < go_data_length - 1; ++loop_i) {
        go_board[go_temp_data[loop_i][0]][go_temp_data[loop_i][1]] = go_temp_data[loop_i][2];
        eat_chess(go_temp_data[loop_i][0], go_temp_data[loop_i][1]);
        go_data.push([go_temp_data[loop_i][0], go_temp_data[loop_i][1],go_temp_data[loop_i][2], go_temp_data[loop_i][3], 1]);
        console.log(go_data[go_data.length - 1]);
    }
    _draw();
}

function clear_board() {
    go_data = [];
    now_step = 0;
    _draw();
}

window.onload = function() {

var bgi = new Image();
var canvas = document.getElementById('go-board');
var ctx = canvas.getContext("2d");
function draw() {
    for(loop_i = 0; loop_i < 20; ++loop_i) {
        go_board[loop_i] = [];
        for(loop_j = 0; loop_j < 20; ++ loop_j) {
            go_board[loop_i][loop_j] = -1;
        }
    }
    ctx.fillStyle = "black";
    ctx.drawImage(bgi, 10, 10, 700, 700);
    ctx.beginPath();
    //边
    for(loop_i = 0; loop_i < 19; ++loop_i) {
        ctx.moveTo(10 + 35 + loop_i * 35, 10 + 35);
        ctx.lineTo(10 + 35 + loop_i * 35, 10 + 700 - 35);
    }
    for(loop_i = 0; loop_i < 19; ++loop_i) {
        ctx.moveTo(10 + 35, 10 + 35 + loop_i * 35);
        ctx.lineTo(10 + 700 - 35, 10 + 35 + loop_i * 35);
    }
    ctx.stroke();
    //星位

    //角
    ctx.beginPath();
    ctx.arc(4 * 35 + 10, 4 * 35 + 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(4 * 35 + 10, 720 - 4 * 35 - 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(720 - 4 * 35 - 10, 720 - 4 * 35 - 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(720 - 4 * 35 - 10, 4 * 35 + 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    //天元
    ctx.beginPath();
    ctx.arc(10 * 35 + 10, 10 * 35 + 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    //边
    ctx.beginPath();
    ctx.arc(4 * 35 + 10, 10 * 35 + 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(10 * 35 + 10, 720 - 4 * 35 - 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(720 - 4 * 35 - 10, 10 * 35 + 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(10 * 35 + 10, 4 * 35 + 10, 3, 0, Math.PI * 2, 0);
    ctx.fill();

    //坐标
    ctx.font = "12px serif";
    var wordText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(loop_i = 0; loop_i < 19; ++loop_i) {
        ctx.fillText(wordText[loop_i], 7 + 35 + 35 * loop_i, 35);
    }

    
    for(loop_i = 0; loop_i < 19; ++loop_i) {
        ctx.fillText(loop_i, 30, 13 + 35 + 35 * loop_i);
    }

    //棋子
    go_data.forEach((value, index, arr) => {
        if(value[4] == 0) return;
        ctx.beginPath();
        ctx.fillStyle = value[2]?"black":"white";
        ctx.arc(value[0] * 35 + 10, value[1] * 35 + 10, 15, 0, Math.PI * 2, 0);
        ctx.fill();
        ctx.fillStyle = (!value[2])?"black":"white";
        ctx.font = "20px serif";
        if(value[3] >= 0) ctx.fillText(value[3], value[0] * 35 + 5, value[1] * 35 + 16);

        go_board[value[0]][value[1]] = value[2];
    });
}

down_image = function () {
    var a = document.createElement("a");
    a.href = canvas.toDataURL();

    a.download = "go.png";
    a.click();
}


_draw = draw;
bgi.onload = draw;
bgi.setAttribute("crossOrigin",'Anonymous')
bgi.src = "bgi.jpg";

canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left * (canvas.width / rect.width);
    var y = event.clientY - rect.top * (canvas.height / rect.height);
    x -= 27.5;
    y -= 27.5;
    x /= 35;
    y /= 35;
    x = Math.floor(x + 1);
    y = Math.floor(y + 1);

    if(x < 1 || y < 1) return;

    if(go_board[x][y] != -1) return;

    go_board[x][y] = now_color;
    if(!eat_chess(x, y)) {
        if(judege_qi2(x, y) == 0) {
            go_board[x][y] = -1;
            return;
        }
    }
    
    if(color_model == 2) {
        go_data[now_step] = [
            x, y, now_color, now_step + 1, 1
        ];// x y 颜色 显示步数 是否有气
        
        now_step++;
    } else {
        go_data[now_step] = [
            x, y, now_color, -1, 1
        ];// x y 颜色 显示步数 是否有气
        now_step++;
    }

    switch_color()

    draw();
});



};