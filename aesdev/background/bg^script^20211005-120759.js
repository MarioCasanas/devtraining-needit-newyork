//gs.getSession().getLanguage()
var grUser = new GlideRecord('sys_user');
grUser.addQuery('sys_id','=','6fae1150dbd230103b669f3bf39619f7');
grUser.query();
grUser.next();

gs.info('Nombre ->'+grUser.name);


var grHRCase = new GlideRecord('x_94182_hr_case');
grHRCase.addQuery('sys_id','=','03e286aa1bb2fc509352db51f54bcb5d');
grHRCase.query();
grHRCase.next();

gs.info('Employee Number ->'+grHRCase.opened_by.employee_number+' - DPTO -> '+grHRCase.opened_by.department.name+' - Company -> '+grHRCase.opened_by.company.name);


