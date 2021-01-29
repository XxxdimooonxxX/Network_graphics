//////////////////////////////////////////////////////////////////////////////////////////
//																						//
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Global variable: ///////////////////////////////////////////////
var canvas	= document.querySelector("#canvas");		//get element canvas
var ctx		= canvas.getContext('2d');					//get context

//MAIN object
function rebro(a, b, weight, arr){
	this.a = a;
	this.b = b;
	this.check = true;//нахрен не нужон
	this.weight = weight;
	this.arr = arr;
}
arr_rebra = new Array(11);
arr_rebra[0] = new rebro(0, 1, 5, null);
arr_rebra[1] = new rebro(0, 3, 8, null);
arr_rebra[2] = new rebro(0, 2, 3, null);
arr_rebra[3] = new rebro(1, 4, 6, [0]);
arr_rebra[4] = new rebro(1, 3, 4, [0]);
arr_rebra[5] = new rebro(2, 3, 1, [2]);
arr_rebra[6] = new rebro(3, 4, 2, [1, 4, 5]);
arr_rebra[7] = new rebro(3, 6, 6, [1, 4, 5]);
arr_rebra[8] = new rebro(4, 6, 3, [3, 6]);
arr_rebra[9] = new rebro(2, 5, 9, [2]);
arr_rebra[10] = new rebro(5, 6, 7, [9]);
//////////////////////////////////////////////
var points = new Array(7);	//местоположение точки
//местоположене точки в canvas,
var aa = 0, bb = 0;
for(i = 0; i < 7; i++){
	points[i] = new Array(2);
	
	if(i == 0){
		aa = i*150;
		bb = canvas.height/2;
	}else if(i == 1 || i == 2){
		aa = 1*150;
		if(i == 1){
			bb = canvas.height/3;
		}else{
			bb = canvas.height/1.5;
		}
	}else if(i == 3){
		aa = 2*150;
		bb = canvas.height/2;
	}else if(i == 4 || i == 5){
		aa = 3*150;
		if(i == 4){
			bb = canvas.height/3;
		}else{
			bb = canvas.height/1.5;
		}
	}else{
		aa = 4*150;
		bb = canvas.height/2;
	}
	
	for(j = 0; j < 2; j++){
		if(j == 0){
			points[i][j] = aa + 50;
		}else{
			points[i][j] = bb;
		}
	}
}

//points[6][0] = 800;
//points[6][1] = 800;

//функция рисования стрелки
function draw_arow(x1, y1, x2, y2){
	var headlen = 10;   // length of head in pixels
    var angle = Math.atan2(y2-y1,x2-x1);
	
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2.0;
	
	ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x2-headlen*Math.cos(angle-Math.PI/6),y2-headlen*Math.sin(angle-Math.PI/6));
		ctx.moveTo(x2, y2);
		ctx.lineTo(x2-headlen*Math.cos(angle+Math.PI/6),y2-headlen*Math.sin(angle+Math.PI/6));
	ctx.stroke();
}

//рисуем точки
for(i = 0; i < 7; i++){
	ctx.beginPath();
	ctx.strokeStyle = "#ff0000";
	ctx.arc(points[i][0], points[i][1], 50, 0, Math.PI*2, false);
	ctx.stroke();
	
	ctx.font = "30px serif";
	ctx.fillText(i, points[i][0], points[i][1]);
}

