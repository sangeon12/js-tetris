let ctx = document.getElementById("canvas").getContext("2d");

let x = 120;
let y = 100;
let moveY = 0;
let moveX = 0;
let blockNumber = 2;
let blockTurn = 0;

let block = [
    {//1번 블록 : ㅗ모양
        0:[{x:x, y:y}, {x:x + 30, y:y}, {x:x, y:y - 30}, {x:x - 30, y:y}],
        1:[{x:x, y:y},{x:x, y:y + 30},{x:x + 30, y:y},{x:x, y:y - 30}],
        2:[{x:x, y:y}, {x:x - 30, y:y}, {x:x, y:y + 30}, {x:x + 30, y:y}],
        3:[{x:x, y:y}, {x:x, y:y - 30}, {x:x - 30, y:y}, {x:x, y:y + 30}]
    },
    {//2번 블록 : ㅡ모양
        0:[{x:x, y:y}, {x:x - 30, y:y}, {x:x + 30, y:y}, {x:x + 60, y:y}],
        1:[{x:x, y:y},{x:x, y:y + 30},{x:x, y:y+60},{x:x, y:y - 30}],
        2:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 60, y:y}, {x:x + 30, y:y}],
        3:[{x:x, y:y}, {x:x, y:y - 30}, {x:x, y:y - 60}, {x:x, y:y + 30}]
    },
    {//3번 블록 : ㄴ모양
        0:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y -30}, {x:x + 30, y:y}],
        1:[{x:x, y:y},{x:x, y:y - 30},{x:x + 30, y:y-30},{x:x, y:y + 30}],
        2:[{x:x, y:y}, {x:x + 30, y:y}, {x:x + 30, y:y+30}, {x:x - 30, y:y}],
        3:[{x:x, y:y}, {x:x, y:y + 30}, {x:x-30, y:y + 30}, {x:x, y:y - 30}]
    },
    {//4번 블록 : 역 ㄴ모양
        0:[{x:x, y:y}, {x:x - 30, y:y}, {x:x + 30, y:y}, {x:x + 30, y:y-30}],
        1:[{x:x, y:y},{x:x, y:y - 30},{x:x, y:y+30},{x:x+30, y:y + 30}],
        2:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y+30}, {x:x + 30, y:y}],
        3:[{x:x, y:y}, {x:x, y:y - 30}, {x:x-30, y:y - 30}, {x:x, y:y + 30}]
    },
    {//5번 블록 : ㅁ모양
        0:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y-30}, {x:x, y:y-30}],
        1:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y-30}, {x:x, y:y-30}],
        2:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y-30}, {x:x, y:y-30}],
        3:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y-30}, {x:x, y:y-30}]
    },
    {//6번 블록 : ㄴㄱ모양
        0:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y-30}, {x:x, y:y+30}],
        1:[{x:x, y:y}, {x:x, y:y-30}, {x:x + 30, y:y-30}, {x:x -30, y:y}],
        2:[{x:x, y:y}, {x:x - 30, y:y}, {x:x - 30, y:y-30}, {x:x, y:y+30}],
        3:[{x:x, y:y}, {x:x, y:y-30}, {x:x + 30, y:y-30}, {x:x -30, y:y}]
    },
    {//7번 블록 : 역 ㄴㄱ모양
        0:[{x:x, y:y}, {x:x + 30, y:y}, {x:x + 30, y:y-30}, {x:x, y:y+30}],
        1:[{x:x, y:y}, {x:x-30, y:y}, {x:x, y:y+30}, {x:x +30, y:y+30}],
        2:[{x:x, y:y}, {x:x + 30, y:y}, {x:x + 30, y:y-30}, {x:x, y:y+30}],
        3:[{x:x, y:y}, {x:x-30, y:y}, {x:x, y:y+30}, {x:x +30, y:y+30}]
    }
];
    
function gameStart(){
    document.getElementById('game-start-btn').disabled = true;
    drawBlock();
}
drawBlock();
function drawBlock() {      
    let frame = setInterval(()=>{
        document.onkeydown = checkKey;
        // moveY+=1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let i = 0; i < 4; i++){
            let blockInfo = block[blockNumber][blockTurn][i]; //현재 화면에 있는 블록 정보
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect (blockInfo.x + moveX, blockInfo.y + moveY, 30, 30);
            ctx.fillStyle = "rgb(10,0,0)";
            ctx.strokeRect(blockInfo.x + moveX, blockInfo.y + moveY, 30, 30);
        }

        if(moveY === 540) clearInterval(frame);
    }, 10);
  }

  function checkKey(e) {

      e = e || window.event;
      let nowBlockX = x - moveX;//현재 블록 x 좌표

      if (e.keyCode == '38') { //윗쪽 방향키
          blockTurn++;
          if(blockTurn == 4) blockTurn = 0;
      }else if (e.keyCode == '40') {//아랫쪽 방향키
          moveY+=30;
      }else if (e.keyCode == '37') {//왼쪽 방향키
          moveX-=30;
      }else if (e.keyCode == '39') {//오른쪽 방향키
        if(nowBlockX == 0 || nowBlockX - 30 == 0 || nowBlockX - 60 == 0 || nowBlockX - 90 == 0) return;
          moveX+=30;
      }else if(e.keyCode == "32"){
          
      }

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