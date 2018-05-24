$(document).ready(function() {
	/*playOneOrTwo(2);

	function playOneOrTwo (play) {
		if (play == 1) {
			dragPiece(".piece1");
		}
		if (play == 2) {
			dragPiece(".piece2");
		} 
	}*/
	var icon = {
		header: "ui-icon-circle-arrow-e",
		activeHeader: "ui-icon-circle-arrow-s"
	};

	$("#menu").accordion({
		collapsible: true,
		heightStyle: 'content',
		icons: icon,
		active: false
	});

	$("#btn-reset").click(function(event) {
		resetGame();
	});

	dragPiece(".piece1");
	dragPiece(".piece2");

	var numPieces1 = 12;
	var numPieces2 = 12;

	function dragPiece (piece) {
		$(piece).draggable({
			cursor: 'pointer',
			revert: 'invalid',
			containment: $("#chess-board")
		});
	}

	function destroyDrag (piece) {
		$(piece).draggable('destroy');
	}
	/*function disableDrag (piece) {
		$(piece).draggable('disable');
	}

	function enableDrag (piece) {
		$(piece).draggable('enable');
	}*/

	for (var i = 1; i <= 9; i++) {
		iParImpar = (i % 2 == 0) ? 1 : 0; // Si la fila i es par => iParImpar = 1, si la fila i es impar => iParImpar = 0;
		for (var j = 1; j <= 8; j++) {
			if (j % 2 == iParImpar) {

				var idBox = "#box-" + "row-" +i+ "-col-"+j;
				$(idBox).droppable({

					drop: soltar,

					accept: acceptItems,

					out: function (event, ui) {
						console.log("hola, estoy fuera")
					}

				});
			}					
		}
	}

	function soltar (event, ui) {
		var idParentDivStart = ui.draggable.parent().attr('id');
		rowStart = parseInt(idParentDivStart.substr(8, 1));
		colStart = parseInt(idParentDivStart.substr(14, 1));

		var idParentDivDrop = $(this).attr('id');
		rowDrop = parseInt(idParentDivDrop.substr(8, 1));
		colDrop = parseInt(idParentDivDrop.substr(14, 1));

		$(ui.draggable).appendTo($(this));

		if (ui.draggable.hasClass('piece-start')) {
			$(ui.draggable).switchClass('piece-start','piece',0);
		}

		if (ui.draggable.hasClass('piece1')) {
			/*Felix Rivas Chamorro - Todos los derechos reservados @ Copyright 2017 - Lima - Perú.*/
			if (rowDrop == 9) {			// Código para añadir la clase 'queen' si la ficha roja llegó a la última fila, i = 9
				console.log(rowDrop);
				if (! $(ui.draggable).hasClass('queen')) {
					$(ui.draggable).addClass('queen');
					$(ui.draggable).addClass('queen1');
					centerPiece($(this), ui.draggable);
					animateQueen(ui.draggable);
				}
			}

			if (rowDrop - 2 == rowStart || rowDrop + 2 == rowStart) {
				if (rowDrop - 2 == rowStart) {
					rowBetween = rowDrop - 1;
				} else {
					rowBetween = rowDrop + 1;
				}

				colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
				idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;

				deletePiece(idBoxBetween);
				countPiece("blue");
				centerPiece($(this), ui.draggable);
				$("#num-pieces-2").text(numPieces2);//console.log("Número de piezas azules: "+numPieces2);
			}
		} 

		else {

			if (rowDrop == 1) {			// Código para añadir la clase 'queen' si la ficha azul llegó a la primera fila i = 1
				console.log(rowDrop);  //Felix Riv@s Chamorro - Todos los derechos reservados @ Copyright 2017 - Lima - Perú.
				if (! $(ui.draggable).hasClass('queen')) {
					$(ui.draggable).addClass('queen');
					$(ui.draggable).addClass('queen2');
					centerPiece($(this), ui.draggable);
					animateQueen(ui.draggable);
				}
			}

			if (rowDrop + 2 == rowStart || rowDrop - 2 == rowStart) {
				if (rowDrop + 2 == rowStart) {
					rowBetween = rowDrop + 1;
				} else {
					rowBetween = rowDrop - 1;
				}

				colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
				idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;

				deletePiece(idBoxBetween);
				countPiece("red");
				centerPiece($(this), ui.draggable);
				$("#num-pieces-1").text(numPieces1); //console.log("Número de piezas rojas: "+numPieces1);
			}
		}
		centerPiece($(this), ui.draggable);
		animatePiece(ui.draggable)
	}


	function acceptItems (ficha) {
		var idParentDivStart = ficha.parent().attr('id');
		rowStart = parseInt(idParentDivStart.substr(8, 1));
		colStart = parseInt(idParentDivStart.substr(14, 1));

		var idParentDivDrop = $(this).attr('id');
		rowDrop = parseInt(idParentDivDrop.substr(8, 1));
		colDrop = parseInt(idParentDivDrop.substr(14, 1));

		if (ficha.hasClass('piece1')) {
			if (ficha.hasClass('queen1')) {
				if ((rowDrop + 2 == rowStart) && (colDrop !=colStart)) {
					rowBetween = rowDrop + 1;
					colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
					idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;
					return ($("#"+idBoxBetween).children().hasClass('piece2') && ! $(this).children().length > 0);
				}

				if ((rowDrop - 2 == rowStart) && (colDrop != colStart)) {
					rowBetween = rowDrop - 1;
					colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
					idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;
					return($("#"+idBoxBetween).children().hasClass('piece2') && !$(this).children().length > 0);
				}
				/*Felix Riv@s Chamorro - Todos los derechos reservados @ Copyright 2017 - Lima - Perú.*/
				return (((rowDrop+1 == rowStart) && (colDrop-1 == colStart || colDrop+1 == colStart) && (! $(this).children().length > 0)) ||
						((rowDrop-1 == rowStart) && (colDrop-1 == colStart || colDrop+1 == colStart) && (! $(this).children().length > 0)) ); //para que valla de hacia arriba y hacia abajo una casilla
			}


			if ((rowDrop - 2 == rowStart) && (colDrop != colStart)) {
				rowBetween = rowDrop - 1;
				colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
				idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;
				return($("#"+idBoxBetween).children().hasClass('piece2') && !$(this).children().length > 0);
			}
			return ((rowDrop-1 == rowStart) && (colDrop-1 == colStart || colDrop+1 == colStart) && (! $(this).children().length > 0));

		} else {

			if (ficha.hasClass('queen2')) {
				if ((rowDrop + 2 == rowStart) && (colDrop !=colStart)) {
					rowBetween = rowDrop + 1;
					colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
					idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;
					return ($("#"+idBoxBetween).children().hasClass('piece1') && ! $(this).children().length > 0);
				}

				if ((rowDrop - 2 == rowStart) && (colDrop != colStart)) {
					rowBetween = rowDrop - 1;
					colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
					idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;
					return($("#"+idBoxBetween).children().hasClass('piece1') && !$(this).children().length > 0);
				}

				return (((rowDrop+1 == rowStart) && (colDrop-1 == colStart || colDrop+1 == colStart) && (! $(this).children().length > 0)) ||
						((rowDrop-1 == rowStart) && (colDrop-1 == colStart || colDrop+1 == colStart) && (! $(this).children().length > 0)) ); //para que valla de hacia arriba y hacia abajo una casilla
			}


			if ((rowDrop + 2 == rowStart) && (colDrop !=colStart)) {
				rowBetween = rowDrop + 1;
				colBetween = (colStart > colDrop) ? colDrop+1 : colDrop-1;
				idBoxBetween = "box-row-"+rowBetween+"-col-"+colBetween;
				return ($("#"+idBoxBetween).children().hasClass('piece1') && ! $(this).children().length > 0);
			}
			return ((rowDrop+1 == rowStart) && (colDrop-1 == colStart || colDrop+1 == colStart) && (! $(this).children().length > 0));
		}

	}

	function deletePiece (idBoxPieceToEmpty) {
		$("#" + idBoxPieceToEmpty).children().effect('fade', 500, () => {
			$("#" + idBoxPieceToEmpty).empty();
		});
	}

	function countPiece (redOrBlue) {
		if (redOrBlue == "red") {
			animateDatosPlayerOne("#datos-player-1");
			numPieces1 = numPieces1 - 1;
			if (numPieces1 == 0) {
				numPieces2 = "You Win!";
				$("#num-pieces-2").text(numPieces2);
				animateDatosPlayerTwoFuncion();
				function animateDatosPlayerTwoFuncion () {
					animateDatosPlayerTwo("#datos-player-2");
					animateDatosPlayerOne("#btn-reset");
					setTimeout(animateDatosPlayerTwoFuncion, 1000);
				}
				$("#menu").accordion({
					active:2
				});
				destroyDrag(".piece2");
			}
		}
		if (redOrBlue == "blue") {
			animateDatosPlayerTwo("#datos-player-2");
			numPieces2 = numPieces2 - 1;
			if (numPieces2 == 0) {
				numPieces1 = "You Win!";
				$("#num-pieces-1").text(numPieces1);
				animateDatosPlayerOneFuncion();
				function animateDatosPlayerOneFuncion () {
					animateDatosPlayerOne("#datos-player-1");
					animateDatosPlayerOne("#btn-reset");
					setTimeout(animateDatosPlayerOneFuncion, 1000);
				}
				$("#menu").accordion({
					active:2
				});
				destroyDrag(".piece1");
			}
			
		}
	}

	function centerPiece (box, pieceToCenter) {
		var positionBox = box.position();
		widthBox = box.width();
		heightBox = box.height();

		widthPiece = pieceToCenter.width();
		heightPiece = pieceToCenter.height();

		x = (widthBox - widthPiece)/2;
		y = (heightBox - heightPiece)/2;

		pieceX = positionBox.left + x;
		pieceY = positionBox.top + y;

		pieceToCenter.css({
			top: pieceY+'px',
			left: pieceX+'px'
		});
	}

	function animatePiece (pieceToAnimate) {
		pieceToAnimate.effect('bounce',500, (argument) => {
			pieceToAnimate.parent().effect("highlight",{color: '#FFFFFF'}, 300);
		});
	}

	function animateQueen (queenToAnimate) {
		$(queenToAnimate).addClass('piece-temporal')
									.effect('explode', {pieces:9}, 500, () => {
										$(queenToAnimate).html("&#9819;");
									}).show('explode', {pieces:9}, 500, () => {
										$(queenToAnimate).removeClass('piece-temporal').addClass('light-dama');
									}); 
	}

	function animateDatosPlayerOne (idDatosPlayer) {
		$(idDatosPlayer).effect('pulsate', {times:1},500);
		$(idDatosPlayer).children('h2').hide().show('clip', 500);
	}
	function animateDatosPlayerTwo (idDatosPlayer) {
		$(idDatosPlayer).effect('explode',{pieces:2},500).show('explode',{pieces:2}, 500);
	}

	function resetGame () {
		if (confirm("¡Se van a eliminar todos los movimientos realizados! ¿Desea continuar?") == true) {
			location.reload(true);
		} else {
			alert("Ok, no se reiciniará el juego");
		}
	}

});