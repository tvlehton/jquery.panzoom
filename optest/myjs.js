$(function() {

	//var $mousepos = $('#mousepos');

	var $panzoom = $('#diagram').panzoom({
		cursor: 'auto',
		disablePan: false,
		disableZoom: false,
		transition: false,
		duration: 0,
		easing: "ease-in-out",
		minScale: 0.2,
		maxScale: 5,
		//contain: 'invert'
	});

	$('body').on('mousemove', function(e) {
		//$mousepos.html("MOVE  (" + e.clientX + "," + e.clientY + ")");
		$panzoom.data('lastMousePos', { clientX: e.clientX, clientY: e.clientY });
	});

	// Mouse wheel zoom handler
	// Attach to document to handle zoom globally on the page regardless of div bounds
	// Attaching to a div will make the zoom only work locally to that div
	$(document).on('wheel', function(e) {
	//$('body').on('wheel', function(e) {
		//$mousepos.html("WHEEL (" + e.clientX + "," + e.clientY + ")");
		e.preventDefault();
		var delta = e.delta || e.originalEvent.wheelDelta;
		var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
		$panzoom.panzoom('zoom', zoomOut, {
			increment: 0.2,
			animate: false,
			focal: e
		});
	});

	// Prevent context menu popup on 3rd mouse button click if necessary
	//$('body').on('contextmenu', function () {
	$(document).on('contextmenu', function () {
		return false;
	});

	// Fix focal point zooming after browser window size changes
	$(window).on('resize', function() {
		$panzoom.panzoom('resetDimensions');
	});

	$(document).on('keydown', function(e) {
		if (e.keyCode == 39) {
			$panzoom.panzoom('pan', -20, 0, { relative: true });
		} else if (e.keyCode == 38) {
			$panzoom.panzoom('pan', 0, 20, { relative: true });
		} else if (e.keyCode == 37) {
			$panzoom.panzoom('pan', 20, 0, { relative: true });
		} else if (e.keyCode == 40) {
			$panzoom.panzoom('pan', 0, -20, { relative: true });
		} else if (e.key == "+" || e.key == "-") {
			var zoomOut = e.key == "-";
			var lastMousePos = $panzoom.data('lastMousePos');
			if (lastMousePos === undefined) {
				lastMousePos = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 };
			}
			$panzoom.panzoom('zoom', zoomOut, {
				increment: 0.1,
				animate: false,
				focal: lastMousePos
			});
		} else if (e.keyCode == 49) {
			// '1'
			$panzoom.panzoom('reset');
		}
	});

});