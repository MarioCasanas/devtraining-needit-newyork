//Asigno Grupo a lista de Usuarios
var users = new GlideRecord('sys_user');
//users.addEncodedQuery('user_nameINmiguelangel.gonzalez@xpertal.com,');
users.addEncodedQuery('user_nameINcarlos.salas@xpertal.com,claudia.lopez1@xpertal.com,berenice.moreno@xpertal.com,daniel.ortiz@xpertal.com,deyanira.vallejo@xpertal.com,diego.lopez@xpertal.com,dirseo.cruz@xpertal.com,erika.treviño@xpertal.com,fatima.riojas@xpertal.com,jose.moreno@xpertal.com,juan.mata@xpertal.com,lauray.rodríguez@xpertal.com,leonel.hernandez@xpertal.com,luisalberto.treviño@xpertal.com,luis.morenocorona@xpertal.com,marcela.ramirez@xpertal.com,mariaf.mendoza@xpertal.com,marlen.ibarra@xpertal.com,maximino.hernandez@xpertal.com,miguelangel.gonzalez@xpertal.com,monicaa.hernandez@xpertal.com,noemi.perez@xpertal.com,oscar.sanchez@xpertal.com,pedro.azuara@xpertal.com,pedro.cortez@xpertal.com,perla.sanchez@xpertal.com,perla.villanueva@xpertal.com,sergio.ovalle@xpertal.com,victor.noriega@xpertal.com,victoria.horta@xpertal.com,');
users.query();

var i=0;
while(users.next()){
    i++;
	gs.log(i+': '+users.sys_id+' - '+users.name);

	var grmember = new GlideRecord('sys_user_grmember');
    grmember.initialize();
    grmember.user.user_name = users.user_name;
    grmember.user.name = users.name;
    grmember.group = 'd4148e2c47fcf9d0b1e3d758436d43b7'; //MDA OXXO LATAM;
    grmember.user = users.sys_id;
    grmember.insert();

}