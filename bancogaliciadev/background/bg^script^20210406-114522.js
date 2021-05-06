//Cost Plan
var grCostPlan = new GlideRecord('cost_plan');
grCostPlan.addQuery('name','=','32440'); //varPartidaActual.toString());
grCostPlan.addQuery('task','!=',''); //Tiene que tener un Proyecto relacionado
grCostPlan.query();

gs.print('CANT COST PLAN -> '+grCostPlan.getRowCount());

grCostPlan.next();
gs.print('Partida -> '+grCostPlan.name+' - Desde: '+grCostPlan.u_fecha_valida_desde+' - Hasta: '+grCostPlan.u_fecha_de_expiracion);
gs.print('-----------------------------------  Desde: 2021-01-01 - Hasta: 2022-03-31 ------------------------------------------');

var fechaFormateada = function (varFecha) {

    var dia = varFecha.toString().substring(6, 8);
    var mes = varFecha.toString().substring(4, 6);
    var anio = varFecha.toString().substring(0, 4);
    var fecha = anio + '-' + mes + '-' + dia;
    
    gs.print('fecha-> '+fecha);
    //return fecha;
}

var cantMesesFechas = function (varFechaInicio, varFechaFin) { 
    var total_months=0;
    var months=12;
    
    //Formateo la Fecha para que ServiceNow la interprete correctamente.
    var inicio = fechaFormateada(varFechaInicio);
    var fin = fechaFormateada(varFechaFin);

    var fechaInicio = new GlideDate();
    fechaInicio.setValue(inicio);

    var fechaFin = new GlideDate();
    fechaFin.setValue(fin);

    gs.print('FECHA FORMATEADA -> ' + fechaInicio + ' - ' + fechaFin);

    var months = fechaInicio.getMonth();
    var year = fechaInicio.getYearLocalTime();

    var months1 = fechaFin.getMonth();
    var year1 = fechaFin.getYearLocalTime();    
/*
    var months = 01;
    var year = 2021;

    var months1 = 03;
    var year1 = 2022;
*/
    gs.print('months: -> '+months+' - months1: -> '+months1);
    gs.print('year: -> '+year+' - year1: -> '+year1);
    
    if(year != year1) {
        total_months=(12-months)+(months1)+(year1-year-1)*12;
    }else {
        total_months=months1-months;
    }
    
    gs.print('total_months -> '+total_months);
    //return total_months;    
}

if (!grCostPlan.u_fecha_valida_desde.nil()) {
    var Meses = cantMesesFechas(grCostPlan.u_fecha_valida_desde, grCostPlan.u_fecha_de_expiracion);
    gs.print('CANT MESES -> '+Meses);
} else {
    gs.print('La Fecha de Inicio y de Expiración No han sido cargadas.');
}
