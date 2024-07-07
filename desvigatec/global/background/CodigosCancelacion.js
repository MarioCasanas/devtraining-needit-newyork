//Carga Codigos de Cancelación
var grcCancelacion = new GlideRecord('sn_customerservice_mapeo_codigo_de_cancelacion');
    grcCancelacion.addEncodedQuery('u_activo=true');
    grcCancelacion.orderBy('u_codigo_cancelacion');
	grcCancelacion.query();

	gs.info('CANT: '+grcCancelacion.getRowCount());

    while (grcCancelacion.next()) {
        gs.info('Cod Cierre: '+grcCancelacion.u_codigo_cancelacion);
    }

//Carga la Descripcion en resolucion
var grcCancelacion = new GlideRecord('sn_customerservice_mapeo_codigo_de_cancelacion');
    grcCancelacion.addEncodedQuery('u_activo=true^u_codigo_cancelacion=Obsolescencia');
    grcCancelacion.orderBy('u_codigo_cancelacion');
	grcCancelacion.query();

	gs.info('CANT: '+grcCancelacion.getRowCount());

    while (grcCancelacion.next()) {
        gs.info('Cod Cierre: '+grcCancelacion.u_codigo_cancelacion);
    }