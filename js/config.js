let gridMap = [];
let tr = 30;
let td = 30;
let score = 0;
let snake = {
    snakeDirection : "right",
    snakePosition : [
        {x : 0 , y : 0 , domContent : ""},
        {x : 0 , y : 1 , domContent : ""},
        {x : 0 , y : 2 , domContent : ""},
        {x : 0 , y : 3 , domContent : ""},
    ],
    speed : 200
}

let food = {
    x : 0,y : 0 ,domContent :""
}
let timer;