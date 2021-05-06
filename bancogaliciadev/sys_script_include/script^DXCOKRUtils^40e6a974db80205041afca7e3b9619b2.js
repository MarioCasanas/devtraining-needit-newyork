var DXC_OKRUtils = Class.create();
DXC_OKRUtils.prototype = {
    initialize: function() {},	

    getKRProgress: function(inBase, inTarget, inResult, inU_unit) {
        //If the Baseline is bigger than the Target, then tendency is descendent
        //If the Baseline is smaller than the Target, then tendency is ascendent
        //Si el base es igual al target, la tendencia es mantener

        if (inU_unit == "#" || "$" || "U$S" || "%") {

            if (inBase < inTarget) {
                return (((inResult) - (inBase)) / ((inTarget) - (inBase)) * 100);
            } else if (inBase > inTarget) {
                return (((inBase) - (inResult)) / ((inBase) - (inTarget)) * 100);
            } else {
                return (inResult / inTarget) * 100;

            }
        } else if (inU_unit == "hito") {
            return inResult * 100;
        } else {
            return "";
        }
    },
	
	getLastCheckinCreated: function (inKRsys_id) {
		var grCheckIn = new GlideRecord ('u_okr_kr_checkin');
		grCheckIn.addQuery('u_key_result.sys_id', inKRsys_id);
		grCheckIn.orderByDesc('sys_created_on');
		grCheckIn.setLimit(1);
		grCheckIn.query();

		if (grCheckIn.next()) {
			return grCheckIn;
		}else {
			return "";
		}
	},
    
    /********************************************* */
    //Codigo para DUPLUCAR OKR
    /********************************************* */

    //Properties OKR y Key Results
    FIELDS_TO_COPY_OKR : 'dxc.u_objective_okr.copy.fields',
    COPY_ATTACHMENTS_OKR : 'dxc.u_objective_okr.copy.attachments',
    FIELDS_TO_COPY_KR : 'dxc.u_okr_kr.copy.fields',
    COPY_ATTACHMENTS_KR : 'dxc.u_okr_kr.copy.attachments',
    
    /**************************************************************************** */
    /* Solo se copian los OKR con sus respectivos Key Results
    /* Los Check Ins NO se copian porque no los pueden Eliminar

    FIELDS_TO_COPY_CHECKIN : 'dxc.u_okr_kr_checkin.copy.fields',
    COPY_ATTACHMENTS_CHECKIN : 'dxc.u_okr_kr_checkin.copy.attachments',
    /**************************************************************************** */

	copyOKR: function(orig_sffeat_id, table_name){
		var copy_attachments = gs.getProperty(this.COPY_ATTACHMENTS_OKR);
		var fields_array = gs.getProperty(this.FIELDS_TO_COPY_OKR).split(",");
        var gr_original = new GlideRecord(table_name);
	
		//Copiamos el OKR Campo a Campo
		if(gr_original.get(orig_sffeat_id)){
			var gr_copy = new GlideRecord(table_name);
			gr_copy.initialize();
			for(var i =0; i< fields_array.length;i++){
				var field = fields_array[i];
				if(gr_original.isValidField(field)){					
					if (field == 'u_state') {// Asigno por Default el estado "Draft" al Crear el Objetivo
						gr_copy.setValue(field, 'Draft');
						//gs.print(i +' -VARLOR -> Draft');
					}else if (field != 'u_state'){
						gr_copy.setValue(field, gr_original.getValue(field));
						//gs.print(i +' -VARLOR -> ' + gr_original.getValue(field));
					}
				} else {
					this._logError("El Campo "+field+" no existe en la Tabla "+table_name+" o no tiene permisos.");
				}
			}
			
			var copy_id = gr_copy.insert();
            
			//Copy related KR
			this._copyKeyResults(gr_original.sys_id, copy_id);
            if(copy_attachments){
				this._copyAttachments(gr_original.sys_id, copy_id, table_name);
			}

		} else {
			this._logError("El ID del OKR no exíste o fue borrado.");
		}
		
		gs.addInfoMessage("Se copio el Objetivo "+gr_original.u_number +", con sus Key Results.");
		return this._getRedirectURL(copy_id, table_name);

    },    
	_copyKeyResults: function(okr_id, copy_id){
		var kr_table_name = "u_okr_kr";
		var kr_field = gs.getProperty(this.FIELDS_TO_COPY_KR).split(",");
		var parent_field =  "u_objective";
		var gr_krs_source= new GlideRecord(kr_table_name);
		var copy_attachments = gs.getProperty(this.COPY_ATTACHMENTS_KR);
		
		gr_krs_source.addQuery(parent_field,okr_id);
		gr_krs_source.query();

		if(gr_krs_source.getRowCount() == 0){
			this._logInfo("El Objetivo OKR "+gr_krs_source.u_number+" no tiene Key Results.");
		} else {
			
			//Recorremos y copiamos los Key Results
			while(gr_krs_source.next()){
				if ((gr_krs_source.u_number != '') && (gr_krs_source.u_state == 'In Progress')) {
					var gr_kr_copy =  new GlideRecord(kr_table_name);
					gr_kr_copy.initialize();
					
					//Copiamos los Campos de cada Key Result
					for(var i =0; i< kr_field.length;i++){
						var field = kr_field[i];
						if(gr_krs_source.isValidField(field)){							
							if (field == 'u_state') {
								gr_kr_copy.setValue(field, 'Draft');// Asigno por Default el estado "Draft" al Crear el KR
							}else if (field != 'u_state') { 
								//Acá referencio el Key Result con el nuevo OKR
								if(field==parent_field){
									gr_kr_copy.setValue(field, copy_id);
								} else {
									gr_kr_copy.setValue(field, gr_krs_source.getValue(field));
								}
							}
						} else {
							this._logError("El Campo "+field+" no existe en la Tabla "+kr_table_name+" o no tiene permisos.");
						}
					}					
					
					var copy_kr_id = gr_kr_copy.insert();
					//Copiamos los Attachments si tiene
					if(copy_attachments){
						this._copyAttachments(gr_krs_source.sys_id, copy_kr_id, kr_table_name);
					}	
	
                    //Copy related Key Results
                    /*
                    /* Los Check Ins NO se copian porque no los pueden Eliminar
                    /*
					var checkin_table_name = "u_okr_kr_checkin";
                    this._copyCheckIn(gr_krs_source.sys_id, copy_kr_id, checkin_table_name);
                    */
				}
			}
		}
    },
    
    /**************************************************************************** */
    /* Omitido porque No tienen perfil para poder Eliminar los Check In's
    /* Solo se copian los OKR con sus respectivos Key Results
    /**************************************************************************** */
    /*
    _copyCheckIn: function(story_id, copy_id, checkin_table_name){
		var scrum_fields = gs.getProperty(this.FIELDS_TO_COPY_CHECKIN).split(",");
		var parent_field = "u_okr_kr";
		var gr_sc_source = new GlideRecord(checkin_table_name);
		var copy_attachments = gs.getProperty(this.COPY_ATTACHMENTS_CHECKIN);
		gr_sc_source.addQuery(parent_field,story_id);
		gr_sc_source.query();

		if(gr_sc_source.getRowCount() == 0){
			this._logInfo("El Key Result no tiene Check In's asociados.");
		} else {
			
			while(gr_sc_source.next()){
				var gr_sc_copy =  new GlideRecord(checkin_table_name);
				gr_sc_copy.initialize();

				for(var i =0; i< scrum_fields.length;i++){
					var field = scrum_fields[i];
					if(gr_sc_source.isValidField(field)){
						if(field==parent_field){
							gr_sc_copy.setValue(field, copy_id);
						} else {
							gr_sc_copy.setValue(field, gr_sc_source.getValue(field));
						}
					} else {
						this._logError("El Campo "+field+" no existe en la Tabla "+ checkin_table_name+" o no tiene permisos.");
					}
				}
				var copy_sctask_id = gr_sc_copy.insert();
				//Copiamos los Attachments si tiene
				if(copy_attachments){
					this._copyAttachments(gr_sc_source.sys_id, copy_sctask_id, checkin_table_name);
				}
			}
		}
    },
    */

	_getRedirectURL: function(sysId, table_name) {
		var urlOnStack = '';
		var gu = new GlideURL(table_name+'.do');
		gu.set('sys_id', sysId);
		
		var createdChangeUrl = gu.toString();
		urlOnStack = createdChangeUrl;
		return urlOnStack;
	},
	_copyAttachments: function(original_id, copy_id, table_name) {
        GlideSysAttachment.copy(table_name, original_id, table_name ,copy_id);
    },
	_logError: function(error){
		gs.error("DXC_OKRUtils - " + error);
	},
	_logInfo: function(info){		
		gs.error("DXC_OKRUtils - " + info);
	},
	
    type: 'DXC_OKRUtils'

};