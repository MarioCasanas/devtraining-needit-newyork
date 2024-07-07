(function executeRule(current, previous /*null when async*/) {
/**
//Apps Web y Mobile				OXXO-Mx TI PortalL3
//Workflows						OXXO-Mx TI PortalL3

BI Inteligencia de Negocios		OXXO-Mx TI BIL3
GIS								OXXO-Mx TI Soporte GIS
Herramientas Colaborativas		OXXO-Mx TI Colaboracion
Integracion						OXXO-Mx TI SopWML3
Servicios Electronicos			OXXO-Mx TI SopWML3
WebMethods						OXXO-Mx TI SopWML3
Oracle EBS						OXXO-Mx TI OracleL3
RDF								OXXO-Mx TI RDF
RDM								OXXO-Mx TI RetailL3
RMS								OXXO-Mx TI RetailL3
SIA								OXXO-Mx TI SIA
*/

	gs.addInfoMessage('MC-Change emergency_software - Tarea: '+ current.short_description);
	gs.addInfoMessage('MC-Change emergency_software - Servicio: '+ current.business_service);

//Si el Servicio es "Apps Web y Mobile" -> Asigna el Grupo "OXXO-Mx TI PortalL3"
	if ((current.business_service == 'Apps Web y Mobile') || (current.business_service == 'Workflows')) {

		gs.addInfoMessage('Grupo a Asignar: OXXO-Mx TI PortalL3');
		current.assignament_group = '8eb6946d87dc9150a817bbb6dabb35c1'; //Grupo "OXXO-Mx TI PortalL3"
		current.update();

	}


})(current, previous);