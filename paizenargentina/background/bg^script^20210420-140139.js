//Tomo 1er letra del Nombre y las 2 letras del apellido para armar el USER_ID
//se le agrega un CERO al final

var varNombre = 'a';
var varApellido = 'Lo';
var varConsulta = 'last_nameSTARTSWITH'+varApellido+'^nameSTARTSWITH'+varNombre;

var grUser = new GlideRecord('sys_user');
grUser.addQuery(varConsulta);
grUser.query();
grUser.next();

//gs.addInfoMessage('Usuario: '+grUser.first_name+' ' +grUser.last_name);
var userID = 'ar'+grUser.first_name.substring(0,1)+ grUser.last_name.substring(0,2)+grUser.getRowCount();
gs.addInfoMessage('ID de Usuario: '+userID.toLowerCase());

