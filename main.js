let tetrisCanvas = document.getElementById("canvas"); //캔버스 객체 가져오기
let ctx = tetrisCanvas.getContext("2d"); //캔버스에 2D객체 생성

let blockSize = 30; //블록 하나 크기
let blockNumber = 0; //블록 종류
let blockTurn = 0; //블록 회전

let block = [ //블록
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

tetrisCanvas.width = blockSize * 10; //캔버스 너비 지정
tetrisCanvas.height = blockSize * 20; //캔버스 높이 지정

let firstX = (tetrisCanvas.width / 2) - blockSize; //처음 블록 x 좌표를 설정하는 값
let x = firstX; //블록 x좌표
// let y = -blockSize - (getXY(blockNumber, blockTurn).maxY * blockSize); //블록 y좌표
let y = 0; //블록 y좌표
let moveY = 0; //사용자가 움직인 x좌표
let moveX = 0; //사용자가 움직인 y좌표
let overlapBlockList = []; //랜덤으로 나오는 블럭이 중복되지 않기 위해서 사용하는 리스트
let frame; //블록을 1초마다 내리는 프레임을 저장하는 변수

let tetrisCanvasAddress = new Array(20); // 테트리스 판에 블록 좌표를 저장하는 2차원 리스트
for(let i = 0; i< tetrisCanvasAddress.length; i++){
    tetrisCanvasAddress[i] = new Array(10);
    for(let j = 0; j < tetrisCanvasAddress[i].length; j++){
        tetrisCanvasAddress[i][j] = -1;
    }
}

function gameStart(){ //게임을 시작하는 함수
    document.getElementById('game-start-btn').disabled = true;
    randomBlock();
}

function randomBlock(){ //블록을 랜덤으로 지정해주는 함수
  moveY = 0;
  moveX = 0;
  blockTurn = 0;
  if(overlapBlockList.length == 7) overlapBlockList = [];
  let randomNum = Math.ceil(Math.random() * 7 - 1);
  if(overlapBlockList.find(x => x == randomNum) != undefined) randomBlock();
  else{
    overlapBlockList[overlapBlockList.length] = randomNum;
    blockNumber = randomNum;
    setFrame();
  }
}

function setFrame() { //블록을 내리는 인터벌
    frame = setInterval(()=>{
      document.onkeydown = checkKey;
      if(!blockHitY()){
        clearInterval(frame);
        blockAddress();
        randomBlock();
      }else{
        moveY+=blockSize;
        drawBlock(); 
      }
    }, 1000);
  }

  function checkKey(e) { //키 입력을 체크하고 블록을 조종하는 함수
      e = e || window.event;
      let XYInfo = getXY(blockNumber, blockTurn);

      if(!blockHitY()){
        clearInterval(frame);
        blockAddress();
        randomBlock();
      }else{
        switch(e.keyCode){
          case 38: //윗쪽 방향키
            blockTurn++;
            if(blockTurn == 4) blockTurn = 0;
            XYInfo = getXY(blockNumber, blockTurn);
            if(moveX + (XYInfo.minX * blockSize) < -firstX) moveX-= (moveX + (XYInfo.minX * blockSize)) + firstX;
            if(moveX + (XYInfo.maxX * blockSize) > firstX + blockSize) moveX-= (moveX + (XYInfo.maxX * blockSize)) - (firstX + blockSize);
            break;
          case 40: //아랫쪽 방향키
            moveY+=blockSize;
            break;
          case 37: //왼쪽 방향키
            if( moveX + (XYInfo.minX * blockSize) <= -firstX) return;
            moveX-=blockSize;
            break;
          case 39: //오른쪽 방향키
            if( moveX + (XYInfo.maxX * blockSize) >= firstX + blockSize) return;
            moveX+=blockSize;
            break;
          case 32: //스페이스 바
            // moveY+=((tetrisCanvas.height - blockSize) - moveY) - (XYInfo.maxY * blockSize);
            let stop = true;
            while(stop){
              if(blockHitY()) moveY+=blockSize;
              else stop = false;;
            }
            break;
        }
        drawBlock(); 
      }
  }

  function drawBlock(){ //블록을 그리는 함수
    ctx.clearRect(0, 0, tetrisCanvas.width, tetrisCanvas.height);
    for(let i = 0; i < 4; i++){
        let blockX = x + (blockSize * block[blockNumber][blockTurn][i].x) + moveX; //다음 블록 X위치
        let blockY = y + (blockSize * block[blockNumber][blockTurn][i].y) + moveY; //다음 블록 Y위치

        ctx.fillStyle = block[blockNumber].color;
        ctx.fillRect (blockX, blockY, blockSize, blockSize);
        ctx.fillStyle = "rgb(10,0,0)";
        ctx.strokeRect(blockX, blockY, blockSize, blockSize);
    }

    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 10; j++){
        if(tetrisCanvasAddress[i][j] != -1){
          let blockX = x + ( (blockSize * j) - firstX );
            let blockY = y + (blockSize * i);
    
            ctx.fillStyle = block[tetrisCanvasAddress[i][j]].color;
            ctx.fillRect (blockX, blockY, blockSize, blockSize);
            ctx.fillStyle = "rgb(10,0,0)";
            ctx.strokeRect(blockX, blockY, blockSize, blockSize);
        }
      }
    }

    for(let i = 0; i < 20; i++){
      for(let j = 0; j < 10; j++){
        ctx.strokeRect(blockSize * j, blockSize * i, blockSize, blockSize);
      }
    }
    
    if( (tetrisCanvas.height - blockSize) - (getXY(blockNumber, blockTurn).maxY * blockSize) <= moveY){
      clearInterval(frame);
      blockAddress();
      randomBlock();
    } 
  }

  function blockAddress(){ //블록의 위치를 2차원 리스트에 저장하는 함수
    let blockAddressX = (moveX + firstX) / blockSize; //현재 블록 x 위치
    let blockAddressY = moveY / blockSize; //현재 블록 y 위치

    block[blockNumber][blockTurn].forEach((e)=>{
      tetrisCanvasAddress[blockAddressY + e.y][blockAddressX + e.x] = blockNumber;
    });
  }

  function blockHitX(){ //블록 충돌을 구현하는 함수
    let blockHitResult = true;
    let blockAddressX = (moveX + firstX) / blockSize; //현재 블록 x 위치
    let blockAddressY = moveY / blockSize; //현재 블록 y 위치
    
    block[blockNumber][blockTurn].forEach((e)=>{
      if(tetrisCanvasAddress[blockAddressY + e.y][blockAddressX + e.x] > -1) blockHitResult = false;
    });

    return blockHitResult;
  }

  function blockHitY(){ //블록 충돌을 구현하는 함수
    let blockHitResult = true;
    let blockAddressX = (moveX + firstX) / blockSize; //현재 블록 x 위치
    let blockAddressY = moveY / blockSize; //현재 블록 y 위치
    
    if(blockAddressY + getXY(blockNumber, blockTurn).maxY == 19) return;
    block[blockNumber][blockTurn].forEach((e)=>{
      if(tetrisCanvasAddress[blockAddressY + e.y + 1][blockAddressX + e.x] > -1) blockHitResult = false;
   });
    
    return blockHitResult;
  }

  function getXY(blockNumber, blockTurn){ //현재 블록의 XY값을 가져오는 함수
    let maxX = 0;
    let minX = 0;
    let maxY = 0;
    let minY = 0;
    block[blockNumber][blockTurn].forEach(e => {
      if(maxX < e.x) maxX = e.x;
      if(minX > e.x) minX = e.x;
      if(maxY < e.y) maxY = e.y;
      if(minY > e.y) minY = e.y;
    });
    return {maxX:maxX, minX:minX, maxY:maxY, minY:minY};
  }