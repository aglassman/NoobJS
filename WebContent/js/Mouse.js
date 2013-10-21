NoobJS.Mouse = function()
{
};

NoobJS.Mouse.prototype.getMousePos = function (canvas,e)
{
	var rect = canvas.getBoundingClientRect();
	return {
    	x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
};

NoobJS.Mouse.prototype.setupMouseClickListener = function (canvas)
{
      canvas.addEventListener('mouseup', function(e) {
        var mousePos = getMousePos(canvas, e);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
      }, false);
};
