    var grOC = new GlideRecord('sn_shop_solicitud_de_cita');
    grOC.addEncodedQuery('sys_id=49aa5332472e0a50d4000884f16d43ab');
	grOC.query();
    grOC.next();

    var listaOC = grOC.u_ordenes_compra;
    var arrayOC = listaOC.split(",");

	//gs.info('MARIO: 2 -OC: '+grOC.u_ordenes_compra+' - Cant arrayOC: '+arrayOC.length);    
	//Loopear las OC para cambiar el Estado a "Cita Solicitada"    
    for (var i = 0; i < arrayOC.length; i++) {

		gs.info('MARIO: 3 -OC número '+i+': ' + arrayOC[i]);

        var grListaOC = new GlideRecord('sn_shop_purchase_order');
        grListaOC.addEncodedQuery('sys_id=' + arrayOC[i]);
        grListaOC.query();

        while (grListaOC.next()) {

            gs.info('MARIO: 4 -La OC: ' + grListaOC.number + ' quedó con estado "Cita Solicitada"');
			gs.info('MARIO: 5 -Solicitud de Cita: ' + grOC.u_fecha_solicitud_cita);
            
			grListaOC.status = 'Cita solicitada';
            
            gs.info('MARIO: 6 tipo de DATO: '+typeof grOC.u_fecha_solicitud_cita); 

            var fechaSC = new GlideDate();
            fechaSC.setValue(grOC.u_fecha_solicitud_cita);
            grListaOC.u_fecha_cita_solicitada = fechaSC.getByFormat("YYYY-MM-DD");

            gs.info('MARIO: 7 tipo de DATO fechaSC: '+typeof fechaSC);

            grListaOC.setWorkflow(false);

            //grListaOC.u_fecha_cita_solicitada = grOC.u_fecha_solicitud_cita;            
            grListaOC.update();

        }

    }