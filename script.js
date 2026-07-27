// ============================
// 欢乐合成球
// script.js 第一部分
// ============================


// 获取 Matter.js 模块

const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Body,
    Events
} = Matter;



// 创建物理引擎

const engine = Engine.create();

engine.gravity.y = 1;



const world = engine.world;



// 游戏区域

const game =
document.getElementById("game");



// 创建画布

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



// 运行引擎

const runner = Runner.create();

Runner.run(
    runner,
    engine
);





// ============================
// 游戏边界
// ============================


const width =
window.innerWidth;


const height =
window.innerHeight;



// 地板

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





// ============================
// 人物等级
// ============================



const names = [

"张灵通",

"邵文博",

"刘帅",

"李子强",

"王秋实",

"薛甜甜",

"李亚晴",

"温阿旋"

];





const ballColors=[


"#87CEFA",

"#90EE90",

"#FFE066",

"#FFA94D",

"#DDA0DD",

"#FF9EC4",

"#FF6666",

"#FFD700"


];





// 每一级大小

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

let score = 0;



function addScore(num){


    score += num;


    document.getElementById(
        "score"
    ).innerText = score;


}






// 当前等待掉落的人物

let currentLevel = 0;



// 游戏状态

let gameOver=false;



// ============================
// 随机初始人物
// ============================


function randomLevel(){


    return Math.floor(

        Math.random()*3

    );


}
// ============================
// script.js 第二部分
// 创建人物球 + 掉落系统
// ============================



// 当前准备掉落的人物

let nextLevel = randomLevel();



// 创建人物球

function createBall(level,x,y){


    let radius = sizes[level];


    let ball = Bodies.circle(

        x,

        y,

        radius,

        {

            restitution:0.4,

            friction:0.8,


            label:names[level],


            level:level,


            render:{

                fillStyle:
                ballColors[level]

            }


        }

    );



    Composite.add(

        world,

        ball

    );



    return ball;

}






// 绘制名字

function drawText(){


    let canvas =
    render.canvas;


    let ctx =
    canvas.getContext("2d");



    Events.on(

        render,

        "afterRender",

        function(){


            let bodies =
            Composite.allBodies(world);



            bodies.forEach(

                body=>{


                    if(body.label
                    &&
                    names.includes(body.label)){



                        ctx.save();



                        ctx.translate(

                            body.position.x,

                            body.position.y

                        );



                        ctx.rotate(

                            body.angle

                        );



                        ctx.fillStyle="#333";


                        ctx.font =
                        "bold 14px Microsoft YaHei";



                        ctx.textAlign="center";

                        ctx.textBaseline="middle";



                        ctx.fillText(

                            body.label,

                            0,

                            0

                        );



                        ctx.restore();


                    }


                }

            );


        }

    );

}



drawText();






// ============================
// 点击掉落
// ============================


let canDrop=true;



game.addEventListener(

"click",

function(e){



    if(!canDrop)
    return;



    if(gameOver)
    return;



    let x =
    e.clientX;



    createBall(

        nextLevel,

        x,

        100

    );



    nextLevel =
    randomLevel();



});






// 手机触摸

game.addEventListener(

"touchstart",

function(e){


    if(!canDrop)
    return;


    if(gameOver)
    return;



    let touch =
    e.touches[0];



    createBall(

        nextLevel,

        touch.clientX,

        100

    );



    nextLevel =
    randomLevel();



});
// ============================
// script.js 第三部分
// 碰撞合成系统
// ============================



Events.on(

engine,

"collisionStart",

function(event){



    event.pairs.forEach(pair=>{


        let a = pair.bodyA;

        let b = pair.bodyB;



        // 判断是不是人物球

        if(
            typeof a.level === "number"
            &&
            typeof b.level === "number"
        ){



            // 同等级才合成

            if(
                a.level === b.level
            ){



                let level =
                a.level;



                // 已经最高级
                // 不再合成

                if(level >= names.length-1)
                return;




                // 防止重复触发

                if(
                    a.removed ||
                    b.removed
                )
                return;



                a.removed=true;

                b.removed=true;




                // 合成位置

                let x =
                (a.position.x+
                b.position.x)/2;


                let y =
                (a.position.y+
                b.position.y)/2;




                // 删除旧球

                Composite.remove(
                    world,
                    a
                );


                Composite.remove(
                    world,
                    b
                );




                // 创建升级后的球

                let newBall =
                createBall(

                    level+1,

                    x,

                    y

                );



                // 加分

                addScore(
                    (level+1)*10
                );



                // 如果合成最终人物

                if(
                    level+1
                    ===
                    names.length-1
                ){

                    setTimeout(

                    ()=>{

                        showWin();

                    },

                    500

                    );

                }



            }


        }



    });



});





// ============================
// 胜利
// ============================


function showWin(){


    document.getElementById(
        "win"
    ).style.display="block";


}




// ============================
// 重新开始
// ============================


function restartGame(){


    location.reload();


}
// ============================
// script.js 第四部分
// 游戏优化
// ============================



// 当前球提示

const tip = document.createElement("div");

tip.id="nextTip";

document.body.appendChild(tip);



function updateTip(){

    tip.innerHTML =
    "下一个：" + names[nextLevel];

    tip.style.background =
    ballColors[nextLevel];

}


updateTip();




// 每次掉落后更新提示

let oldCreateBall=createBall;


createBall=function(level,x,y){

    let ball=
    oldCreateBall(level,x,y);


    nextLevel=randomLevel();

    updateTip();


    return ball;

}





// ============================
// 合成特效
// ============================


function createEffect(x,y,color){


    for(let i=0;i<15;i++){


        let p=document.createElement("div");


        p.className="particle";


        p.style.left=x+"px";

        p.style.top=y+"px";


        p.style.background=color;



        document.body.appendChild(p);



        let angle=
        Math.random()*Math.PI*2;


        let distance=
        40+Math.random()*80;



        setTimeout(()=>{


            p.style.transform=
            `
            translate(
            ${Math.cos(angle)*distance}px,
            ${Math.sin(angle)*distance}px
            )
            `;


            p.style.opacity=0;


        },10);



        setTimeout(()=>{

            p.remove();

        },800);



    }


}






// 修改合成效果

let oldAddScore=addScore;



addScore=function(num){

    oldAddScore(num);

}





// ============================
// 游戏结束检测
// ============================


setInterval(()=>{


    let bodies=
    Composite.allBodies(world);



    bodies.forEach(body=>{


        if(
            body.level!==undefined
            &&
            body.position.y<120
        ){


            gameOver=true;



            document.getElementById(
                "finalScore"
            ).innerText=score;



            document.getElementById(
                "over"
            ).style.display="block";


        }



    });



},1000);