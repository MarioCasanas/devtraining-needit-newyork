var total=0;

var grUser = new GlideRecord('sys_user');
//grUser.addEncodedQuery('sys_id=f5c81b3bdbe46700417b3e04399619b8^active=false^locked_out=true');
grUser.addEncodedQuery('active=false^locked_out=true');
grUser.query();
//grUser.next();
total = grUser.getRowCount();

gs.info('Usuarios Bloqueados/Inactivos: '+total);

var cont=0;
var contRoles=0;

while (grUser.next()) {

    //Tabla de Grupos
    var grUser_grMember = new GlideRecord('sys_user_grmember');
    grUser_grMember.addEncodedQuery('user='+grUser.sys_id);
    grUser_grMember.query();
    grUser_grMember.next();

    var cantGroups = grUser_grMember.getRowCount();

    if (cantGroups > 0) {
        cont++;
        //gs.info(grUser.name + ' - tiene '+cantGroups+' Grupos asociados');
        gs.info(grUser.name);
    }

/*
    //Tabla de ROLES
    var grUserHasRole = new GlideRecord('sys_user_has_role');
    grUserHasRole.addEncodedQuery('user='+grUser.sys_id);
    grUserHasRole.query();
    grUserHasRole.next();

    var cantRol = grUserHasRole.getRowCount();

    if (cantRol > 0) {
        contRoles++;
        gs.info(grUser.name + ' - tiene '+cantRol+' Roles asociados');
    }
*/
}

gs.info('Se encontraron '+cont+' usuarios Inactivos con Grupos Asociados, de '+total);
gs.info('Se encontraron '+contRoles+' usuarios Inactivos con Roles Asociados, de '+total);
gs.info('El '+100*cont/total+'% de Usuarios Inactivos tienen Grupos Asignados');
gs.info('El '+100*contRoles/total+'% de Usuarios Inactivos tienen Roles Asignados');
