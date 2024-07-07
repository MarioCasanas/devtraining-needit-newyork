var grDependentValue = new GlideRecord('sys_choice');
grDependentValue.addQuery('name=x_94182_hr_case');
grDependentValue.addQuery('element=hr_category');
grDependentValue.addQuery('value=payroll'); //this.getParameter('sysparm_category')
grDependentValue.query();
grDependentValue.next();


var grServicios = new GlideRecord('sys_choice');
grServicios.addQuery('name=x_94182_hr_case');
grServicios.addQuery('element=hr_service');
grServicios.addQuery('dependent_value=' + grDependentValue.value);
grServicios.addQuery('language='+gs.getSession().getLanguage());
grServicios.query();

//gs.info('Servicios:');

var servicios='';
while (grServicios.next()) {
        servicios = servicios+grServicios.label+'|';
        //return grServicios.label; //+'|'+grServicios.value;
}

//return servicios;
gs.info('Servicios: -> '+servicios);

//Saco el último caracter

servicios = servicios.substring(0, servicios.length-1);
var separados = servicios.split("|");

var i=0;
while (i < separados.length) {
    gs.info('ARRAY Servicios: -> '+separados[i]);
    i++;
}