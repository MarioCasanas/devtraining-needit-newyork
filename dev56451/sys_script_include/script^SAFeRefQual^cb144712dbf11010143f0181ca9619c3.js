var SAFeRefQual = Class.create();
SAFeRefQual.prototype = {
	initialize: function() {
	},

	getTeamsByProgram : function(programID) {
		
		var teams = ""; 
		//el type es SAFe Teams
		var refQual = '';
		refQual = 'type='+gs.getProperty('sn_safe.Galicia_SAFeTeam');

		var gr = new GlideRecord('sn_safe_program_m2m_group');
		gr.addQuery('program.sys_id', programID);
		gr.query();

		while (gr.next()){
			teams = teams + "," + gr.group;
		}
			refQual += '^sys_idIN'+teams;

		return refQual;
	},
	
	getFeatureWithProgramIncrementNoCerrados :  function() {
		var queryString = ''; //'stateNOT IN3,4'; //Obtengo las Features que no están Implementadas Ni Canceladas (1,671)
		var gr = new GlideRecord('sn_safe_feature');
		gr.addEncodedQuery(queryString);
		gr.query();		

		var FeatureSinPICerrado='';
		var refQual='';
		//var i=0;

		//Obtengo las Features con PI que no estén Completed y Cancelled
		while (gr.next()){
			if ((gr.sn_safe_program_increment.state != 3) && (gr.sn_safe_program_increment.state != 4)){
		//		i=i+1;
				//gs.info(i + ' Feature: ' + gr.number + ' - Estado: ' + gr.state + ' Estado PI- ' + gr.sn_safe_program_increment.state + ' ' + gr.sn_safe_program_increment.number);
				FeatureSinPICerrado = FeatureSinPICerrado + "," + gr.sys_id;
			}
		}
		//gs.info("PI con estado != 3,4 " + i);
		refQual += '^sys_idIN'+FeatureSinPICerrado;

		//gs.info("FeatureSinPICerrado = " + refQual);

		return refQual;
	},

	type: 'SAFeRefQual'
};