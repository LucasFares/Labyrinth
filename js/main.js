function matrix( rows, cols){
	var arr = [];
	for(var i=0; i < rows; i++){
		arr.push([]);
		arr[i].push( new Array(cols));
		for(var j=0; j < cols; j++){
			// Initializes:
			arr[i][j] = true;
		}
	}
	return arr;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random()*max);
}

//1% of the height of the window
function vh(v) {
	var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	return (v * h) / 100;
}

var lines = new Array();

//Fit the maze to the screen
var gridSizeX  = Math.ceil(view.size.width/vh(1));
var gridSizeY = Math.ceil(view.size.height/vh(1));

var maze = matrix(gridSizeX, gridSizeY);
var frontiers = [];
//Track the order for animation
var order = [];
var x = getRandomInt(0, gridSizeX);
var y = getRandomInt(0, gridSizeY);
frontiers.push([x, y, x, y]);

while (frontiers.length > 0){
	var f = frontiers.splice(getRandomInt(0, frontiers.length), 1)[0];
	x = f[2];
	y = f[3];
	if (maze[x][y]){
		maze[f[0]][f[1]] = maze[x][y] = false;
		order.push([f[0], f[1]], [f[2], f[3]])
		if(x >= 2 && maze[x-2][y]){
			frontiers.push([x-1, y, x-2, y]);
		}
		if( y >= 2 && maze[x][y-2]){
			frontiers.push([x, y-1, x, y-2]);
		}
		if( x < gridSizeX - 2 && maze[x+2][y]){
			frontiers.push([x+1, y, x+2, y]);
		}
		if( y < gridSizeY -2 && maze[x][y+2]){
			frontiers.push([x, y+1, x, y+2]);
		}
	}
}

var increment = 0;
 function onFrame(event) {

	x = order[increment][0];
	y = order[increment][1];

		lines.push(new Path.Line({
			segments: [[vh(x), vh(y)], [vh(x+1), vh(y)], [vh(x+1), vh(y+1)], [vh(x), vh(y+1)]],
			closed: true,
			fillColor: 'black',
			strokeColor: 'black'
		}));
		if(increment<order.length-1){
			increment++;
		}
 }
