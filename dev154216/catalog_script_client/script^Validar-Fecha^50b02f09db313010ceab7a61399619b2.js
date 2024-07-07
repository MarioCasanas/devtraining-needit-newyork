function onChange(control, oldValue, newValue, isLoading) {

	if (isLoading || newValue == '') {
        return;
    }

    var today_date = new Date();
    var today_date_str = formatDate(today_date, g_user_date_format);
    var strtDate = today_date_str;	
	
    var ga = new GlideAjax('DXCUtilsGeneric');
	ga.addParam('sysparm_name', 'getNowDate');
	ga.addParam('sysparm_date', strtDate);
    ga.getXMLWait();
    var answer = ga.getAnswer().substring(0,10);

	/*
	g_form.addInfoMessage("Answer is (Fecha ACTUAL) " + answer);
    g_form.addInfoMessage('Hoy es: (today_date_str) ' + today_date_str);
    g_form.addInfoMessage('Fecha seleccionada: ' + g_form.getValue('fecha_probable_de_parto'));	
	*/

	if (g_form.getValue('fecha_probable_de_parto') > answer ) {
		g_form.hideFieldMsg('fecha_probable_de_parto',true);		
	}
	else {
		g_form.clearValue('fecha_probable_de_parto');
		g_form.showFieldMsg('fecha_probable_de_parto','La fecha debe ser posterior al día actual: (' + answer + ')', 'error',true);		
	}
	
}