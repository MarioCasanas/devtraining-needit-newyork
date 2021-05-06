var galiciaOKRUtils = Class.create();
galiciaOKRUtils.prototype = {
	initialize: function() {
	},

	filterGroups: function(level,client) {//Company - Tribe / Area - Squad / Team
		if(level == 'Squad / Team'){
			return 'typeLIKE7dbb14d39f320300730e5bb0657fcfea';//SAFe Team
		}else if(level == 'Tribe / Area'){
			return 'typeLIKEccc6b65bdb9a141041afca7e3b9619aa';//Tribe / Area 
		}
		else if (level == 'Company'){
			return 'typeLIKE005e4aa8dbee141041afca7e3b9619c8';
		}
	},

	/* ORIGINAL
	filterObjectives: function(level) {//Company - Tribe / Area - Squad / Team
		if(level == 'Squad / Team'){
			return 'u_state=In Progress^u_levelINCompany,Tribe / Area';
		}else if(level == 'Tribe / Area' || level == 'Company'){
			return 'u_state=In Progress^u_level=Company'; 
		}
	*/
	filterObjectives: function(level) {//Company - Tribe / Area - Squad / Team
		if(level == 'Squad / Team'){
			return 'u_state=In Progress^u_levelINCompany,Tribe / Area';
		}else if(level == 'Tribe / Area') {
			return 'u_state=In Progress^u_levelINCompany,Tribe / Area'; 
		}else if(level == 'Company'){
			return 'u_state=In Progress^u_level=Company'; 
		}
	},

	/* ORIGINAL
	//Filtra KR por el Objetivo Padre
	filterKrByParentObjective: function (parentObjective) {
		var compareObjectives = new GlideRecord ("u_okr_kr");
		compareObjectives.addQuery("u_objective", parentObjective);
		compareObjectives.query();
		var objectiveArray = [];
		while (compareObjectives.next()){
			objectiveArray.push(compareObjectives.sys_id.toString());	
		}
		var krQuery = "u_state=In Progress^sys_idIN" + objectiveArray.toString();
		return krQuery;
	},
	*/
	filterKrByObjective: function () {
		var compareObjectives = new GlideRecord ("u_okr_kr");
		compareObjectives.query();
		var objectiveArray = [];
		while (compareObjectives.next()){
			objectiveArray.push(compareObjectives.sys_id.toString());	
		}
		var krQuery = "u_state=In Progress^u_objective.u_levelINCompany,Tribe / Area^sys_idIN" + objectiveArray.toString();
		return krQuery;
	},

	type: 'galiciaOKRUtils'


};