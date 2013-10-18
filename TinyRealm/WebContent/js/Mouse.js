function getMousePos(canvas,e)
{
	var rect = canvas.getBoundingClientRect();
	return {
    	x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function setupMouseClickListener(canvas)
{
      canvas.addEventListener('mouseup', function(e) {
        var mousePos = getMousePos(canvas, e);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        console.log(message);
      }, false);
}