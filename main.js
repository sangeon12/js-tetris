let tetris_canvas = document.getElementById("canvas"); //캔버스 객체 가져오기
let ctx = tetris_canvas.getContext("2d"); //캔버스에 2D객체 생성

let blockSize = 30; //블록 하나 크기
let blockNumber = 0; //블록 종류
let blockTurn = 0; //블록 회전

let block = [
  {//1번 블록 : ㅗ모양
      0:[{x:0, y:0}, {x:1, y:0}, {x:0, y:-1}, {x:-1, y:0}],
      1:[{x:0, y:0},{x:0, y:1},{x:1, y:0},{x:0, y:-1}],
      2:[{x:0, y:0}, {x:-1, y:0}, {x:0, y:1}, {x:1, y:0}],
      3:[{x:0, y:0}, {x:0, y:-1}, {x:-1, y:0}, {x:0, y:1}],
      color:'#FF0000'
  },
  {//2번 블록 : ㅡ모양
      0:[{x:0, y:0}, {x:-1, y:0}, {x:1, y:0}, {x:2, y:0}],
      1:[{x:0, y:0},{x:0, y:1},{x:0, y:2},{x:0, y:-1}],
      2:[{x:0, y:0}, {x:-1, y:0}, {x:-2, y:0}, {x:1, y:0}],
      3:[{x:0, y:0}, {x:0, y:-1}, {x:0, y:-2}, {x:0, y:1}],
      color:'#00FFF7'
  },
  {//3번 블록 : ㄴ모양
      0:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:1, y:0}],
      1:[{x:0, y:0},{x:0, y:-1},{x:1, y:-1},{x:0, y:1}],
      2:[{x:0, y:0}, {x:1, y:0}, {x:1, y:1}, {x:-1, y:0}],
      3:[{x:0, y:0}, {x:0, y:1}, {x:-1, y:1}, {x:0, y:-1}],
      color:'#003CFF'
  },
  {//4번 블록 : 역 ㄴ모양
      0:[{x:0, y:0}, {x:-1, y:0}, {x:1, y:0}, {x:1, y:-1}],
      1:[{x:0, y:0},{x:0, y:-1},{x:0, y:1},{x:1, y:1}],
      2:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:1}, {x:1, y:0}],
      3:[{x:0, y:0}, {x:0, y:-1}, {x:-1, y:-1}, {x:0, y:1}],
      color:'#5500FF'
  },
  {//5번 블록 : ㅁ모양
      0:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:-1}],
      1:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:-1}],
      2:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:-1}],
      3:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:-1}],
      color:'#EFFF00'
  },
  {//6번 블록 : ㄴㄱ모양
      0:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:1}],
      1:[{x:0, y:0}, {x:0, y:-1}, {x:1, y:-1}, {x:-1, y:0}],
      2:[{x:0, y:0}, {x:-1, y:0}, {x:-1, y:-1}, {x:0, y:1}],
      3:[{x:0, y:0}, {x:0, y:-1}, {x:1, y:-1}, {x:-1, y:0}],
      color:'#FF8000'
  },
  {//7번 블록 : 역 ㄴㄱ모양
      0:[{x:0, y:0}, {x:1, y:0}, {x:1, y:-1}, {x:0, y:1}],
      1:[{x:0, y:0}, {x:-1, y:0}, {x:0, y:1}, {x:1, y:1}],
      2:[{x:0, y:0}, {x:1, y:0}, {x:1, y:-1}, {x:0, y:1}],
      3:[{x:0, y:0}, {x:-1, y:0}, {x:0, y:1}, {x:1, y:1}],
      color:'#ABFF00'
  }
];

let tetris_canvas_w = blockSize * 10; //캔버스 너비
let tetris_canvas_h = blockSize * 20; //캔버스 높이
 
tetris_canvas.width = tetris_canvas_w; //캔버스 너비 지정
tetris_canvas.height = tetris_canvas_h; //캔버스 높이 지정

