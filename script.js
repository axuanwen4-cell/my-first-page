// ===============================
// 欢乐合成球
// script.js 第1部分
// ===============================


// 获取 Matter.js

const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Events
} = Matter;



// ===============================
// 创建引擎
// ===============================


const engine = Engine.create();


// 调低重力，更接近合成大西瓜

engine.gravity.y = 0.6;


const world = engine.world;



// 游戏区域

const game =
document.getElementById("game");




// ===============================
// 创建画布
// ===============================


const render = Render.create({

    element: game,

    engine: engine,


    options: {

        width: window.innerWidth,

        height: window.innerHeight,

        wireframes:false,

        background:"transparent"

    }

});


Render.run(render);



// 启动

const runner = Runner.create();

Runner.run(
    runner,
    engine
);




// ===============================
// 游戏边界
// ===============================


const width =
window.innerWidth;


const height =
window.innerHeight;



// 地面

Composite.add(

world,

Bodies.rectangle(

width/2,

height-50,

width,

100,

{

isStatic:true,


render:{

fillStyle:"#55aa55"

}

}

)

);



// 左墙

Composite.add(

world,

Bodies.rectangle(

-25,

height/2,

50,

height,

{

isStatic:true

}

)

);




// 右墙

Composite.add(

world,

Bodies.rectangle(

width+25,

height/2,

50,

height,

{

isStatic:true

}

)

);






// ===============================
// 人物升级顺序
// ===============================


const names=[

"张灵通",

"邵文博",

"刘帅",

"李子强",

"王秋实",

"薛甜甜",

"李亚晴",

"温阿旋"

];




// 颜色

const colors=[

"#87CEFA",

"#90EE90",

"#FFE066",

"#FFA94D",

"#DDA0DD",

"#FF9EC4",

"#FF6666",

"#FFD700"

];




// 大小

const sizes=[

25,

32,

40,

50,

60,

72,

85,

105

];





// 分数

let score=0;



function addScore(num){

    score+=num;


    document.getElementById(
        "score"
    ).innerText=score;

}





// 当前等待球

let nextLevel =
Math.floor(
Math.random()*3
);




// 游戏状态

let gameOver=false;
// ===============================
// 欢乐合成球
// script.js 第1部分
// ===============================


// 获取 Matter.js

const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Events
} = Matter;



// ===============================
// 创建引擎
// ===============================


const engine = Engine.create();


// 调低重力，更接近合成大西瓜

engine.gravity.y = 0.6;


const world = engine.world;



// 游戏区域

const game =
document.getElementById("game");




// ===============================
// 创建画布
// ===============================


const render = Render.create({

    element: game,

    engine: engine,


    options: {

        width: window.innerWidth,

        height: window.innerHeight,

        wireframes:false,

        background:"transparent"

    }

});


Render.run(render);



// 启动

const runner = Runner.create();

Runner.run(
    runner,
    engine
);




// ===============================
// 游戏边界
// ===============================


const width =
window.innerWidth;


const height =
window.innerHeight;



// 地面

Composite.add(

world,

Bodies.rectangle(

width/2,

height-50,

width,

100,

{

isStatic:true,


render:{

fillStyle:"#55aa55"

}

}

)

);



// 左墙

Composite.add(

world,

Bodies.rectangle(

-25,

height/2,

50,

height,

{

isStatic:true

}

)

);




// 右墙

Composite.add(

world,

Bodies.rectangle(

width+25,

height/2,

50,

height,

{

isStatic:true

}

)

);






// ===============================
// 人物升级顺序
// ===============================


const names=[

"张灵通",

"邵文博",

"刘帅",

"李子强",

"王秋实",

"薛甜甜",

"李亚晴",

"温阿旋"

];




// 颜色

const colors=[

"#87CEFA",

"#90EE90",

"#FFE066",

"#FFA94D",

"#DDA0DD",

"#FF9EC4",

"#FF6666",

"#FFD700"

];




// 大小

const sizes=[

25,

32,

40,

50,

60,

72,

85,

105

];





