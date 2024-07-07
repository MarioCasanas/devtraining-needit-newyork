var areaTecnica = 'BDC - Bodycam (Hytera)';
//var modalidadAtencion = 'Field Work';
var modalidadAtencion = 'Remote';

//var codigosCierre = 'Camara';
//var aperturarCodigoCierre = 'No reconce o pierde conexión 4G';

//gs.info('MARIO 1: modalidadAtencion: '+modalidadAtencion);

if (modalidadAtencion == 'Remote') {
	modalidadAtencion = 'Remoto';
} else if (modalidadAtencion == 'Field Work') {
	modalidadAtencion = 'Presencial';
}

//gs.info('MARIO 2: modalidadAtencion (cambio): '+modalidadAtencion);

var grcCierre = new GlideRecord('sn_customerservice_codigos_de_cierre');
    grcCierre.addEncodedQuery('u_area_tecnica='+areaTecnica+'^u_modalidad_atencion='+modalidadAtencion);
    //grcCierre.addEncodedQuery('u_area_tecnica=SDG - Sistemas de Guiado^u_modalidad_atencion=Presencial');
	//grcCierre.addQuery('u_codigos_cierre','=',codigosCierre);
	//grcCierre.addQuery('u_aperturar_codigo_cierre','=',aperturarCodigoCierre);
    grcCierre.orderBy('u_codigos_cierre');
	grcCierre.query();

    var callerIdList = [];
	while(grcCierre.next()) {
		callerIdList.push(grcCierre.u_codigos_cierre.trim());
        //gs.info('MARIO 2.2: grcCierre (For): '+grcCierre.u_codigos_cierre);
	}

	//Hago un Distinct de los Códigos de Cierre (los Desduplico).
	var arrayUtil = new ArrayUtil();
	callerIdList = arrayUtil.unique(callerIdList);

	//gs.info('MARIO 2.3 (Distinct) ---> ' + callerIdList.length);

	//Obtengo los Códigos de Cierre sin duplicar.
	for (var i = 0; i < callerIdList.length; i++) {
		gs.info('MARIO 3 ---> ' + callerIdList[i]);
		//Cargo el combo de "Código de Cierres"

	}

	//gs.info('Codigos de Cierre: '+grcCierre.getRowCount()+' - Descripción en Resolución (Causa): '+grcCierre.u_descripcion_resolucion);