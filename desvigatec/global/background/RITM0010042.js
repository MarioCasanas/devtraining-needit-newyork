// CASE: aefa7e3c1bf2061093e6fe6e034bcb12
// Con el Caso, obtengo la WO y luego la WOT para cerrarlas

var grWorkOrder = new GlideRecord('wm_order');
    grWorkOrder.addEncodedQuery('initiated_from='+current.sys_id);//aefa7e3c1bf2061093e6fe6e034bcb12
    grWorkOrder.query();
    grWorkOrder.next();

//gs.info('MARIO 1.1: grWorkOrder.sys_id: '+grWorkOrder.sys_id);
gs.info('MARIO 1.2: CANT (WO): '+grWorkOrder.getRowCount());


var grWOT = new GlideRecord('wm_task');
    grWOT.addEncodedQuery('parent=' + grWorkOrder.sys_id+'^stateNOTIN3,4,7');
    grWOT.query();

    gs.info('MARIO 2: CANT (WOT): '+grWOT.getRowCount());

    while (grWOT.next()) {
        gs.info('MARIO 3: Tarea Cerrada: '+grWOT.number+' - Desc: '+grWOT.short_description);
        //Actualizo el estado las Tareas a "Cerrado completo"/"Closed Complete"
        grWOT.setValue('work_notes',"Cerrada porque el Caso");
		grWOT.setValue('state',3);
        grWOT.update();
    }