var DXCFeatureUtils = Class.create();
DXCFeatureUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	//Properties Safe
    COPY_ATTACHMENTS_SAFE : 'dxc.safe_feature.copy.attachments',
	FIELDS_TO_COPY_SAFE : 'dxc.safe_feature.copy.fields',
	STORY_FIELDS_COPY_SAFE : 'dxc.safe_feature.safe_story.copy.fields',
	COPY_ATTACHMENTS_SAFE_STORY : 'dxc.safe_feature.safe_story.copy.attachments',
	SCRUM_TASK_FIELDS_COPY_SAFE : 'dxc.safe_story.safe_scrum_task.copy.fields',
	COPY_ATTACHMENTS_SAFE_SCTASK : 'dxc.safe_feature.safe_story.sctask.copy.attachments',

	
	copyFeature: function(orig_sffeat_id, table_name){
		var copy_attachments = gs.getProperty(this.COPY_ATTACHMENTS_SAFE);
		var fields_array = gs.getProperty(this.FIELDS_TO_COPY_SAFE).split(",");
		var gr_original = new GlideRecord(table_name);
		
		//Copiamos la Característica Campo a Campo
		if(gr_original.get(orig_sffeat_id)){
			var gr_copy = new GlideRecord(table_name);
			gr_copy.initialize();
			for(var i =0; i< fields_array.length;i++){
				var field = fields_array[i];
				if(gr_original.isValidField(field)){
					gr_copy.setValue(field, gr_original.getValue(field));
				} else{
					this._logError("El Campo "+field+" no existe en la Tabla "+table_name+" o no tiene permisos.");
				}
			}
			
			var copy_id = gr_copy.insert();
			//Copy related SAFe Stories
			this._copySafeStories(gr_original.sys_id, copy_id);
			if(copy_attachments){
				this._copyAttachments(gr_original.sys_id, copy_id, table_name);
			}
		} else {
			this._logError("El ID de la Característica no exíste o fue borrado.");
		}
		
		gs.addInfoMessage("Se copio la Característica "+gr_original.number+", con sus Historias y Tareas.");
		return this._getRedirectURL(copy_id, table_name);		

	},
	_copySafeStories: function(feature_id, copy_id){
		var story_table_name = "sn_safe_story";
		var safe_story_field = gs.getProperty(this.STORY_FIELDS_COPY_SAFE).split(",");		
		var parent_field =  "sn_safe_feature";
		var gr_stories_source= new GlideRecord(story_table_name);
		var copy_attachments = gs.getProperty(this.COPY_ATTACHMENTS_SAFE_STORY);
		
		gr_stories_source.addQuery(parent_field,feature_id);
		gr_stories_source.query();

		if(gr_stories_source.getRowCount() == 0){
			this._logInfo("La Característica no tiene Historias.");
		} else {
			
			//Recorremos y copiamos las Stories 
			while(gr_stories_source.next()){
				if (gr_stories_source.active) {
					var gr_story_copy =  new GlideRecord(story_table_name);
					gr_story_copy.initialize();
					
					//Copiamos los Campos de cada Story
					for(var i =0; i< safe_story_field.length;i++){
						var field = safe_story_field[i];
						if(gr_stories_source.isValidField(field)){
							//Acá referencio la Historia con la nueva Característica
							if(field==parent_field){				
								gr_story_copy.setValue(field, copy_id);
							} else {
								gr_story_copy.setValue(field, gr_stories_source.getValue(field));
							}
						} else {
							this._logError("El Campo "+field+" no existe en la Tabla "+story_table_name+" o no tiene permisos.");
						}
					}
					
					var copy_story_id = gr_story_copy.insert();								
					//Copiamos los Attachments si tiene
					if(copy_attachments){
						this._copyAttachments(gr_stories_source.sys_id, copy_story_id, story_table_name);
					}				
	
					//Copy related scrum tasks					
					var scrum_task_table_name = "sn_safe_scrum_task";
					this._copyScrumTasks(gr_stories_source.sys_id, copy_story_id, scrum_task_table_name);				
				}
			}
		}
	},
	_copyScrumTasks: function(story_id, copy_id, scrum_task_table_name){
		var scrum_fields = gs.getProperty(this.SCRUM_TASK_FIELDS_COPY_SAFE).split(",");
		var parent_field = "sn_safe_story";
		var gr_sc_source = new GlideRecord(scrum_task_table_name);
		var copy_attachments = gs.getProperty(this.COPY_ATTACHMENTS_SAFE_SCTASK);
		gr_sc_source.addQuery(parent_field,story_id);
		gr_sc_source.query();

		if(gr_sc_source.getRowCount() == 0){
			this._logInfo("La Historia no tiene Tareas asociadas.");
		} else {
			
			while(gr_sc_source.next()){
				var gr_sc_copy =  new GlideRecord(scrum_task_table_name);
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
						this._logError("El Campo "+field+" no existe en la Tabla "+ scrum_task_table_name+" o no tiene permisos.");
					}
				}
				var copy_sctask_id = gr_sc_copy.insert();
				//Copiamos los Attachments si tiene
				if(copy_attachments){
					this._copyAttachments(gr_sc_source.sys_id, copy_sctask_id, scrum_task_table_name);
				}
			}			
		}

	},	
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
		gs.error("DXCFeatureUtils - " + error);
	},
	_logInfo: function(info){		
		gs.error("DXCFeatureUtils - " + info);
	}
	,

    type: 'DXCFeatureUtils'
});