var tiempo = null;
$(document).ready(main);
	//Contador que controla la apertura y cierre del menú
	var contador = 1;
	function main (){
	//Verifica si se esta moviendo el scroll
	       $(window).scroll(function() {
		      if(contador == 0){
			     ocultarMenu();
		      }
                clearTimeout( $.data( this, "TestScroll" ) );
                $.data( this, "TestScroll", setTimeout(function() {
                }, 1));
    	});
    	$('.menu_bar').click(function(){
		if (contador == 1){
			$('nav').animate({
				left: '0'
			});
			contador = 0;
		} else {
			contador = 1;
			$('nav').animate({
				left: '-75%'
			});
		};
	});
        $('#tabla-curso').hide();
        $('#tabla-docente').hide();
        $('#tabla-pregunta').hide();
        $('.f-curso').hide();
        $('.f-docente').hide();
        $('.f-update-docente').hide();
        $('.f-update-curso').hide();
        $('#close-docente').click(function(){
                $('#tabla-docente').show();
                $('.f-docente').hide();
        });
        $('#nuevo-curso').click(function(){                
                traerDocentes();
                $('#tabla-curso').hide();
                $('#tabla-docente').hide();
                $('#tabla-pregunta').hide();
                $('.f-docente').hide();
                $('.f-update-docente').hide();
                $('.f-update-curso').hide();
                $('.f-curso').show();
        });
        $('#nuevo-docente').click(function(){
                $('#tabla-curso').hide();
                $('#tabla-docente').hide();
                $('#tabla-pregunta').hide();
                $('.f-curso').hide();
                $('.f-update-docente').hide();
                $('.f-update-curso').hide();
                $('.f-docente').show();
        });
	$('#main-docentes').click(function(){
		ocultarMenu();
        $('#tabla-curso').hide();
        $('#tabla-pregunta').hide();
        $('.f-curso').hide();
        $('.f-docente').hide();
        $('.f-update-docente').hide();
        $('.f-update-curso').hide();
		cargarDocente();
        clearInterval(tiempo);
		$('#tabla-docente').show();
	});
	$('#main-cursos').click(function(){
		ocultarMenu();
        $('#tabla-docente').hide();
        $('#tabla-pregunta').hide();
        $('.f-curso').hide();
        $('.f-docente').hide();
        $('.f-update-docente').hide();
        $('.f-update-curso').hide();
		cargarCurso();
        clearInterval(tiempo);
		$('#tabla-curso').show();
	});
	$('#main-inicio').click(function(){
		ocultarMenu();
        $('#tabla-curso').hide();
        $('#tabla-docente').hide();
        $('#tabla-pregunta').hide();
        $('.f-curso').hide();
        $('.f-docente').hide();
        $('.f-update-docente').hide();
        $('.f-update-curso').hide();
        clearInterval(tiempo);
	});
	$('#main-acerca').click(function(){
		ocultarMenu();
        $('#tabla-curso').hide();
        $('#tabla-docente').hide();
        $('#tabla-pregunta').hide();
        $('.f-curso').hide();
        $('.f-docente').hide();
        $('.f-update-docente').hide();
        $('.f-update-curso').hide();
        clearInterval(tiempo);
	});
	$('#main-creditos').click(function(){
		ocultarMenu();
        $('#tabla-curso').hide();
        $('#tabla-docente').hide();
        $('#tabla-pregunta').hide();
        $('.f-curso').hide();
        $('.f-docente').hide();
        $('.f-update-docente').hide();
        $('.f-update-curso').hide();
	});
	//Funcion que se utiliza para subir al inicio de la página
	$('#ir-arriba').hide();
	$(function () {
            	$(window).scroll(function () {
                	if ($(this).scrollTop() > 400) {
                        	$('#ir-arriba').fadeIn();
			} else {
				$('#ir-arriba').fadeOut();
			}
		});
	$('#ir-arriba a').click(function () {
		$('body,html').animate({
			scrollTop: 0
			}, 800);
			return false;
		});
	});
	function ocultarMenu(){
		$('nav').animate({
			left: '-75%'
		});
		contador = 1;
	}
	function cargarCurso(){
	        $.post('./php/mostrarCursos.php', {
                        'sort': 'asc'
                }, function (data, textStatus, jqXHR) {
                        $('#tbody-curso').empty();
                        for (i = 0; i < data.cursos.length; i++) {
                                var datos = data.cursos[i];
                                var idCurso = datos.clave;
                                $('#tbody-curso').append($("<tr id='" + idCurso + "'><td>" + datos.nombre_curso + "</td><td>" + datos.nombre_docente + "</td><td>" + datos.inicio + "  " + datos.cierre + "</td><td class='th-center'><a href='#' class='delete' id='" + idCurso + "'><img src='./images/delete.png'></a></td><td class='th-center'><a href='#' class='update' id='" + idCurso + "' ><img src='./images/edit.png'></a></td><td class='th-center'><a href='#' class='entrar' id='" + idCurso + "'><img src='./images/entrar.png'></a></td></tr>"));
                        }
                //eliminar curso
                $('.delete').click(function () {
                        var id = $(this).attr('id');
                        $.post("./php/eliminarCurso.php", {
                                id_curso: id
                        }, function (data, textStatus) {
                                if (data.code == 1) {
                                    var parent = $('#'+id);
                                    parent.fadeOut(400, function() {
                                            $(this).remove();
                                    });
                                } else {
                                        error(data.msm);
                                }
                        }, 'json');
                });
                $('.update').click(function () { //<--lleno el form para actualizar->//
                        $('#select-update-ndocente').empty();
                        $('.f-update-curso').show();
                        $('#tabla-curso').hide();
                        var id = $(this).attr('id');
                        $.post("./php/mostrarCursoInd.php", {
                                id_curso: id
                        }, function (data, textStatus, jqXHR) {
                                var datos = data.cursos[0];
                                var n_curso = datos.nombre_curso;
                                var n_docente = datos.nombre_docente;
                                var inicio_curso = datos.inicio.split('/');
                                var cierre_curso = datos.cierre.split('/');
                                inicio_curso.reverse();
                                var f_inicio = inicio_curso.join('-');
                                cierre_curso.reverse();
                                var f_cierre = cierre_curso.join('-');
                                $('#input-update-ncurso').val(n_curso);
                                $('#input-update-fecha-inicio').val(f_inicio);
                                $('#input-update-fecha-cierre').val(f_cierre);
                                //-mostrar docente-//
                                $.post('./php/mostrarDocentes.php', {
                                        'sort': 'desc'
                                }, function (data, textStatus, jqXHR) {
                                        for (i = 0; i < data.docentes.length; i++) {
                                                var datosDocente = data.docentes[i];
                                                $('#select-update-ndocente').append($("<option>" + datosDocente.nombre_docente + "</option>"));
                                        }
                                }, 'json'); //-termina mostrar docente-//
                                $('#actualizar-curso').click(function () { //===actualizar curso====//
                                        var docente = $('#select-update-ndocente').val();
                                        if ($('#input-update-ncurso').val() == "") {
                                                error('Introduce el nombre del curso');
                                                return false;
                                        } else {
                                                var n_curso = $('#input-update-ncurso').val().toUpperCase();
                                        }
                                        if ($('#input-update-fecha-inicio').val() == "") {
                                                error('Error en el formato de fecha');
                                                return false;
                                        } else {
                                                var f_ini = $('#input-update-fecha-inicio').val().split('-');
                                                f_ini.reverse();
                                                var ini_curso = f_ini.join('/');
                                        }
                                        if ($('#input-update-fecha-cierre').val() == "") {
                                                error('Error en el formato de fecha');
                                                return false;
                                        } else {
                                                var f_cie = $('#input-update-fecha-cierre').val().split('-');
                                                f_cie.reverse();
                                                var fin_curso = f_cie.join('/');
                                        }
                                        $.post("./php/actualizarCurso.php", {
                                                id_curso: id,
                                                nombre_curso: n_curso,
                                                inicio: ini_curso,
                                                cierre: fin_curso,
                                                nombre_docente: docente
                                        }, function (data, textStatus) {
                                                if (data.code == 1) {
                                                        cargarCurso();
                                                        $('.f-update-curso').hide();

                                                        success('Curso actualizado correctamente');
                                                        $('#tabla-curso').show();

                                                } else {
                                                        error(data.msm);
                                                }
                                        }, 'json');
                                }); //===termina actualizar curso===//
                        }, //<--termino de llenar form->//
                        'json');
                });
                $('.entrar').click(function () {//entrar a curso para ver preguntas
                        var id = $(this).attr('id');
                        recargarPreguntas(id);
                        if( tiempo != null ) {
                            clearInterval( tiempo );
                        }
                        tiempo = setInterval(function () {recargarPreguntas(id);}, 2000);
                });
        }, 'json');
        function recargarPreguntas(id) {
            $('#tabla-pregunta').show();
            $('#tabla-curso').hide();
            var id_c = id;
        $.post("./php/mostrarPreguntas.php",
                {id_curso : id_c},
                function (data, textStatus, jqXHR) {
                        $('#tbody-pregunta').empty();
                        for (i = 0; i < data.pregunta.length; i++) {
                                var datos = data.pregunta[i];
                                var idP = datos.clave;
                                $('#tbody-pregunta').append($("<tr id ="+i+"><td>" + datos.pregunta + "</td><td>" + datos.hora + "</td><td class='th-center'><a href='#' class='contestar' id='" + idP + "'><img src='./images/ok.png'></a></td><td class='th-center'><a href='#' class='deleteP' id='" + idP + "'><img src='./images/delete.png'></a></td></tr>"));
                        }
                        $('.contestar').click(function () {
                        var idPreg = $(this).attr('id');
                        $.post("./php/contestarPregunta.php", 
                                {id_pregunta: idPreg},
                                function (data, textStatus) {
                                        if (data.code == 1) {
                                        } else {
                                                error("error");
                                        }
                                }, 'json');
                        });
                        $('.deleteP').click(function(){
                         //   //delete pregunta
                                var idPreg = $(this).attr('id');
                                $.post("./php/eliminarPregunta.php", {
                                        id_pregunta: idPreg
                                }, function (data, textStatus) {
                                        if (data.code == 1) {
                                        } else {
                                                error("Error al eliminar la pregunta");
                                        }
                                }, 'json');
                        });

                },
                'json');
                }
	   }

           function traerDocentes(){
                $('#select-ndocente').empty();
                $.post('./php/mostrarDocentes.php', {
                        'sort': 'desc'
                }, function (data, textStatus, jqXHR) {
                        for (i = 0; i < data.docentes.length; i++) {
                                var datos = data.docentes[i];
                                $('#select-ndocente').append($("<option>" + datos.nombre_docente +"</option>"));

                        }
                }, 'json');
           }
	function cargarDocente(){
		//Mostrar los Docentes
		$('tbody').empty();
                $.post('./php/mostrarDocentes.php', {
                        'sort': 'asc'
                }, function (data, textStatus, jqXHR) {
                        for (i = 0; i < data.docentes.length; i++) {
                                var datos = data.docentes[i];
                                var idDocente = datos.clave;
                                $('#tabla-docente').append($("<tbody><tr id='" + idDocente + "'><td data-th='Docente'>" + datos.nombre_docente + "</td><td class='th-center''><a href='#' class='delete' id='" + idDocente + "'><img src='./images/delete.png'></a></td><td class='th-center'><a href='#' class='update' id='" + idDocente + "'><img src='./images/edit.png'></a></td></tr></tbody>"));
                        } //Borrar docentes
                        $('.delete').click(function () {
                                var id = $(this).attr('id');
                                //Eliminar docentes
                                $.post("./php/eliminarDocentes.php", {
                                        id_docente: id
                                }, function (data, textStatus) {
                                        if (data.code == 1) {
                                                var parent = $('#'+ id);                  
                                                parent.fadeOut('slow', function() {
                                                        $(this).remove();
                                                });
                                        } else {
                                                error(data.msm);
                                        }
                                }, 'json');
                        }); //Termina delete docentes
                }, 'json'); //Termina mostrar docentes
	}
        function success(code){
                alertify.success(code); 
                return false;
        }
        function error(code){
                alertify.error(code); 
                return false; 
        }
        $('#agregar-curso').click(function () {
                    if ($('#input-ncurso').val() == "") {
                            error("Escriba el nombre del curso");
                            return false;
                    } else {
                            var n_curso = $('#input-ncurso').val().toUpperCase();
                    }
                    if($('#select-ndocente').val() != ""){
                            var n_docente = $('#select-ndocente').val().toUpperCase();
                    }else{
                            error("Seleccione un docente");
                            return false;
                    }
                    if ($('#input-fecha-inicio').val() == "") {
                            error("Selecciona la fecha de inicio del curso");
                            return false;
                    } else {
                            var horario_inicio = $('#input-fecha-inicio').val();
                    }
                    if ($('#input-fecha-cierre').val() == "") {
                            error("Selecciona la fecha de cierre del curso");
                            return false;
                    } else {
                            var horario_cierre = $('#input-fecha-cierre').val();
                    }
                    var fecha_inicio = horario_inicio.split('-');
                    fecha_inicio.reverse();
                    var f_inicio = fecha_inicio.join('/');
                    var fecha_cierre = horario_cierre.split('-');
                    fecha_cierre.reverse();
                    var f_cierre = fecha_cierre.join('/');
                    $.post("./php/insertarCurso.php", {
                            nombre_curso: n_curso,
                            inicio: f_inicio,
                            cierre: f_cierre,
                            nombre_docente: n_docente
                    }, function (data, textStatus) {
                                if (data.code == 1) {
                                        $('#form-curso').trigger("reset");
                                        $('.f-curso').hide();
                                        success(data.msm);
                                        cargarCurso();
                                        $('#tabla-curso').show();

                                } else {
                                    error(data.msm);
                                }
                    }, 'json');
            });
            $('#agregar-docente').click(function () {
                if ($('#input-ndocente').val() == "") {
                        error("Introduce el nombre del docente");
                        return false;
                } else {
                        var nombre_docente = $('#input-ndocente').val().toUpperCase();
                }
                if ($('#input-apdocente').val() == "") {
                        error("Introduce los apellidos del docente");
                        return false;
                } else {
                        var ap_docente = $('#input-apdocente').val().toUpperCase();
                }
                $.post("./php/insertarDocentes.php", {
                        n_docente: nombre_docente,
                        ap_docente: ap_docente
                }, function (data, textStatus) {
                        if (data.code == 1) {
                                //$('#tabla-docente')
                                cargarDocente();
                                $('.f-docente').hide();
                                $('#tabla-docente').show();
                        } else {
                                error(data.msm);
                        }
                }, 'json');
        });
};