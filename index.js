// JavaScript Document
var img = document.getElementsByTagName('img');
//img[0].style.border='solid 1px';
console.log(img.length)
for(var i = 0;i<img.length;i++){
	if(i==0 || i== 4 || i==11 || i==13 ||i==15 ||i==17 ||i==19 ||i==21 ||i==23 ||i==30||i==34){
		img[i].src='img/bullet_1216704_easyicon.net.svg';
		img[i].className='supply';
		img[i].id='supply';
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
var cLeft = 460;
var cTop = 160;
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
			if(cLeft>460){
				cLeft-=x;
				index--;
			}
			cursor.style.left=cLeft+'px';
			//console.log(index);
			break;
		case 38://上
			if(cTop>160){
				cTop-=y;
				index-=5;
				}
			cursor.style.top=cTop+'px';
			break;
		case 39://右
			if(cLeft<460+x*4){
				cLeft+=x;
				index++;
			}
			cursor.style.left=cLeft+'px';
			break;
		case 40://下
			if(cTop<160+y*6){
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
			if(cLeft>460 && isChess(index) && isMyChess(index)==turn){
				console.log("moving")
				moveChess(index,'left');
			}
			break;
		case 49:
			console.log('haha');
			console.log(isHQEmpty('White'));
			createChess(0);
			break;
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
				var temp = img[i].src;
				var tempId = img[i].getAttribute('id');
				//console.log(tempId);
				//console.log(isChess(i-1));
				//console.log(isEnemy(i,i-1));
				//是敌人的时候
				if(isChess(i-1) && isEnemy(i,i-1)){
					var battle = fight(i,i-1);
					//console.log(battle);
					if(battle==1){
						//console.log(img[i].src);
						img[i].src=blank;
						//console.log(img[i].src);
						img[i].id='blank';
						//console.log(img[i].id);
						img[i-1].src=temp;
						img[i-1].id=tempId;
						if(isSupply(i-1)){
							addSupply();
						}
					}else if(battle==-1)
						img[i].src=blank;
					else if(battle==0)
						{
							img[i].src=blank;
							img[i-1].src=blank;
						}
					turn=!turn;
				}
				//TODO 判断不为敌人的时候的移动逻辑
				else if(isChess(i-1)){
					//不为敌人，且存在友方棋子，不做动作
					console.log('turn= '+turn);
				}
				else {
					if(isSupply(i-1) && img[i].className=='pawn'){
							addSupply();
						console.log('baise'+supplyWhite);
						console.log('heise'+supplyBlack);
						}
					img[i].src=blank;
					img[i].id='blank';
					img[i-1].src=temp;
					img[i-1].id=tempId;
					turn=!turn;
				}
				break;
		}
}
function fight(a,b){
	//a向b攻击
	var aa = str(a);
	var bb = str(b);
	//1 胜利 -1 失败 0 同归于尽
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
	if(img[i].className=='supply')
		return true;
	else return false;
}
function addSupply(){
	//false 白色 true 黑色
	if(turn == false){
		supplyWhite++;
	}else supplyBlack++;
}
function useSupply(i,t){
	if(t==false){
		supplyWhite-=i;
	}else{
		supplyBlack-=i;
	}
}
function createChess(i){
	//士兵、骑士和炸弹一费 女王两费
	//士兵、骑士、女王、炸弹 0-3
	var who;
	var supply;
	var id;
	if(turn == true){
		//黑色棋子
		if(i==2 && supplyBlack>=2 && isHQEmpty('Black')){//女王
	   		img[2].src='img/queen_512px_1125651_easyicon.net.png';img[32].className='queen';img[2].id='chessBlack';
			useSupply(2,turn);
		}else if(i==1 && supplyBlack>=1 && isHQEmpty('Black')){//骑士
			img[2].src='img/knight_512px_1125490_easyicon.net.png';img[32].className='knight';img[2].id='chessBlack';
			useSupply(1,turn);
		}else if(i==0 && supplyBlack>=1 && isHQEmpty('Black')){//士兵
			img[2].src='img/pawn_512px_1125604_easyicon.net.png';img[32].className='pawn';img[2].id='chessBlack';
			useSupply(1,turn);
		}else{
			//炸弹
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
		}
	}
}
function isHQEmpty(who){
	var i;
	if(who=='White')
		i = 2;
	else i = 32;
	if(img[i].getAttribute('id')=='blank')
		return true;
	else return false;
}