function onChange(control, oldValue, newValue, isLoading, isTemplate) {

    if (isLoading) { //if (isLoading || newValue === '') {
		//g_form.addInfoMessage('11 NO DEBERIA ENTRAR AL GRABAR - IF (isLoading || newValue === "") -> newValue -> ' + newValue);
		return;
    } else if (newValue === '') {
		//g_form.addInfoMessage('22 ELSE AL GRABAR - IF (isLoading || newValue === "") -> newValue -> ' + newValue);
	//	g_form.clearOptions('hr_service_arg');
	//	g_form.addOption('hr_service_arg', '-- None --', '-- None --');
		return;
	}

    /******************************************************/
    //Obtengo los Servicios - Formualario BackEnd
    /******************************************************/

    //Probar con Categoría Reporte o Sistema al recategorizar
    var countryCode = '';
    
    if (g_form.getValue('country_code_arg') == 'EAS') {
        countryCode = g_form.getValue('country_code_ext_cases_arg');
    } else {
        countryCode = g_form.getValue('country_code_arg');
    }
    
    var gaServicios = new GlideAjax('HR_UtilsAjax');
    gaServicios.addParam('sysparm_name', 'getServiciosByCategoryCaseArgCountry');
    gaServicios.addParam('sysparm_category', g_form.getValue('hr_category_arg'));
    //gaServicios.addParam('sysparm_country', g_form.getValue('country_code_arg')); //Original: Se reemplaza abajo
    gaServicios.addParam('sysparm_country', countryCode);
    gaServicios.addParam('sysparm_company', g_form.getValue('asa_verification'));
    gaServicios.getXML(GetResponse);

    function GetResponse(response) {
        var answer = response.responseXML.documentElement.getAttribute("answer");
        var FullValue = answer;
        var j = 0;
        var splitValue = FullValue.split('%');

        //g_form.addInfoMessage('CARGO SERVICIOS - Cambio la Category -> ' + g_form.getValue('hr_category_arg'));
		
		//Borro el SERVICIO
        g_form.clearOptions('hr_service_arg');
        g_form.addOption('hr_service_arg', '-- None --', '-- None --');
		
		//Borro la select_question
		g_form.clearOptions('select_question_arg');
        g_form.addOption('select_question_arg', '-- None --', '-- None --');
		
        while (j < splitValue.length) {
            var splitLabel = splitValue[j].split('|');
            g_form.addOption('hr_service_arg', splitLabel[0], splitLabel[1]);
            g_form.removeOption('hr_service_arg', '', '');
            j++;
        }
    }
}