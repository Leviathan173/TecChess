// JavaScript Document
var img = document.getElementById("box").children;
var spl = document.getElementById("box2").children;
for(var i = 0;i<spl.length;i++){
	spl[i].className='blank';
	spl[i].id='blank';
	spl[i].src='img/blank.png'
}
//img[0].style.border='solid 1px';
console.log(img.length)
for(var i = 0;i<img.length;i++){
	if(i==0 || i== 4 || i==11 || i==13 ||i==15 ||i==17 ||i==19 ||i==21 ||i==23 ||i==30||i==34){
		spl[i].src='img/bullet_1216704_easyicon.net.svg';
		spl[i].className='supply';
		spl[i].id='supply';
		img[i].className='blank';
		img[i].src='img/blank.png'
		//img[i].setAttribute('align','middle');
	}else if(i==1)
		{img[i].src='img/pawn_512px_1169133_easyicon.net.png';img[i].className='pawn';img[i].id='chessBlack';}
	else if(i==3)
		{img[i].src='img/knight_512px_1101662_easyicon.net.png';img[i].className='knight';img[i].id='chessBlack';}
	else if(i==2)
		{img[i].src='img/queen_512px_1169135_easyicon.net.png';img[i].className='queen';img[i].id='chessBlack';}
	else if(i==31)
		{img[i].src='img/knight_512px_1125490_easyicon.net.png';img[i].className='knight';img[i].id='chessWhite';}
	else if(i==32)
		{img[i].src='img/queen_512px_1125651_easyicon.net.png';img[i].className='queen';img[i].id='chessWhite';}
	else if(i==33)
		{img[i].src='img/pawn_512px_1125604_easyicon.net.png';img[i].className='pawn';img[i].id='chessWhite';}
	else{
		img[i].className='blank';
		img[i].src='img/blank.png'
	}
		
}

var cursor = document.getElementById('cursor');
var score = document.getElementsByTagName("p");
var tip = document.getElementById("b");
console.log(tip.innerText);
console.log(score)
var cLeft = 680;
var cTop = -35;
var x = 104;
var y = 104;
var blank = 'img/blank.png';
var supplyWhite = 0;
var supplyBlack = 0;
var turn = false;
var index = 0;
var chess = new Array(0,1,2,3);
console.log(chess);
//console.log(img)
document.onkeydown=function(e){
	//console.log(e.keyCode)
	switch(e.keyCode){
		case 37://左
			if(cLeft>680){
				cLeft-=x;
				index--;
			}
			cursor.style.left=cLeft+'px';
			//console.log(index);
			break;
		case 38://上
			if(cTop>-35){
				cTop-=y;
				index-=5;
				}
			cursor.style.top=cTop+'px';
			break;
		case 39://右
			if(cLeft<680+x*4){
				cLeft+=x;
				index++;
			}
			cursor.style.left=cLeft+'px';
			break;
		case 40://下
			if(cTop<-35+y*6){
				cTop+=y;
				index+=5;
			}
			cursor.style.top=cTop+'px';
			break;
			//移动的时候还需要判断是谁的回合

		case 65://a
			//console.log(cLeft>460)
			//console.log(isChess(index))
			console.log(isMyChess(index));
			if(cLeft>680 && isChess(index) && isMyChess(index)==turn){
				console.log("moving")
				moveChess(index,'left');
			}
			break;
		case 87://w
			//console.log(cLeft>460)
			//console.log(isChess(index))
			console.log(isMyChess(index));
			if(cTop>-35 && isChess(index) && isMyChess(index)==turn){
				console.log("moving")
				moveChess(index,'up');
			}
			break;
		case 83://s
			//console.log(cLeft>460)
			//console.log(isChess(index))
			console.log(isMyChess(index));
			if(cTop<-35+y*6 && isChess(index) && isMyChess(index)==turn){
				console.log("moving")
				moveChess(index,'down');
			}
			break;
		case 68://d
			//console.log(cLeft>460)
			//console.log(isChess(index))
			console.log(isMyChess(index));
			if(cLeft<680+x*4 && isChess(index) && isMyChess(index)==turn){
				console.log("moving")
				moveChess(index,'right');
			}
			break;
			//			49: '1', 士兵
			//			50: '2', 骑士
			//			51: '3', 皇后
			//			52: '4', 炸弹
		case 49:
			createChess(0);
			break;
		case 50:
			createChess(1);
			break;
		case 51:
			createChess(2);
			break;
		case 52:
			createChess(9);
			break;
		case 13:
			endTurn();
			
			break;
	}
}
function endTurn(){
	turn=!turn;
	if(turn==false){
		 tip.innerText='白色的回合';
	}else {
		tip.innerText='黑色的回合';
	}
}
function isChess(i){
	//console.log(i);
	if(img[i].getAttribute('id')=='chessBlack' || img[i].getAttribute('id')=='chessWhite'){
		return true;
	}else return false;
}

