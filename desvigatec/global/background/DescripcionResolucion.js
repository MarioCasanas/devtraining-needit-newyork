// Muestra Descripcion Resolucion

try {

//var query = 'u_area_tecnica=bdc_bodycam_hytera^u_modalidad_atencion=field_work^u_codigos_cierre=La red^u_aperturar_codigo_cierre=Problemas de cableado';

var query = 'u_area_tecnica=bdc_bodycam_hytera^u_modalidad_atencion=field_work^u_codigos_cierre=Comunicaciones Cliente';


    var grcCierre = new GlideRecord('sn_customerservice_mapeio_codigo_de_cierre');
        grcCierre.addEncodedQuery(query);
        //grcCierre.orderBy('u_aperturar_codigo_cierre');
        grcCierre.query();

        gs.info('CANT: '+grcCierre.getRowCount());
/*
        var callerIdList = [];

                while (grcCierre.next()) {
                callerIdList.push(grcCierre.u_aperturar_codigo_cierre.getDisplayValue().trim());
                gs.info('MARIO 2: grcCierre (For): ' + grcCierre.u_aperturar_codigo_cierre.getDisplayValue());
            }

            //Hago un Distinct de los Códigos de Cierre (los Desduplico).
            for (var i = 0; i < callerIdList.length; i++) {
                for (var j = i + 1; j < callerIdList.length; j++) {
                    if (callerIdList[j] == callerIdList[i]) {
                        callerIdList.splice(j, 1);
                        --j;
                    }
                }
            }

            gs.info('MARIO 3 (Distinct) ---> ' + callerIdList.length);

            var codigosCierre = '';
            //Obtengo los Códigos de Cierre sin duplicar.
            for (i = 0; i < callerIdList.length; i++) {
                gs.info('MARIO 4 ---> ' + callerIdList[i]);
                //Cargo el combo de "Código de Cierres"
                codigosCierre = codigosCierre + callerIdList[i] + ',';

            }
		
			codigosCierre = codigosCierre.substring(0,codigosCierre.length-1);

            gs.info('MARIO 5 ---> codigosCierre (return): ' + codigosCierre);
*/
            if (grcCierre.next()) {
                gs.info('MARIO 5.1 Resultado: ' + grcCierre.u_descripcion_resolucion);
            }

            //return codigosCierre;

} catch (ex) {
    var message = ex.message;
    gs.error("MARIO 6 Error in system logs: " + message);
}