//ORIGINAL que no tomaba la Tabla "u_objective_okr"
//var url = new global.DXC_OKRUtils().copyOKR(current.getUniqueValue(), current.sys_class_name);
//Envío la tabla de OKR
var url = new global.DXC_OKRUtils().copyOKR(current.getUniqueValue(), 'u_objective_okr');
action.setRedirectURL(url);