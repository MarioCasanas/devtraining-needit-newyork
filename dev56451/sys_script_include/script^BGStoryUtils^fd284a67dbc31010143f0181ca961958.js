var BGStoryUtils = Class.create();
BGStoryUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	//Properties Safe
    COPY_ATTACHMENTS_SAFE : 'bg.safe_story.copy.attachments',
	FIELDS_TO_COPY_SAFE : 'bg.safe_story.copy.fields',
	SCRUM_TASK_FIELDS_COPY_SAFE : 'bg.safe_story.safe_scrum_task.copy.fields',
	//Properties Agile
	COPY_ATTACHMENTS_AGILE: 'bg.agile_story.copy.attachments',
	FIELDS_TO_COPY_AGILE : 'bg.agile_story.copy.fields',
	SCRUM_TASK_FIELDS_COPY_AGILE : 'bg.agile_story.scrum_task.copy.fields',
	
	copyStory: function(orig_stry_id, table_name){
		var gr_original = new GlideRecord(table_name);
		var fields_array = table_name=="sn_safe_story" ?gs.getProperty(this.FIELDS_TO_COPY_SAFE).split(","): gs.getProperty(this.FIELDS_TO_COPY_AGILE).split(",");
		var copy_attachments = table_name=="sn_safe_story" ?gs.getProperty(this.COPY_ATTACHMENTS_SAFE) : gs.getProperty(this.COPY_ATTACHMENTS_AGILE);
		if(gr_original.get(orig_stry_id)){
			var gr_copy = new GlideRecord(table_name);
			gr_copy.initialize();
			for(var i =0; i< fields_array.length;i++){
				var field = fields_array[i];
				if(gr_original.isValidField(field)){
					gr_copy.setValue(field, gr_original.getValue(field));
				} else{
					this._logError("field "+field+" doesn´t exist on table "+table_name);
				}
			}
			var copy_id = gr_copy.insert();
			//Copy related scrum tasks
			var scrum_task_table_name = table_name=="sn_safe_story" ? "sn_safe_scrum_task" : "rm_scrum_task";
			this._copyScrumTasks(gr_original.sys_id, copy_id, scrum_task_table_name);
			if(copy_attachments){
				this._copyAttachments(gr_original.sys_id, copy_id, table_name);
			}
		} else {
			this._logError("Wrong ID or Story has been deleted");
		}
		return this._getRedirectURL(copy_id, table_name);
	},
	_copyScrumTasks: function(story_id, copy_id, scrum_table_name){
		var scrum_fields = scrum_table_name=="sn_safe_scrum_task" ?gs.getProperty(this.SCRUM_TASK_FIELDS_COPY_SAFE).split(",") : gs.getProperty(this.SCRUM_TASK_FIELDS_COPY_AGILE).split(",");
		var parent_field =  scrum_table_name=="sn_safe_scrum_task" ? "sn_safe_story" : "story";
		var gr_sc_source= new GlideRecord(scrum_table_name);
		gr_sc_source.addQuery(parent_field,story_id);
		gr_sc_source.query();
		if(gr_sc_source.getRowCount() == 0){
			this._logInfo("The story doesn´t have scrum tasks");
		} else {
			while(gr_sc_source.next()){
				var gr_sc_copy =  new GlideRecord(scrum_table_name);
				gr_sc_copy.initialize();
				for(var i =0; i< scrum_fields.length;i++){
				var field = scrum_fields[i];
				if(gr_sc_source.isValidField(field)){
					if(field==parent_field){
						gr_sc_copy.setValue(field, copy_id);
					} else
						gr_sc_copy.setValue(field, gr_sc_source.getValue(field));
				} else{
					this._logError("field "+field+" doesn´t exist on table "+ scrum_table_name);
				}
			}
				gr_sc_copy.insert();
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
		gs.error("BGStoryUtils - " + error);
	},
	_logInfo: function(info){
		gs.error("BGStoryUtils - " + info);
	}
	,
    type: 'BGStoryUtils'
});