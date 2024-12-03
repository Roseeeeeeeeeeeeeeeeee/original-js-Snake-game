


let sp = snake;
/**
 * 绘制贪吃蛇
 */

function drawSnake(){

    
    for(let i = 0; i < snake.snakePosition.length; i++)
    {

      
        
        if(!snake.snakePosition[i].domContent){
            snake.snakePosition[i].domContent = document.createElement('div');
            snake.snakePosition[i].domContent.style.position = "absolute"
            snake.snakePosition[i].domContent.style.height = "18px";
            snake.snakePosition[i].domContent.style.width = "18px";
            snake.snakePosition[i].domContent.style.left = snake.snakePosition[i].y * 20 + "px";
            snake.snakePosition[i].domContent.style.top = snake.snakePosition[i].x * 20 + "px";
            // document.querySelector('.container').append(snake.snakePosition[i].domContent);
            if(i != snake.snakePosition.length - 1){
                snake.snakePosition[i].domContent.style.background = "rgb(53, 128, 220)"
                snake.snakePosition[i].domContent.style.borderRadius = "50%"
            }else{
                snake.snakePosition[i].domContent.style.background = "url('/asset/snakeHead.png') center/contain no-repeat";
                snake.snakePosition[i].domContent.style.transform  = "rotate(90deg)"
            }
            document.querySelector('.container').append(snake.snakePosition[i].domContent);
        }else{
            if(i != snake.snakePosition.length - 1){
               
                snake.snakePosition[i].domContent.style.background = "rgb(53, 128, 220)"
                snake.snakePosition[i].domContent.style.borderRadius = "50%"
            }else{
                
                snake.snakePosition[i].domContent.style.background = "url('/asset/snakeHead.png') center/contain no-repeat";
                snake.snakePosition[i].domContent.style.transform  = "rotate(90deg)"
            }
        }
       
    }
}
/**
 * 绘制蛇豆
 */
function drawFood() {

    //  排除食物不能出现的点，如蛇身上
     while(true)
        {
            food.x = Math.floor(Math.random()* td);
            food.y = Math.floor(Math.random() * tr);
            let isInSnake = false;
            for(let i = 0 ; i < snake.snakePosition.length;i++)
                {
                    if(food.x === snake.snakePosition[i].x && food.y === snake.snakePosition[i].y  ){
                        isInSnake = true;
                        break;
                    }
                }   
            if(!isInSnake)
                {
                    break;
                }    
        } 
    if(!food.domContent){
        food.domContent = document.createElement('div');
        food.domContent.style.position = "absolute"
        food.domContent.style.height = "20px";
        food.domContent.style.width = "20px";
        food.domContent.style.background = "url('/asset/snakeFood.png') center/contain no-repeat";
        food.domContent.style.left = food.y * 20 + "px";
        food.domContent.style.top = food.x * 20 + "px";
        document.querySelector('.container').append(food.domContent);
    }else{
        food.domContent.style.left = food.y * 20 + "px";
        food.domContent.style.top = food.x * 20 + "px";
    }
}
/**
 * 初始化游戏资源
 */
function initGame() {
    // 生成方格
   for(let i = 0;i < tr;i++)
   {
    for(let j = 0 ; j < td ; j++)
    {
        gridMap.push({
            x : i,
            y : j,
        })
    }
   }
    // console.log(gridMap);
    // 画蛇
    drawSnake();
    // 画蛇豆
    drawFood();
}
/**
 * 解绑事件
 */
function unBindEvent(){
    document.removeEventListener('keydown',moveSnake)
}
/**
 * 重新加载游戏
 */
