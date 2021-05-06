try {

    var cantChecklist=0;
    var grChecklist = new GlideRecord('checklist');
    grChecklist.addQuery('document','=','8b1daff31b3d6450b38899f32a4bcba8'); //sys_id Historia Actual
    grChecklist.query();

    cantChecklist = grChecklist.getRowCount();
    gs.info('Cant Checklist: '+cantChecklist);

    var gr_copyChecklist = new GlideRecord('checklist');
    gr_copyChecklist.initialize();
    

    //Si la Historia tiene Checklist, genero el Checklist en la Historia Clonada
    if (cantChecklist > 0){
        
        grChecklist.next();

        //Inserto el Checklist
        //Guardo "sys_id del checklist (Actual)" 
        var varSys_id_Checklist = grChecklist.sys_id; //'1dfdeb371b3d6450b38899f32a4bcbbe';
        
        gs.info('Document -> 767afaa4db06a450dc14f13968961988'); //sys_id de la copia Nueva
        gs.info('Owner -> '+grChecklist.owner);
        gs.info('Table -> '+grChecklist.table);
        gs.info('varSys_id_Checklist -> '+varSys_id_Checklist);
        gs.info('-----------------------------------------------> ');
        
        //Seteo los valores para cargar en el Checklist Nuevo
        gr_copyChecklist.setValue('document', '767afaa4db06a450dc14f13968961988'); //sys_id de la Story Nueva
        gr_copyChecklist.setValue('owner', grChecklist.owner);
        gr_copyChecklist.setValue('table', grChecklist.table);
        gr_copyChecklist.setWorkflow(false); //No ejecuta BR
        
        //Guardo el sys_id de la Checklist creada
        var new_Checklist = gr_copyChecklist.insert();
        gs.info('checklist.sys_id -> '+ new_Checklist);

        //Verifico si el Checklist tiene Ítems asociados
        var grChecklist_Item = new GlideRecord('checklist_item');
        grChecklist_Item.addQuery('checklist','=', varSys_id_Checklist); //grChecklist_Item.addQuery('checklist.sys_id','=', varSys_id_Checklist);
        grChecklist_Item.orderBy('order');
        grChecklist_Item.query();

        gs.info('Cant Checklist ITEMs: '+grChecklist_Item.getRowCount());


        //Inicializo el Record para Completar los campos
        var gr_copyChecklist_item = new GlideRecord('checklist_item'); //table_name
        gr_copyChecklist_item.initialize();
        
        
        if (grChecklist_Item.getRowCount() > 0) {

            //Inserto los Items de los Checklist
            while (grChecklist_Item.next()) {

                gs.info('varSys_id_Checklist -> '+varSys_id_Checklist);
                gs.info('name -> '+grChecklist_Item.name);
                gs.info('complete -> '+grChecklist_Item.complete);
                gs.info('completed -> '+grChecklist_Item.completed);
                gs.info('completed_by -> '+grChecklist_Item.completed_by);
                gs.info('order -> '+grChecklist_Item.order);
                gs.info('-----------------------------------------------> ');

                gr_copyChecklist_item.setValue('checklist', new_Checklist); //'d4dc1254db826450dc14f13968961925');
                gr_copyChecklist_item.setValue('name', grChecklist_Item.name);
                gr_copyChecklist_item.setValue('complete', grChecklist_Item.complete);
                gr_copyChecklist_item.setValue('completed', grChecklist_Item.completed);
                gr_copyChecklist_item.setValue('completed_by', grChecklist_Item.completed_by);
                gr_copyChecklist_item.setValue('order', grChecklist_Item.order);
                gr_copyChecklist_item.setWorkflow(false); //No ejecuta BR
                gr_copyChecklist_item.insert();

            }
        }        
    }

} catch (error) {
    var message = error.message;
    gs.error("Copy checklist y chelist_item - Error: " + message);
};