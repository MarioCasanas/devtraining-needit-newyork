function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

	var countrySelected = g_form.getValue('ep2p_country_selection_backend');

	if (countrySelected == 'argentina') {
		countrySelected = 'F-AR';
	} else if (countrySelected == 'chile') {
		countrySelected = 'F-CL';
   } else if (countrySelected == 'colombia') {
		countrySelected = 'F-CO';
   } else if (countrySelected == 'el_salvador') {
		countrySelected = 'F-SV';
   } else if (countrySelected == 'mexico') {
		countrySelected = 'F-Mx';
   } else if (countrySelected == 'panama') {
		countrySelected = 'F-PA';
   } else if (countrySelected == 'puerto_rico') {
		countrySelected = 'F-PR';
   } else if (countrySelected == 'republica_dominicana') {
		countrySelected = 'F-RD';
   } else if (countrySelected == 'united_states') {
		countrySelected = 'F-US';
   }

   g_form.addInfoMessage('País Seleccionado: '+countrySelected);
   
}