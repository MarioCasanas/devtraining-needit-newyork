var UtilsAjaxCustomerService = Class.create();
UtilsAjaxCustomerService.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getRemoteWmTask: function() {
        var idCaso = this.getParameter("sysparm_case");
		
        var grWorkOrder = new GlideRecord('wm_order');
        grWorkOrder.addEncodedQuery('initiated_from=' + idCaso);
        grWorkOrder.query();
        grWorkOrder.next();

        //gs.info('MARIO 1: CANT (WO): '+grWorkOrder.getRowCount());
        var grWOT = new GlideRecord('wm_task');
        grWOT.addEncodedQuery('parent=' + grWorkOrder.sys_id);
        grWOT.query();

        //gs.info('MARIO 2: CANT (WOT): '+grWOT.getRowCount());
        var modalidadAtencion = '';
        if (grWOT.next()) {
            modalidadAtencion = grWOT.u_kind_of_work.getDisplayValue();
            //gs.info('MARIO 3: Tarea: ' + grWOT.number + ' - Remote: ' + modalidadAtencion);
        } else {
            modalidadAtencion = 'ERR: Campo remoto en la Tarea vacío';
        }

		//gs.info('MARIO-Script Include (modalidadAtencion): '+modalidadAtencion);

        return modalidadAtencion;
    },
    type: 'UtilsAjaxCustomerService'

});