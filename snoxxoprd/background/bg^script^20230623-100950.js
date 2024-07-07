var grUser = new GlideRecord('sys_user');
    grUser.addQuery('sys_id','=','bd6c3adb87641550a817bbb6dabb3528');
    grUser.query();
    grUser.next();

gs.info('User '+grUser.name);