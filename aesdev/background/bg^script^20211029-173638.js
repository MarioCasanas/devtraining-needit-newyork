var grUser = new GlideRecord('sys_user_grmember');
grUser.addQuery('group','=','7b538b581bb7b450443c20afe54bcb35');
grUser.orderBy('user.name');
grUser.query();

var vUsers = '';
grUser.next();
gs.info('Group: '+grUser.group.name + ' - ('+grUser.group+')');

gs.info('USERS ('+grUser.getRowCount()+'):');
gs.info(grUser.user.name);

while (grUser.next()) {
    gs.info(grUser.user.name);
    vUsers += grUser.user+',';
}

vUsers = vUsers.substring(0, vUsers.length-1);
vUsers = '^sys_idIN' + vUsers;
//gs.info('USUARIOS -> '+vUsers);
//Llamada - javascript:new HR_Utils().getUserByGroup(current.assignment_group);