// 分数

let score=0;



function addScore(num){

    score+=num;


    document.getElementById(
        "score"
    ).innerText=score;

}





// 当前等待球

let nextLevel =
Math.floor(
Math.random()*3
);




// 游戏状态

let gameOver=false;
// ===============================
// script.js 第3部分
// 碰撞合成系统
// ===============================



Events.on(

engine,

"collisionStart",

function(event){



    event.pairs.forEach(pair=>{


        let a =
        pair.bodyA;


        let b =
        pair.bodyB;




        // 必须都是人物球

        if(

            a.level===undefined ||

            b.level===undefined

        ){

            return;

        }





        // 等级相同才合成

        if(

            a.level === b.level

        ){



            let level =
            a.level;




            // 已经最高级

            if(
                level >= names.length-1
            ){

                return;

            }





            // 防止重复碰撞

            if(
                a.used ||
                b.used
            ){

                return;

            }



            a.used=true;

            b.used=true;





            // 合成位置

            let x =
            (
                a.position.x+
                b.position.x
            )/2;


            let y =
            (
                a.position.y+
                b.position.y
            )/2;





            // 删除旧球


            Composite.remove(

                world,

                a

            );


            Composite.remove(

                world,

                b

            );





            // 创建升级球


            createBall(

                level+1,

                x,

                y

            );





            // 增加分数

            addScore(

                (level+1)*10

            );






            // 最终合成

            if(

                level+1 ===
                names.length-1

            ){


                setTimeout(

                    function(){

                        showWin();

                    },

                    500

                );


            }



        }



    });


});







// ===============================
// 胜利窗口
// ===============================


function showWin(){


    let win =
    document.getElementById("win");


    if(win){

        win.style.display="block";

    }


}






// ===============================
// 重新开始
// ===============================


function restartGame(){


    location.reload();


}
// ===============================
// script.js 第4部分
// 最终优化
// ===============================



// ===============================
// 最高分
// ===============================


let bestScore =
localStorage.getItem("bestScore")
|| 0;



function saveBestScore(){


    if(score > bestScore){


        bestScore = score;


        localStorage.setItem(

            "bestScore",

            bestScore

        );


    }

}





// ===============================
// 合成粒子效果
// ===============================


function createParticles(x,y,color){



    for(let i=0;i<15;i++){



        let p =
        document.createElement("div");



        p.className =
        "particle";



        p.style.left =
        x+"px";


        p.style.top =
        y+"px";



        p.style.background =
        color;



        document.body.appendChild(p);





        let dx =
        (Math.random()-0.5)*150;


        let dy =
        (Math.random()-0.5)*150;





        setTimeout(()=>{


            p.style.transform =
            `
            translate(
            ${dx}px,
            ${dy}px
            )
            `;


            p.style.opacity="0";



        },10);





        setTimeout(()=>{


            p.remove();


        },800);



    }


}






// ===============================
// 游戏结束检测
// ===============================



setInterval(function(){



    if(gameOver)
    return;



    let bodies =
    Composite.allBodies(world);



    bodies.forEach(body=>{



        if(

            body.level!==undefined

            &&

            body.position.y < 100

        ){



            gameOver=true;



            saveBestScore();




            let over =
            document.getElementById("over");



            if(over){

                over.style.display="block";

            }



            let final =
            document.getElementById("finalScore");



            if(final){

                final.innerText =
                score;

            }



        }



    });



},1000);







// ===============================
// 修改合成增加特效
// ===============================


// 监听合成后产生效果

Events.on(

engine,

"afterUpdate",

function(){



    let bodies =
    Composite.allBodies(world);



    bodies.forEach(body=>{


        if(body.level!==undefined){



            if(body.level >= 1){


                // 轻微发光

                body.render.opacity=1;


            }


        }


    });



});
// 背景音乐

const bgm = document.getElementById("bgm");


document.addEventListener(
"click",
function(){

    bgm.volume = 0.3;

    bgm.play();

},
{
    once:true
});