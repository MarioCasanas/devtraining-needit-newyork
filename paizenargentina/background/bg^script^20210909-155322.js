var fecha = 'Jueves ,30 de Diciembre de 2021'; //ORIGINAL

//Formato Original
//'yyyy-MM-dd HH:mm:ss'

var date = new GlideDate();
//date.setValueUTC(source.u_fecha_de_expiracion, 'yyyy-MM-dd');
date.setValueUTC(fecha, 'yyyy-MM-dd');

gs.print(date.getValue());

gs.print('FECHA: '+ date);

/*
var gdt = new GlideDate();
gdt.setValueUTC(source.u_fecha_de_expiracion, 'yyyy-MM-dd');
gs.print(gdt.getValue());

return gdt.getValue();
*/