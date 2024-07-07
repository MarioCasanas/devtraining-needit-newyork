// Carga las Areas Técnicas

try {

    var grcCierre = new GlideRecord('sn_customerservice_mapeio_codigo_de_cierre'); //sn_customerservice_codigos_de_cierre
    grcCierre.addEncodedQuery('u_activo=True^u_modalidad_atencion=field_work');
    grcCierre.orderBy('u_area_tecnica');
    grcCierre.query();

    gs.info('getAreaTecnica MARIO 1.1 - CANT: ' + grcCierre.getRowCount());

    var callerIdList = [];
    while (grcCierre.next()) {
        callerIdList.push(grcCierre.u_area_tecnica.getDisplayValue().trim());
        //gs.info('getAreaTecnica MARIO 2: grcCierre (For): ' + grcCierre.u_area_tecnica.getDisplayValue());
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

    gs.info('getAreaTecnica MARIO 3 (Distinct) ---> ' + callerIdList.length);

    var sAreaTecnica = '';
    for (i = 0; i < callerIdList.length; i++) {
        gs.info('getAreaTecnica MARIO 4 ---> ' + callerIdList[i]);
        //Cargo el combo de "Código de Cierres"
        sAreaTecnica = sAreaTecnica + callerIdList[i] + ',';

    }

    sAreaTecnica = sAreaTecnica.substring(0, sAreaTecnica.length - 1);
    gs.info('getAreaTecnica MARIO 5 ---> sAreaTecnica: ' + sAreaTecnica);

    //return sAreaTecnica;

} catch (ex) {
    var message = ex.message;
    gs.error("getAreaTecnica MARIO 6 Error in system logs: " + message);
}