let x = (tetris_canvas_w / 2) - blockSize; //블록 x좌표
let y = -30 - (getXY(blockNumber, blockTurn).maxY * blockSize); //블록 y좌표
let moveY = 0; //사용자가 움직인 x좌표
let moveX = 0; //사용자가 움직인 y좌표

    
function gameStart(){
    document.getElementById('game-start-btn').disabled = true;
    drawBlock();
}
drawBlock();
function drawBlock() {      
    let frame = setInterval(()=>{
        document.onkeydown = checkKey;
        moveY+=1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < 4; i++){
            let blockInfo = block[blockNumber][blockTurn][i]; //현재 화면에 있는 블록 정보
            ctx.fillStyle = block[blockNumber].color;
            ctx.fillRect (x + (blockSize * blockInfo.x) + moveX, y + (blockSize * blockInfo.y) + moveY, blockSize, blockSize);
            ctx.fillStyle = "rgb(10,0,0)";
            ctx.strokeRect(x + (blockSize * blockInfo.x) + moveX, y + (blockSize * blockInfo.y) + moveY, blockSize, blockSize);
        }
        
        if(tetris_canvas_h - (getXY(blockNumber, blockTurn).maxY * blockSize) == moveY) clearInterval(frame);
    }, 10);
  }

  function checkKey(e) {

      e = e || window.event;

      switch(e.keyCode){
        case 38: //윗쪽 방향키
          blockTurn++;
          if(blockTurn == 4) blockTurn = 0;
          let XYInfo = getXY(blockNumber, blockTurn);
          if(moveX + (XYInfo.minX * blockSize) < -120) moveX-= (moveX + (XYInfo.minX * blockSize)) + 120;
          if(moveX + (XYInfo.maxX * blockSize) > 150) moveX-= (moveX + (XYInfo.maxX * blockSize)) - 150;
          break;
        case 40: //아랫쪽 방향키
          moveY+=30;
          if(moveY >= 570) moveY+= (570 - moveY) - (getXY(blockNumber, blockTurn).maxY * blockSize);
          break;
        case 37: //왼쪽 방향키
          if( moveX + (getXY(blockNumber, blockTurn).minX * blockSize) <= -120) return;
          moveX-=30;
          break;
        case 39: //오른쪽 방향키
          if( moveX + (getXY(blockNumber, blockTurn).maxX * blockSize) >= 150) return;
          moveX+=30;
          break;
        case 32: //스페이스 바
          moveY+= (570 - moveY) - (getXY(blockNumber, blockTurn).maxY * blockSize);
          break;
      }

  }

  function getXY(blockNumber, blockTurn){
    let maxX = 0;
    let minX = 0;
    let maxY = 0;
    block[blockNumber][blockTurn].forEach(e => {
      if(maxX < e.x) maxX = e.x;
      if(minX > e.x) minX = e.x;
      if(maxY < e.y) maxY = e.y;
    });
    return {maxX:maxX, minX:minX, maxY:maxY};
  }

//   class Box {
//       constructor() {
//         this.box = this.pack;
//       }

//       get next() {
//           if(this.box.length < 1) {
//               this.box = this.pack;
//           }
//           const max = this.box.length;
//           const index = Math.floor(Math.random() * max);
//           const item = this.box[index];
//           this.box.splice(index, 1);
//           return item;
//       }
      
//       get pack() {
//           return [0,1,2,3,4,5,6];
//     }
//   }

//   const box = new Box();
//   console.log("next: " + box.pop);
//   console.log(box.box);
//   // prortotype + function + object

//   const box2 = (class {
//     constructor() {
//       this.box = this.pack;
//     }

//     get next() {
//         if(this.box.length < 1) {
//             this.box = this.pack;
//         }
//         const max = this.box.length;
//         const index = Math.floor(Math.random() * max);
//         const item = this.box[index];
//         this.box.splice(index, 1);
//         return item;
//     }
    
//     get pack() {
//         return [0,1,2,3,4,5,6];
//   }
// })();