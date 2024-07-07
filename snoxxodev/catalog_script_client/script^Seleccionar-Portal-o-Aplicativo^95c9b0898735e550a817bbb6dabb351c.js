function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

    //Seleccionar Portal o Aplicativo
    var portal = g_form.getValue('favor_de_seleccionar_el_portal_o_aplicativo_al_que_desea_el_acceso');

    //Limpio los Campos
    g_form.clearValue('ver_la_lista_de_autorizadores_de_cada_proyecto');
    g_form.clearValue('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato');
    g_form.clearValue('favor_de_adjuntar_el_los_formatos_requeridos');
    g_form.clearValue('favor_de_adjuntar_el_vo_bo_del_usuario_funcional');
    g_form.clearValue('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica');
    g_form.clearValue('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados');

    g_form.setMandatory('ver_la_lista_de_autorizadores_de_cada_proyecto', false);
    g_form.setMandatory('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato', false);
    g_form.setMandatory('favor_de_adjuntar_el_los_formatos_requeridos', false);
    g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', false);
    g_form.setMandatory('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica', false);
    g_form.setMandatory('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados', false);

    g_form.setDisplay('ver_la_lista_de_autorizadores_de_cada_proyecto', false);
    g_form.setDisplay('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato', false);
    g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', false);
    g_form.setDisplay('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica', false);
    g_form.setDisplay('favor_de_adjuntar_el_los_formatos_requeridos', false);
    g_form.setDisplay('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados', false);

    //g_form.addInfoMessage('Limpio los campos -> Seleccionar App');

    if (portal == 'BI Microstrategy (Business inteligence)') {

        //g_form.addInfoMessage('BI Microstrategy (Business inteligence)');

        g_form.setMandatory('ver_la_lista_de_autorizadores_de_cada_proyecto', true);
        g_form.setMandatory('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato', true);
        g_form.setMandatory('favor_de_adjuntar_el_los_formatos_requeridos', true);
        g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);

        g_form.setDisplay('ver_la_lista_de_autorizadores_de_cada_proyecto', true);
        g_form.setDisplay('deber_de_descargar_llenar_y_adjuntar_el_siguiente_formato', true);
        g_form.setDisplay('favor_de_adjuntar_el_los_formatos_requeridos', true);
        g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);

    } else if (portal == 'BI Publisher') {

        //g_form.addInfoMessage('BI Publisher');

        g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
        g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);

    } else if (portal == 'Tableau') {

        //g_form.addInfoMessage('Tableau');

        g_form.setMandatory('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
        g_form.setMandatory('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica', true);
        g_form.setMandatory('favor_de_adjuntar_el_los_formatos_requeridos', true);
        g_form.setMandatory('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados', true);

        g_form.setDisplay('favor_de_adjuntar_el_vo_bo_del_usuario_funcional', true);
        g_form.setDisplay('favor_de_adjuntar_correo_con_detalle_de_la_solicitud_o_problem_tica', true);
        g_form.setDisplay('favor_de_adjuntar_el_los_formatos_requeridos', true);
        g_form.setDisplay('favor_de_adjuntar_el_archivo_con_los_aplicativos_que_desea_el_alta_y_los_datos_de_los_empleados', true);

    }

}