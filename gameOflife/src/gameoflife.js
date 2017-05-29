function start_game(){
	var row = 400;
	var col = 400;

	var grid = create_grid();
	var dummy_grid = create_grid();

	init_grid();
	main();

	function main(){
		show_grid();
		gameoflife();
		update();
		requestAnimationFrame(main);
	}

	function show_grid()
	{
		// v
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,400,400);
		for(var i = 1; i<row; i++)
		{
			for(var j=1; j< col; j++)

			{
				if(grid[i][j]===1){
					ctx.fillStyle ="#FF0005";
					ctx.fillRect(i,j,1,1);
				}
			}
		}
	}

	function create_grid(){
		var grid = new Array(row);
		for(var i = 0; i<row; i++)
		{
			grid[i] = new Array(row);
			for(var j=0 ;j<col; j++)
			{
				grid[i][j] = 1;
			}
		}

			return grid;
	}

	function init_grid() {
		for(var i =0; i<row; i++)
		{
			for(var j =0;j <row; j++)
				{
					var random1 = Math.random();
					// var random2 = random1*2;
					// var random3 = Math.floor(random2);
					if(random1 > 0.5	)
						grid[i][j] = 1;
					else
						grid[i][j] = 0;

				}
		}
	}

	function alive_neighbour(x,y)
	{
		var temp_row = [-1,-1,-1,0,0,1,1,1];
		var temp_col  = [-1,0,1,-1,1,-1,0,1];
		var alive = 0;
		for(var i= 0; i<8; i++)
		{
			var x1 =  x + temp_row[i];
			var y1 =  y + temp_col[i];
			if(x1 >=0 && x1 < row && y1 >=0 && y1 < col)
				alive += grid[x1][y1];
		}
		return alive; 

	}

	function update(){
		for(var i =0; i<row; i++)
			for(var j=0; j<col; j++)
			{
				grid[i][j] = dummy_grid[i][j]; 
			}
	}

	function gameoflife(){
		for(var i =0; i< row; i++)
		{
			for(var j=0; j<row; j++)
			{
				var alive = alive_neighbour(i,j);
				if(grid[i][j]===0){
					switch(alive){
						case 3: 
							dummy_grid[i][j] = 1;
							break;
						default:
							dummy_grid[i][j] = 0;
					}
				} else {
						switch(alive){
							case 0:
							case 1:
							case 4:
							case 5:
							case 6:
							case 7:
							case 8:
								dummy_grid[i][j] = 0;
								break;
							case 2:
							case 3:
								dummy_grid[i][j] = 1;
								break;
						}
				}
			}
		}
	}
}