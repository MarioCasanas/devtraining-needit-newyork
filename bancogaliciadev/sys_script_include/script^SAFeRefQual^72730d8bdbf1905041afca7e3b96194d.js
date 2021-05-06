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
		// Obtengo las Features que no están Implementadas Ni Canceladas, 
		// y además obtengo las Features con PI que no estén Completed y Cancelled
		
		var queryString = 'stateNOT IN3,4^sn_safe_program_increment.stateNOT IN3,4'; 
		var gr = new GlideRecord('sn_safe_feature');	
		gr.addEncodedQuery(queryString);
		gr.query();

		var sFeaturebyPI='';
		var refQual='';

		while (gr.next()){    
			//gs.info(i + ' Feature: ' + gr.number + ' - Estado: ' + gr.state + ' Estado PI- ' + gr.sn_safe_program_increment.state + ' ' + gr.sn_safe_program_increment.number);
			sFeaturebyPI = sFeaturebyPI + "," + gr.sys_id;
		}
		refQual += '^sys_idIN'+sFeaturebyPI;
		return refQual;
	},

	type: 'SAFeRefQual'
};