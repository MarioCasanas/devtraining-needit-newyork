function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading) {
        return;
    }
	
    var ambiente = g_form.getValue('selecciona_el_ambiente_en_que_se_desean_los_permisos');
    
    //g_form.addInfoMessage('Limpio los campos -> MANDATORY AMBIENTE');

    g_form.clearValue('capture_el_portal_o_aplicativo_al_que_desea_el_acceso');
    g_form.clearValue('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos');
    g_form.clearValue('favor_de_adjuntar_el_vo_bo_del_usuario_funcional');
    g_form.clearValue('favor_de_seleccionar_una_plataforma_bi_web_o_workflow');
    g_form.clearValue('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso');
    g_form.clearValue('ver_la_lista_de_autorizadores_de_cada_proyecto');
    g_form.clearValue('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato');
    g_form.clearValue('favor_de_adjuntar_el_los_formatos_requeridos');
    g_form.clearValue('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica');
    g_form.clearValue('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados');
    g_form.clearValue('en_caso_de_ser_mas_de_1_usuario_favor_de_adjuntar_el_archivo_con_el_dato_del_aplicativo_que_desea');
    g_form.clearValue('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco');
    g_form.clearValue('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus');
    g_form.clearValue('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB');

    g_form.setMandatory('capture_el_portal_o_aplicativo_al_que_desea_el_acceso', false);
    g_form.setMandatory('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos', false);
    g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', false);
    g_form.setMandatory('favor_de_seleccionar_una_plataforma_bi_web_o_workflow', false);
    g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso', false);
    g_form.setMandatory('ver_la_lista_de_autorizadores_de_cada_proyecto', false);
    g_form.setMandatory('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato', false);
    g_form.setMandatory('favor_de_adjuntar_el_los_formatos_requeridos', false);
    g_form.setMandatory('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica', false);
    g_form.setMandatory('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados', false);
    g_form.setMandatory('en_caso_de_ser_mas_de_1_usuario_favor_de_adjuntar_el_archivo_con_el_dato_del_aplicativo_que_desea', false);
    g_form.setMandatory('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco', false);
	g_form.setMandatory('datos_personales',false);
    g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus', false);
    g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB', false);

    g_form.setDisplay('capture_el_portal_o_aplicativo_al_que_desea_el_acceso', false);
    g_form.setDisplay('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos', false);
    g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', false);
    g_form.setDisplay('favor_de_seleccionar_una_plataforma_bi_web_o_workflow', false);
    g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso', false);
    g_form.setDisplay('ver_la_lista_de_autorizadores_de_cada_proyecto', false);
    g_form.setDisplay('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato', false);
    g_form.setDisplay('favor_de_adjuntar_el_los_formatos_requeridos', false);
    g_form.setDisplay('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica', false);
    g_form.setDisplay('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados', false);
    g_form.setDisplay('en_caso_de_ser_mas_de_1_usuario_favor_de_adjuntar_el_archivo_con_el_dato_del_aplicativo_que_desea', false);
    g_form.setDisplay('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco', false);
	g_form.setDisplay('datos_personales', false);
    g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_Workflow_Ultimus', false);
    g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso_WEB', false);

	if(ambiente=='Ambiente QA (Pruebas)') {
		
		g_form.setMandatory('capture_el_portal_o_aplicativo_al_que_desea_el_acceso', true);
		g_form.setMandatory('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos', true);
		g_form.setMandatory('datos_personales',true);
		g_form.setMandatory('perfil_actual',false);
		g_form.setMandatory('perfil_solicitado',false);
		g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional',true);

		g_form.setDisplay('capture_el_portal_o_aplicativo_al_que_desea_el_acceso', true);
		g_form.setDisplay('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos', true);
		g_form.setDisplay('datos_personales', true);
		g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional',true);
	
	} else if(ambiente=='Ambiente PRD (Productivo)') {		
		
		g_form.setMandatory('favor_de_seleccionar_una_plataforma_bi_web_o_workflow', true);
		g_form.setMandatory('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso', true);
		g_form.setMandatory('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos', true);		
		g_form.setMandatory('datos_personales',true);
		g_form.setMandatory('perfil_actual',false);
		g_form.setMandatory('perfil_solicitado',false);
		g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional',true);

		g_form.setDisplay('favor_de_seleccionar_una_plataforma_bi_web_o_workflow', true);
		g_form.setDisplay('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso', true);
		g_form.setDisplay('favor_de_llenar_los_datos_de_la_persona_que_cambiara_de_permisos', true);
		g_form.setDisplay('datos_personales', true);
		g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional',true);		
	}

	g_form.setDisplay('en_caso_de_ser_mas_de_1_usuario_favor_de_adjuntar_el_archivo_con_el_dato_del_aplicativo_que_desea', true);
}