var grUser = new GlideRecord('sys_user');
grUser.addEncodedQuery('sys_id=7d57e11b9752f510a8a753800153af32');
grUser.query();
grUser.next();
gs.info(grUser.name);

grUser.user_password.setDisplayValue('Dxc!202311');
grUser.password_needs_reset = true;
grUser.update();