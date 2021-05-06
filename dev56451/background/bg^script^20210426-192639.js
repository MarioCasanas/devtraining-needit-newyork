//var email = 'juan.salva@proveedoresraizen.com';
var email = 'mario.casanas@raizen.com.ar';
var dominio='';

if ((email.indexOf('@','')>-1)) {
    var inicio = email.indexOf('@','')+1;
    var fin = email.indexOf('.com','')
}

dominio = email.substring(inicio, fin);

gs.print('Inicio: '+ inicio);
gs.print('Fin: '+ fin);
gs.print('Obtengo el Dominio: '+ dominio);

