var grUser = new GlideRecord('sys_user');
    grUser.addEncodedQuery('sys_id!=71548dc087c05d90b6158409dabb3569^sys_id!=d43922a187e05510b6158409dabb3517^sys_id!=90d8a26187e05510b6158409dabb35cd^sys_id!=f7b926a187e05510b6158409dabb3560^sys_id!=6816f79cc0a8016401c5a33be04be441');
    grUser.query();
    
//gs.info('Excluido: '+grUser.getRowCount());


grUser.deleteMultiple();


//Activar un Usuario

var grUser = new GlideRecord('sys_user');
    grUser.addQuery('sys_id','=','216cc4b3979cd9905a3af6a3f153af2c');
    grUser.query();
    grUser.next();

gs.info('User '+grUser.name);

grUser.locked_out = false;
grUser.active = true;

grUser.update();
