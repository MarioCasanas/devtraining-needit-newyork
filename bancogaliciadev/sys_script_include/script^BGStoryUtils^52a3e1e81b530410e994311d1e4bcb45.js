var BGStoryUtils = Class.create();
BGStoryUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
<<<<<<< HEAD
	
=======
>>>>>>> workflow
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
<<<<<<< HEAD

			//Copy Checklist
			this._copyChecklist_ChecklistItem(gr_original.sys_id, copy_id);

=======
>>>>>>> workflow
			//Copy related scrum tasks
			var scrum_task_table_name = table_name=="sn_safe_story" ? "sn_safe_scrum_task" : "rm_scrum_task";
			this._copyScrumTasks(gr_original.sys_id, copy_id, scrum_task_table_name);
			if(copy_attachments){
				this._copyAttachments(gr_original.sys_id, copy_id, table_name);
			}
		} else {
			this._logError("Wrong ID or Story has been deleted");
		}
		
		gs.addInfoMessage('Se copio la Historia '+gr_original.number+' satisfactoriamente.');
		return this._getRedirectURL(copy_id, table_name);
	},
	_copyScrumTasks: function(story_id, copy_id, scrum_table_name){
		var scrum_fields = scrum_table_name=="sn_safe_scrum_task" ?gs.getProperty(this.SCRUM_TASK_FIELDS_COPY_SAFE).split(",") : gs.getProperty(this.SCRUM_TASK_FIELDS_COPY_AGILE).split(",");
		var parent_field =  scrum_table_name=="sn_safe_scrum_task" ? "sn_safe_story" : "story";
		var gr_sc_source= new GlideRecord(scrum_table_name);
		gr_sc_source.addQuery(parent_field,story_id);
		gr_sc_source.query();
<<<<<<< HEAD
		if(gr_sc_source.getRowCount() == 0) {
=======
		if(gr_sc_source.getRowCount() == 0){
>>>>>>> workflow
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
<<<<<<< HEAD
			var copy_id = gr_sc_copy.insert();

				//Copy Checklist_item
				this._copyChecklist_ChecklistItem(gr_sc_source.sys_id, copy_id);
			}
		}
	},
	_copyChecklist_ChecklistItem: function(story_id, copy_id){
		try {

			var cantChecklist=0;
			var grChecklist = new GlideRecord('checklist');
			grChecklist.addQuery('document','=',story_id.toString()); //sys_id Historia Actual
			grChecklist.query();
		
			cantChecklist = grChecklist.getRowCount();
			gs.info('Cant Checklist: '+cantChecklist);
		
			var gr_copyChecklist = new GlideRecord('checklist');
			gr_copyChecklist.initialize();

			
			//Si la Historia tiene Checklist, genero el Checklist en la Historia Clonada
			if (cantChecklist > 0) {
				
				grChecklist.next();

				//Inserto el Checklist
				//Guardo "sys_id del checklist (Actual)" 
				var varSys_id_Checklist = grChecklist.sys_id; //'1dfdeb371b3d6450b38899f32a4bcbbe';

				/*
				gs.info('Document -> '+grChecklist.document);
				gs.info('Owner -> '+grChecklist.owner);
				gs.info('Table -> '+grChecklist.table);
				gs.info('varSys_id_Checklist -> '+varSys_id_Checklist);            
				gs.info('-----------------------------------------------> ');
				*/								

				gr_copyChecklist.setValue('document', copy_id.toString()); //sys_id de la Story Nueva
				gr_copyChecklist.setValue('owner', grChecklist.owner);
				gr_copyChecklist.setValue('table', grChecklist.table);
				gr_copyChecklist.setWorkflow(false); //No ejecuta BR
				
				var new_Checklist = gr_copyChecklist.insert();
        		//gs.info('checklist.sys_id -> '+ new_Checklist);
			
				//Verifico si el Checklist tiene Ítems asociados
				var grChecklist_Item = new GlideRecord('checklist_item');
				grChecklist_Item.addQuery('checklist','=', varSys_id_Checklist.toString());
				grChecklist_Item.orderBy('order');
				grChecklist_Item.query();
			
				//gs.info('Cant Checklist ITEMs: '+grChecklist_Item.getRowCount());

				//Inicializo el Record para Completar los campos
				var gr_copyChecklist_item = new GlideRecord('checklist_item'); //table_name
				gr_copyChecklist_item.initialize();
				
					
				if (grChecklist_Item.getRowCount() > 0) {
					
					//Inserto los Items de los Checklist
					while (grChecklist_Item.next()) {           
			
						/*
						gs.info('name -> '+grChecklist_Item.name);
						gs.info('complete -> '+grChecklist_Item.complete);
						gs.info('completed -> '+grChecklist_Item.completed);
						gs.info('completed_by -> '+grChecklist_Item.completed_by);
						gs.info('order -> '+grChecklist_Item.order);
						gs.info('-----------------------------------------------> ');
						*/

						gr_copyChecklist_item.setValue('checklist', new_Checklist.toString());
						gr_copyChecklist_item.setValue('name', grChecklist_Item.name);
						gr_copyChecklist_item.setValue('complete', grChecklist_Item.complete);
						gr_copyChecklist_item.setValue('completed', grChecklist_Item.completed);
						gr_copyChecklist_item.setValue('completed_by', grChecklist_Item.completed_by);
						gr_copyChecklist_item.setValue('order', grChecklist_Item.order);
						gr_copyChecklist_item.setWorkflow(false); //No ejecuta BR
						gr_copyChecklist_item.insert();

					}
				}
			}
		
		} catch (error) {
			var message = error.message;
			gs.error("Copy checklist y chelist_item - Error: " + message);
		}
	},		
=======
				gr_sc_copy.insert();
			}
		}
	},
>>>>>>> workflow
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
<<<<<<< HEAD
	},

=======
	}
	,
>>>>>>> workflow
    type: 'BGStoryUtils'
});