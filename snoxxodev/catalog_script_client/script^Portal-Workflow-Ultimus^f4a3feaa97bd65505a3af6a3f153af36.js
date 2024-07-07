function onChange(control, oldValue, newValue, isLoading) {
    if (isLoading) {
        return;
    }

	//g_form.addInfoMessage('Nuevo valor en Portal Aplicativo: '+newValue);
	
    if (newValue == 'Sistema de Precios SIPRE') {
        g_form.setMandatory('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco', true);
        g_form.setDisplay('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco', true);
    } else {
        g_form.setMandatory('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco', false);
        g_form.setDisplay('sipre_categor_a_os_favor_de_solicitar_los_permisos_por_medio_del_portal_idfemco', false);
    }

}