function isEnemy(a,b){
	if(img[a].id==img[b].id)
		return false;
	else return true;
}
function isMyChess(i){
	//false 白色 true 黑色
	if(img[i].getAttribute('id')=='chessBlack'){
		return true;
	}else return false;
}
function moveChess(i,to){
	//console.log('turn= '+turn);
		console.log(i);
		switch(to){
				case 'left':
				move(i,-1);
				break;
				case 'up':
				move(i,-5);
				break;
				case 'down':
				console.log('xia');
				move(i,5);
				break;
				case 'right':
				move(i,1);
				break;
		}
}
function move(i,n){
				var temp = img[i].src;
				var tempId = img[i].getAttribute('id');
				var tempClassName = img[i].className;
				//console.log(tempId);
				//console.log(isChess(i-1));
				//console.log(isEnemy(i,i-1));
				//是敌人的时候
				if(isChess(i+n) && isEnemy(i,i+n)){
					var battle = fight(i,i+n);
					//console.log(battle);
					if(battle==1){
						//console.log(img[i].src);
						img[i].src=blank;
						//console.log(img[i].src);
						img[i].id='blank';
						img[i].className='blank';
						//console.log(img[i].id);
						img[i+n].src=temp;
						img[i+n].id=tempId;
						img[i+n].className=tempClassName;
						if(isSupply(i+n)){
							addSupply();
						}
					}else if(battle==-1)
						img[i].src=blank;
					else if(battle==0)
						{
							img[i].src=blank;
							img[i].className='blank';
							img[i].id = 'blank';
							img[i+n].id='blank';
							img[i+n].src=blank;
							img[i+n].className='blank';
						}
					endTurn();
					isEnd();
				}
				//TODO 判断不为敌人的时候的移动逻辑
				else if(isChess(i+n)){
					//不为敌人，且存在友方棋子，不做动作
					console.log('turn= '+turn);
				}
				else {
					if(isSupply(i+n) && img[i].className=='pawn'){
						//console.log(img[i].className);
							addSupply();
							spl[i+n].src=blank;
							spl[i+n].className='blank';
							spl[i].id='blank';
						//console.log('baise'+supplyWhite);
						//console.log('heise'+supplyBlack);
						}
					img[i].src=blank;
					img[i].className='blank';
					img[i].id = 'blank';
					img[i+n].src=temp;
					img[i+n].id=tempId;
					img[i+n].className=tempClassName;
					endTurn();
					isEnd();
				}
}
function isEnd(){
	if(img[2].id=='chessWhite' && img[2].className!='boom'){
		alert('白色胜利！1');
	}else if(img[32].id=='chessBlack' && img[32].className!='boom'){
		alert('黑色胜利！1');
	}
	var white = document.getElementById("chessWhite");
	var black = document.getElementById("chessBlack");
	if(white==null && black.length!=null){
		alert('黑色胜利！');
	}else if(black==null && white!=null){
		alert('白色胜利！');
	}else if(black==null && white==null){
		alert('平局');
	}
}
function fight(a,b){
	//a向b攻击
	var aa = str(a);
	var bb = str(b);
	//1 胜利 -1 失败 0 同归于尽
	if(aa==9 || bb==9)
		return 0;
	if(aa>bb)
		return 1;
	else if(aa<bb)
		return -1;
	else return 0;
}
function str(i){
	if(img[i].className=='pawn')
		return 1;
	else if(img[i].className=='knight')
		return 2;
	else if(img[i].className=='queen')
		return 3;
	else if(img[i].className=='boom')
		return 9;
}
function isSupply(i){
	if(spl[i].className=='supply')
		return true;
	else return false;
}
function addSupply(){
	//false 白色 true 黑色
	if(turn == false){
		supplyWhite++;
		score[1].innerText='补给：'+supplyWhite;
	}else{
		supplyBlack++;
		score[0].innerText='补给：'+supplyBlack;
	} 
}
function useSupply(i,t){
	if(t==false){
		supplyWhite-=i;
		score[1].innerText='补给：'+supplyWhite;
	}else{
		supplyBlack-=i;
		score[0].innerText='补给：'+supplyBlack;
	}
}
function createChess(i){
	//士兵、骑士和炸弹一费 女王两费
	//士兵、骑士、女王、炸弹 0-3
	var who;
	var supply;
	var id;
	console.log('黑色HQ'+isHQEmpty('Black'));
	console.log('白色HQ'+isHQEmpty('White'));
	if(turn == true){
		//黑色棋子
		if(i==2 && supplyBlack>=2 && isHQEmpty('Black')){//女王
	   		img[2].src='img/queen_512px_1169135_easyicon.net.png';img[2].className='queen';img[2].id='chessBlack';
			useSupply(2,turn);
		}else if(i==1 && supplyBlack>=1 && isHQEmpty('Black')){//骑士
			img[2].src='img/knight_512px_1101662_easyicon.net.png';img[2].className='knight';img[2].id='chessBlack';
			useSupply(1,turn);
		}else if(i==0 && supplyBlack>=1 && isHQEmpty('Black')){//士兵
			img[2].src='img/pawn_512px_1169133_easyicon.net.png';img[2].className='pawn';img[2].id='chessBlack';
			useSupply(1,turn);
		}else{
			//炸弹
			img[2].src='img/GeliyaA.gif';img[2].className='boom';img[2].id='chessBlack';
			useSupply(1,turn);
		}
	}
	else {
		//白色棋子
		if(i==2 && supplyWhite>=2 && isHQEmpty('White')){//女王
	   		img[32].src='img/queen_512px_1125651_easyicon.net.png';img[32].className='queen';img[32].id='chessWhite';
			useSupply(2,turn);
		}else if(i==1 && supplyWhite>=1 && isHQEmpty('White')){//骑士
			img[32].src='img/knight_512px_1125490_easyicon.net.png';img[32].className='knight';img[32].id='chessWhite';
			useSupply(1,turn);
		}else if(i==0 && supplyWhite>=1 && isHQEmpty('White')){//士兵
			img[32].src='img/pawn_512px_1125604_easyicon.net.png';img[32].className='pawn';img[32].id='chessWhite';
			useSupply(1,turn);
		}else{
			//炸弹
			img[32].src='img/GeliyaA.gif';img[32].className='boom';img[32].id='chessWhite';
			useSupply(1,turn);
		}
	}
}
function isHQEmpty(who){
	var i;
	if(who=='White')
		i = 32;
	else i = 2;
	if(img[i].getAttribute('id')=='blank')
		return true;
	else return false;
}
/*setInterval(function(){
	if(turn==false){
		 tip.innerText='白色的回合';
	}else {
		tip.innerText='黑色的回合';
	}
	var countw = 0;
	var countb =0;
	for(var i = 0;i<img.length;i++){
		if(img[i].id=='chessWhite')
		countw++;
		else if(img[i].id=='chessBlack')
		countb++;
	}
	if(countb==0 && countw!=0){
		alert('白色胜利！');
	}else if(countb!=0 && countw==0){
		alert('黑色胜利!');
	}else if(countb==countw==0){
		alert('平局');
	}else if(img[2].id='chessWhite' && img[2].className!='boom'){
		alert('白色胜利！');
	}else if(img[32].id='chessWhite' && img[2].className!='boom'){
		alert('白色胜利！');
	}
},100)*/
