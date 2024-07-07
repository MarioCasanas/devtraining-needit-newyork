var gr = new GlideRecord("metric_instance");

//gr.addEncodedQuery('end!=NULL^business_duration=NULL');
gr.addEncodedQuery('sys_id=8c4e278483210210c2eef855eeaad350');
gr.autoSysFields(false); // so that the records don't have system updates
gr.query();

while(gr.next()) {
	var gsBusiness = new GlideSchedule('08fcd0830a0a0b2600079f56b1adb9ae');//8-5 weekdays (cmn_schedule)
	// Get duration based on schedule
	//gr.business_duration = gsBusiness.duration(gr.start.getGlideObject(), gr.end.getGlideObject());
	gr.business_duration = gsBusiness.dateDiff(gr.start.getGlideObject(), gr.end.getGlideObject());
    var gdt1 = GlideDateTime(gr.start.getGlideObject());
    var gdt2 = GlideDateTime(gr.end.getGlideObject());
    
    var duration1 = gs.dateDiff(gdt1.getDisplayValue(), gdt2.getDisplayValue(), false); // this will return the difference in seconds
    
    gr.business_duration = duration1;
	gr.setWorkflow(false); 
	//gr.update();
	
	gs.info('MARIO Duration: '+duration1);
	gs.info('MARIO gr.business_duration: '+gr.business_duration);
	
    gs.info('MARIO Start: '+gr.start.getGlideObject());
    gs.info('MARIO End: '+gr.end.getGlideObject());

	//gs.info('MARIO duration1: '+duration1);

}