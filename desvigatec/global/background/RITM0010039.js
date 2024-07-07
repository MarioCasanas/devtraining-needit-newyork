var areaTecnica = 'BDC - Bodycam (Hytera)';
var modalidadAtencion = 'Presencial';
var codigosCierre = 'Camara';
var aperturarCodigoCierre = 'No reconce o pierde conexión 4G';

var grcCierre = new GlideRecord('sn_customerservice_codigos_de_cierre');
	grcCierre.addQuery('u_area_tecnica','=',areaTecnica);
	grcCierre.addQuery('u_modalidad_atencion','=',modalidadAtencion);
	grcCierre.addQuery('u_codigos_cierre','=',codigosCierre);
	grcCierre.addQuery('u_aperturar_codigo_cierre','=',aperturarCodigoCierre);
	grcCierre.query();
	grcCierre.next();

	gs.info('Codigos de Cierre: '+grcCierre.getRowCount()+' - Descripción en Resolución (Causa): '+grcCierre.u_descripcion_resolucion);