//рисуем стрелки
var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
for(i = 0; i < 11; i++){
	var angle = Math.atan2(points[arr_rebra[i].b][1] - points[arr_rebra[i].a][1], points[arr_rebra[i].b][0] - points[arr_rebra[i].a][0]);//выщитываем угол, в котором начинается при пересечении окружности стрелка, а также это угол где при пересечении другой окружности заканчивается стрелка
	if(points[arr_rebra[i].a][0] < points[arr_rebra[i].b][0]){//если x1 дальше x2
		if(points[arr_rebra[i].a][1] > points[arr_rebra[i].b][1]){//если y1 выше y2, то
			//для начальной точки
			x1 = Math.cos(angle + Math.PI*2)*50;	//"передвигаем" точку х1 вправо
			y1 = Math.sin(angle - Math.PI*2)*50;	//"передвигаем" точку у1 вверх
			//для конечной точки
			x2 = Math.cos(angle - Math.PI*2)*50;	//"передвигаем" точку х2 влево
			y2 = Math.sin(angle + Math.PI*2)*50;	//"передвигаем" точку у2 вниз
		}else{
			x1 = Math.cos(angle + Math.PI*2)*50;
			y1 = Math.sin(angle + Math.PI*2)*50;
			x2 = Math.cos(angle - Math.PI*2)*50;
			y2 = Math.sin(angle - Math.PI*2)*50;
		}
	}else{
		//on future
		if(points[arr_rebra[i].a][1] > points[arr_rebra[i].b][1]){
			x1 = Math.cos(angle - Math.PI*2)*50;
			y1 = Math.sin(angle - Math.PI*2)*50;
			x2 = Math.cos(angle + Math.PI*2)*50;
			y2 = Math.sin(angle + Math.PI*2)*50;
		}else{
			x1 = Math.cos(angle - Math.PI*2)*50;
			y1 = Math.sin(angle + Math.PI*2)*50;
			x2 = Math.cos(angle + Math.PI*2)*50;
			y2 = Math.sin(angle - Math.PI*2)*50;
		}
	}
	draw_arow(points[arr_rebra[i].a][0]+x1, points[arr_rebra[i].a][1]+y1, points[arr_rebra[i].b][0]-x2, points[arr_rebra[i].b][1]-y2);
}

//drag and move
canvas.onmousemove = bt_click;
function bt_click(key){
	//alert(1);
	if(key.which == 1){
		var p = document.querySelector("p");
		p.innerHTML = "x = " + key.pageX + " y = " + key.pageY;
		
		for(i = 0; i < 7; i++){
			if(((key.pageX >= points[i][0]-50) && (key.pageX <= points[i][0]+50) ) && ((key.pageY >= points[i][1]-50) && (key.pageY <= points[i][1]+50))){
				points[i][0] = key.pageX;
				points[i][1] = key.pageY;
			}
		}
		
		
		
		//////////////////////////
		//clear canvas
		ctx.beginPath();
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		//рисуем точки
		for(i = 0; i < 7; i++){
			ctx.beginPath();
			ctx.strokeStyle = "#ff0000";
			ctx.arc(points[i][0], points[i][1], 50, 0, Math.PI*2, false);
			ctx.stroke();
			
			ctx.fillStyle = "#000000";
			ctx.font = "30px serif";
			ctx.fillText(i, points[i][0], points[i][1]);
		}

		//рисуем стрелки
		var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
		for(i = 0; i < 11; i++){
			var angle = Math.atan2(points[arr_rebra[i].b][1] - points[arr_rebra[i].a][1], points[arr_rebra[i].b][0] - points[arr_rebra[i].a][0]);//выщитываем угол, в котором начинается при пересечении окружности стрелка, а также это угол где при пересечении другой окружности заканчивается стрелка
			if(points[arr_rebra[i].a][0] < points[arr_rebra[i].b][0]){//если x1 дальше x2
				if(points[arr_rebra[i].a][1] > points[arr_rebra[i].b][1]){//если y1 выше y2, то
					//для начальной точки
					x1 = Math.cos(angle + Math.PI*2)*50;	//"передвигаем" точку х1 вправо
					y1 = Math.sin(angle - Math.PI*2)*50;	//"передвигаем" точку у1 вверх
					//для конечной точки
					x2 = Math.cos(angle - Math.PI*2)*50;	//"передвигаем" точку х2 влево
					y2 = Math.sin(angle + Math.PI*2)*50;	//"передвигаем" точку у2 вниз
				}else{
					x1 = Math.cos(angle + Math.PI*2)*50;
					y1 = Math.sin(angle + Math.PI*2)*50;
					x2 = Math.cos(angle - Math.PI*2)*50;
					y2 = Math.sin(angle - Math.PI*2)*50;
				}
			}else{
				//on future
				if(points[arr_rebra[i].a][1] > points[arr_rebra[i].b][1]){
					x1 = Math.cos(angle - Math.PI*2)*50;
					y1 = Math.sin(angle - Math.PI*2)*50;
					x2 = Math.cos(angle + Math.PI*2)*50;
					y2 = Math.sin(angle + Math.PI*2)*50;
				}else{
					x1 = Math.cos(angle - Math.PI*2)*50;
					y1 = Math.sin(angle + Math.PI*2)*50;
					x2 = Math.cos(angle + Math.PI*2)*50;
					y2 = Math.sin(angle - Math.PI*2)*50;
				}
			}
			draw_arow(points[arr_rebra[i].a][0]+x1, points[arr_rebra[i].a][1]+y1, points[arr_rebra[i].b][0]-x2, points[arr_rebra[i].b][1]-y2);
		}
	}
}