function reLoad(){
    document.querySelector('.container').innerHTML = ` 
    <!-- 开始游戏按钮 -->
      <button class="startBtn"></button>
    <!-- 游戏暂停按钮 -->
      <button class="pauseBtn"></button>
    `
    gridMap = [];
    tr = 30;
    td = 30;
    score = 0;
    snake = {
        snakeDirection : "right",
        snakePosition : [
            {x : 0 , y : 0 , domContent : ""},
            {x : 0 , y : 1 , domContent : ""},
            {x : 0 , y : 2 , domContent : ""},
            {x : 0 , y : 3 , domContent : ""},
        ]
    }
  
    console.log("reload");
    
    food = {
    x : 0,y : 0 ,domContent :""
    } 
    main();
}
/**
 * 结束游戏
 */
function endGame(){
    console.log("fhkajd");
    
    let isAgain =  window.confirm(`游戏结束，您的得分为${score}
是否重新开始游戏？`)
        if(isAgain)
        {
            reLoad();
        }

}
/**
 * 移动贪吃蛇
 * @param {*} e（事件对象） 
 */
function moveSnake(e){
        console.log(snake.snakeDirection);
        
        let ek = e.key;
        let len = snake.snakePosition.length;
        let nx,
            ny;
         //更新贪吃蛇位置
        if((ek === "ArrowUp" || ek === "w") && (snake.snakeDirection != "down"))
        {
             nx = snake.snakePosition[len - 1].x - 1;
             snake.snakeDirection = "up"
             snake.snakePosition.push({x : nx,y : snake.snakePosition[len - 1].y,domContent : ""})
             if(nx === food.x && snake.snakePosition[len - 1].y === food.y){
                 drawFood();
                 ++score;
             }else{
                 document.querySelector('.container').removeChild(snake.snakePosition[0].domContent)
                 snake.snakePosition.shift();
             }
             drawSnake();
 
             
        }
        else if((ek === "ArrowDown" || ek === "s") && (snake.snakeDirection != "up"))
         {
              nx = snake.snakePosition[len - 1].x + 1;
              snake.snakeDirection = "down"
              snake.snakePosition.push({x : nx,y : snake.snakePosition[len - 1].y,domContent : ""})
              if(nx === food.x && snake.snakePosition[len - 1].y === food.y){
                 drawFood();
                 ++score;       
              }
              else{
                 document.querySelector('.container').removeChild(snake.snakePosition[0].domContent)
                 snake.snakePosition.shift();
              }
              drawSnake();
         }
         else if((ek === "ArrowLeft" || ek === "a") && (snake.snakeDirection != "right"))
             {
                 
                 ny = snake.snakePosition[len - 1].y - 1;
                
                 snake.snakeDirection = "left"
                 snake.snakePosition.push({x : snake.snakePosition[len - 1].x,y : ny ,domContent: ""})
                 if(snake.snakePosition[len - 1].x === food.x && ny === food.y){
                     drawFood();
                     ++score;
                  }else{
                     document.querySelector('.container').removeChild(snake.snakePosition[0].domContent)
                     snake.snakePosition.shift();
                  }
                 drawSnake();
             }
         else if((ek === "ArrowRight" || ek === "d") && (snake.snakeDirection != "left"))
                 {
                    console.log(ek);
                    
                      ny = snake.snakePosition[len - 1].y + 1;
                      console.log(ny);
                       snake.snakeDirection = "right"
                      snake.snakePosition.push({x : snake.snakePosition[len - 1].x,y : ny,domContent : ""})
                      if(snake.snakePosition[len - 1].x === food.x && ny === food.y){
                         drawFood();
                         ++score;
                      }else{
                         document.querySelector('.container').removeChild(snake.snakePosition[0].domContent)
                         snake.snakePosition.shift();
                      }
                      drawSnake();
                 }
          //游戏结束
          for(let i = 0 ; i < snake.snakePosition.length;i++)
          {
             if(nx === snake.snakePosition[i].x && ny === snake.snakePosition[i].y || nx < 0 || nx >= td || ny < 0 || ny >=tr )
             {
                 endGame();
                 break;
             }
          }
}
/**
 * 绑定事件
 */
function bindEvent() {
   
    document.addEventListener('keydown',moveSnake)
   
}
/**
 * 主函数
 */
function main(){

    initGame();
    bindEvent();
 
    
}
main();
