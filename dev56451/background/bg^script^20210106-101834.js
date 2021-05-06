var year = '11/01/2021';
year = year.substring(6, 10);

gs.info(year);



var year2 = year;
var fechaInicio = year2 + "0101T000000"; //Siempre toma el día 1 de Enero

gs.info('fechaInicio -> '+fechaInicio);

var rec = new GlideRecord('fiscal_period');
rec.addQuery('start_date_time', '=', fechaInicio);
rec.addQuery('fiscal_type', '=', 'month');
rec.addQuery('open', true);
rec.query();
rec.next();

if (rec.getRowCount() == 0) {
    gs.error('Integracion SAP (start_fiscal_period) - No hay Períodos Fiscales abiertos para el año: ' + fechaInicio);
    //return "";
} else if (rec.getRowCount() > 1) {
    gs.error('Integracion SAP (start_fiscal_period) - Existen más de un Periodo Fiscal para el mismo año:');
} else {

    gs.info(rec.sys_id + ' +++++ ' +rec.name);

    //return rec.sys_id;
}


/*
try {

    var grBreakdown = new GlideRecord('cost_plan_breakdown');
    grBreakdown.addQuery('cost_plan.name','=','');
    grBreakdown.query();


    gs.info(grBreakdown.getRowCount());

    grBreakdown.setWorkflow(false); //Don't fire Business rule,notifications
    grBreakdown.deleteMultiple();

} catch (error) {
    var message = error.message;
    gs.error("Integracion SAP - Error: " + message);
};  
*/