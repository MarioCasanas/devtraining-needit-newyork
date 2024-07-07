var total=0;

var grUser = new GlideRecord('sys_user');
//grUser.addEncodedQuery('sys_id=f5c81b3bdbe46700417b3e04399619b8^active=false^locked_out=true');
grUser.addEncodedQuery('active=false^locked_out=true');
grUser.query();
//grUser.next();
total = grUser.getRowCount();

gs.info('Usuarios Bloqueados/Inactivos: '+total);

var cont=0;

while (grUser.next()) {
    //Tabla de Grupos
    var grUser_grMember = new GlideRecord('sys_user_grmember');
    //grUser_grMember.addEncodedQuery('user=f5c81b3bdbe46700417b3e04399619b8');
    grUser_grMember.addEncodedQuery('user='+grUser.sys_id);
    //u_idSTARTSWITHarawe0^active=false^locked_out=true
    grUser_grMember.query();
    grUser_grMember.next();

    var cantGroups = grUser_grMember.getRowCount();

    if (cantGroups > 0) {
        cont++;
        gs.info(grUser.name + ' - tiene '+cantGroups+' Grupos asociados');
    }

}

gs.info('Se encontraron '+cont+' usuarios Inactivos con Grupos Asociados, de '+total);
gs.info('El '+100*cont/total+'% de Usuarios Inactivos tienen Grupos Asignados');