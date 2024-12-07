
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
            doms.container.append(snake.snakePosition[i].domContent);
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
 * 绘制食物
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
        doms.container.append(food.domContent);
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
   doms.staBtn.style.display = "block";
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
   doms.container.innerHTML = ` 
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
        snakeDirection : "",
        snakePosition : [
            {x : 0 , y : 0 , domContent : ""},
            {x : 0 , y : 1 , domContent : ""},
            {x : 0 , y : 2 , domContent : ""},
            {x : 0 , y : 3 , domContent : ""},
        ],
        speed : 150
    }
    
    food = {
    x : 0,y : 0 ,domContent :""
    } 
    doms = {
        staBtn : document.querySelector('.startBtn'),
        container : document.querySelector('.container')
    }
    
    main();
}
/**
 * 结束游戏
 */
function endGame(){
    console.log("jieshu");
    clearInterval(timer);
    let isAgain =  window.confirm(`游戏结束，您的得分为${score}
是否重新开始游戏？`)
        if(isAgain)
        {
            reLoad();
        }else{

        }

}
/**
 * 检查是否撞墙以及吃到自己，若有则结束
 * @param {*} nx 
 * @param {*} ny 
 * @returns 
 */
function isToStop(nx,ny){
    for(let i = 0 ; i < snake.snakePosition.length -1;i++)
        {
           if(nx === snake.snakePosition[i].x && ny === snake.snakePosition[i].y|| nx < 0 || nx >= td || ny < 0 || ny >=tr)
           {
                return true;
           }
        }
    return false;
}
function moveSnakePlus(){
   
    let len = snake.snakePosition.length;
    let nx ,
        ny;
     //更新贪吃蛇位置
    if(snake.snakeDirection == "up")
    {
       
            nx = snake.snakePosition[len - 1].x - 1;
            ny = snake.snakePosition[len - 1].y;
           
            if(isToStop(nx,ny))
            {
                endGame();
            }else{
                snake.snakePosition.push({x : nx,y : snake.snakePosition[len - 1].y,domContent : ""})
                if(nx === food.x && snake.snakePosition[len - 1].y === food.y){
                    drawFood();
                    ++score;
                }else{
                   doms.container.removeChild(snake.snakePosition[0].domContent)
                    snake.snakePosition.shift();
                }
                if(nx < 0 || nx >= td || ny < 0 || ny >=tr){
                    endGame()
                }else{
                drawSnake();
                }
        }
    }
    else if(snake.snakeDirection === "down")
     {
        
            nx = snake.snakePosition[len - 1].x + 1;
            ny = snake.snakePosition[len - 1].y;
           
            if(isToStop(nx,ny)){
                endGame();
            }else{
                snake.snakePosition.push({x : nx,y : snake.snakePosition[len - 1].y,domContent : ""})
                if(nx === food.x && snake.snakePosition[len - 1].y === food.y){
                drawFood();
                ++score;       
                }
                else{
                doms.container.removeChild(snake.snakePosition[0].domContent)
                snake.snakePosition.shift();
                }
                if(nx < 0 || nx >= td || ny < 0 || ny >=tr){
                    endGame()
                }else{
                drawSnake();
                }
        }

         
     }
     else if(snake.snakeDirection === "left")
         {
            
             ny = snake.snakePosition[len - 1].y - 1;
             nx = snake.snakePosition[len - 1].x;
           
             if(isToStop(nx,ny)){
                endGame();
             }else{
                snake.snakePosition.push({x : snake.snakePosition[len - 1].x,y : ny ,domContent: ""})
                if(snake.snakePosition[len - 1].x === food.x && ny === food.y){
                    drawFood();
                    ++score;
                 }else{
                    doms.container.removeChild(snake.snakePosition[0].domContent)
                    snake.snakePosition.shift();
                 }
                
               drawSnake();
             } 
         }
     else if(snake.snakeDirection === "right")
             {
               
                    ny = snake.snakePosition[len - 1].y + 1;
                    nx = snake.snakePosition[len - 1].x;
                   
                     if(isToStop(nx,ny)){
                        endGame();
                     }else{
                            snake.snakePosition.push({x : snake.snakePosition[len - 1].x,y : ny,domContent : ""})
                            if(snake.snakePosition[len - 1].x === food.x && ny === food.y){
                            drawFood();
                            ++score;
                            }else{
                            doms.container.removeChild(snake.snakePosition[0].domContent)
                            snake.snakePosition.shift();
                            }
                            if(nx < 0 || nx >= td || ny < 0 || ny >=tr){
                                endGame()
                            }else{
                            drawSnake();
                            }
                }
                  
             }
      
}

/**
 * 移动贪吃蛇
 * @param {*} e（事件对象） 
 */
function moveSnake(e){

        
        let ek = e.key;
         //更新贪吃蛇位置
        if(((ek === "ArrowUp" || ek === "w") && (snake.snakeDirection != "down")))
        {
            
                snake.snakeDirection = "up";
        }
        else if(((ek === "ArrowDown" || ek === "s") && (snake.snakeDirection != "up")))
         {
            
                snake.snakeDirection = "down";
                
             
         }
         else if(((ek === "ArrowLeft" || ek === "a") && (snake.snakeDirection != "right")))
             {
                
                 snake.snakeDirection = "left"
                
             }
         else if(((ek === "ArrowRight" || ek === "d") && (snake.snakeDirection != "left")))
            {
            
                    snake.snakeDirection = "right"    
            }
        
}

/**
 * 绑定事件
 */
function bindEvent() {
   //改变蛇行方向
    document.addEventListener('keydown',moveSnake)
    //开始游戏
    doms.staBtn.addEventListener('click',function(e){
        e.stopPropagation();  // 阻止事件冒泡到container的点击事件，导致页面卡死
        snake.snakeDirection = "right"
        timer = setInterval(() => {
            moveSnakePlus()
        }, snake.speed);
        doms.staBtn.style.display = "none";
        console.log(doms.staBtn);
        
    })
    //暂停游戏
    doms.container.addEventListener('click',function(){
        clearInterval(timer);
        doms.pauseBtn.style.display = 'block'
    })
    doms.pauseBtn.addEventListener('click',function (e){
        e.stopPropagation();  // 阻止事件冒泡
         doms.pauseBtn.style.display = 'none'
         timer = setInterval(() => {
            moveSnakePlus()
        }, snake.speed);
    })
}
/**
 * 主函数
 */
function main(){

    initGame();
    bindEvent();
 
    
}
main();
