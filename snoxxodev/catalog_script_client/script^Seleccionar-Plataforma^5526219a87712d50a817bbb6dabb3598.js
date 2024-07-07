function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    /**
     * Plataformas:
     *    BI
     *    WEB
     *    Workflow (Ultimus)"
     * 
     *    Nota: BI No tiene una regla de campos
     */

    var plataforma = g_form.getValue('favor_de_seleccionar_una_plataforma_bi_web_o_workflow');

    //g_form.addInfoMessage('¿Platafirna? -> ' + plataforma);

    g_form.clearValue('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus');
    g_form.clearValue('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB');

    g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus', false);
    g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB', false);

    g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus', false);
    g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB', false);

    if (plataforma == 'WEB') {

        g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB', true);
		g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
		g_form.setMandatory('favor_de_adjuntar_el_los_formatos_requeridos', true);
        
		g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB', true);
		g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
		g_form.setDisplay('favor_de_adjuntar_el_los_formatos_requeridos', true);
		
    } else if (plataforma == 'Workflow (Ultimus)') {

        g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus', true);
		g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
		g_form.setMandatory('favor_de_adjuntar_el_los_formatos_requeridos', true);

		g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus', true);
		g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
		g_form.setDisplay('favor_de_adjuntar_el_los_formatos_requeridos', true);
		
    }
}