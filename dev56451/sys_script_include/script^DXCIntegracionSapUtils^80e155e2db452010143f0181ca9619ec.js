var DXC_IntegracionSapUtils = Class.create();
DXC_IntegracionSapUtils.prototype = {
    initialize: function() {},

    ObtenerPeriodoFiscal: function(star_day) {
        var sdat = formatearFecha(star_day);
        var dat = new GlideDateTime(sdat);
        var datstr = dat.toString();

        var year = datstr.substring(0, 4);
        var month = datstr.substring(5, 7);
        var day = datstr.substring(8, 10);
        //Obtengo el último día del mes para esa Fecha
        var lastday = function(y, m) {
            return new Date(y, m, 0).getDate();
        };

        //*** Build String to compare against fiscal dates***//
        var fechaInicio = year + month + "01" + "T000000";
        var ultimoDiaMes = lastday(year, month);
        var fechaFin = year + month + ultimoDiaMes + "T" + "235959";

        //**** Query fiscal_period table to find correct period ****//
        var rec = new GlideRecord('fiscal_period');
        rec.addQuery("start_date_time", "<=", fechaInicio);
        rec.addQuery("end_date_time", ">=", fechaFin);
        rec.addQuery('fiscal_type', 'Month');
        rec.addQuery('open', true);
        rec.query();
        rec.next();

        if (rec.getRowCount() > 0) {
            gs.addInfoMessage(rec.name);
        } else {
            gs.addErrorMessage('No hay un Período Fiscal creado para la Fecha: ' + sdat+'. Por favor, solicitar al Administrador que crearlo.');
        }

    },
    formatearFecha : function (star_day) {
        //Formatear Fecha agregando los guiones
        var year = star_day.substring(0,4);
        var month = star_day.substring(4,6);
        var day = star_day.substring(6,8);
        
        var dateTimeForField = year+"-"+month+"-"+day;
        return dateTimeForField;
    },

    type: 'DXC_IntegracionSapUtils'
};