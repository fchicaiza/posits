var tabla;

//FunciÃ³n que se ejecuta al inicio
function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);	
	})
}

//FunciÃ³n limpiar
function limpiar()
{
	$("#nombre").val("");
	$("#descripcion").val("");
	$("#idcategoria").val("");
}

//FunciÃ³n mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

//FunciÃ³n cancelarform
function cancelarform()
{
	limpiar();
	mostrarform(false);
}

//FunciÃ³n Listar
function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//PaginaciÃ³n y filtrado realizados por el servidor
	    dom: 'Bfrtip',//Definimos los elementos del control de tabla
	    buttons: [		          
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
		"ajax":
				{
					url: '../ajax/categoria.php?op=listar',
					type : "get",
					dataType : "json",						
					error: function(e){
						console.log(e.responseText);	
					}
				},
		"bDestroy": true,
		"iDisplayLength": 5,//PaginaciÃ³n
	    "order": [[ 0, "desc" ]]//Ordenar (columna,orden)
	}).DataTable();
}
//FunciÃ³n para guardar o editar

function guardaryeditar(e)
{
	e.preventDefault(); //No se activarÃ¡ la acciÃ³n predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/categoria.php?op=guardaryeditar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {                    
	          bootbox.alert(datos);	          
	          mostrarform(false);
	          tabla.ajax.reload();
	    }

	});
	limpiar();
}


//funcion para mostrar datos antes de editar
function mostrar(idcategoria){
    
    $.post("../ajax/categoria.php?op=mostrar",{idcategoria : idcategoria }, function (data,status)
    {
       data = JSON.parse(data);
        mostrarform(true);
        
       $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
         $("#idcategoria").val(data.idcategoria);
       
    });
}

//Funcion para desactivar categoria
function desactivar(idcategoria)
{

    bootbox.confirm("¿Está seguro de desctivar la categoría?", function(result){
        if(result)
        {
            $.post("../ajax/categoria.php?op=desactivar", {idcategoria: idcategoria},function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });

        }
    });
    
}
       
//Funcion para activar categoria
function activar(idcategoria)
{

    bootbox.confirm("¿Está seguro de activar la categoría?", function(result){
        if(result)
        {
            $.post("../ajax/categoria.php?op=activar", {idcategoria: idcategoria},function(e){
                bootbox.alert(e);
                tabla.ajax.reload();
            });

        }
    });
    
}

init();