/////////////////////////////////////////////////////
//Tr and etc
var p_Tr = document.querySelector("#Tr_etc");

var Tr = new Array(7);
Tr[0] = 0;
var LAinP = new Array(7);	//Len Arow in Point
var WinP = new Array(7);	//Weight in Point
for(i = 0; i < 7; i++){
	LAinP[i] = new Array();
	WinP[i] = new Array();
	for(j = 0; j < 11; j++){
		if(arr_rebra[j].b == i){
			LAinP[i] = LAinP[i].slice(0, LAinP[i].length) + [arr_rebra[j].a].slice(0, 1);
			WinP[i] = WinP[i].slice(0, WinP[i].length) + [arr_rebra[j].weight].slice(0, 1);
		}
	}
}
var Trr = new Array(7);
for(i = 1; i < 7; i++){
	Tr[i] = 0;
	for(j = 0; j < LAinP[i].length; j++){
		
	}
	for(j = 0; j < LAinP[i].length; j++){
		//alert(LAinP[i].length);
		if(j == 0){
			Tr[i] = Tr[Number(LAinP[i][j])] + Number(WinP[i][j]);
		}else{
			Trr[i] = Tr[Number(LAinP[i][j])] + Number(WinP[i][j]);
			if(Trr[i] > Tr[i]){
				Tr[i] = Trr[i];
			}
		}
	}
	//alert(Tr[i]);
}

//alert(Tr[6]);
//////////////////////////////////////////////////////////////////////////////
/*
ctx.beginPath();
ctx.strokeStyle = "#000000";
ctx.lineWidth = 2.0;

ctx.moveTo(10, 10);
ctx.lineTo(100, 100);

ctx.stroke();


/////////////////////////////////////////////////////////////////////



var Tr = new Array(7);
Tr[0] = 0;
var LAinP = new Array(7);	//Len Arow in Point
for(i = 0; i < 7; i++){
	LAinP[i] = new Array(4);
	for(j = 0; j < 4; j++){
		LAinP[i][j] = null;
	}
	for(j = 0; j < 11; j++){
		if(arr_rebra[j].b == i){
			for(k = 0; k < 4; k++){
				if(LAinP[i][k] != )
				LAinP[i][k]
			}
		}
	}
}

/////////////////////////////////////////////////////////////////////

var pos_arrow = new Array(11);	//местоположение стрелки
for(i = 0; i < 11; i++){
	pos_arrow[i] = new Array(2);
	for(j = 0; j < 7; j++){
		pos_arrow[i][0] = points[i][0];
		pos_arrow[i][1] = points[i][1];
		
		if()
		
		switch(i, j){
			case 0:
				if
			break;
			case 1:
			break;
			case 2:
			break;
			case 3:
			break;
			case 4:
			break;
			case 5:
			break;
			case 6:
			break;
			case 7:
			break;
			case 8:
			break;
			case 9:
			break;
			case 10:
			break;
		}
	}
}

////////////////////////////////////////////////////////////////////////


var len_points = 1;
arr_rebra[10].a = len_points;
arr_rebra[10].check = false;

function create_point(arr, l_p){
	if(arr[i]){
		
	}
}

for(i = 10; i >= 0; i--){
	if(arr_rebra[i].arr != null){
		if(arr_rebra[i].check){
			len_points++;
			arr_rebra[i].check = false;
		}
		arr_rebra[i].b = len_points;
		for(j = arr_rebra[i].arr.length - 1; j >= 0; j--){
			if(arr_rebra[arr_rebra[i].arr[j]] != null){
				arr_rebra[arr_rebra[i].arr[j]].a = len_points;
				if(arr_rebra[arr_rebra[i].arr[j]].check){
					len_points++;
					arr_rebra[arr_rebra[i].arr[j]].check = false;
				}
			}
		}
	}
}
*/


