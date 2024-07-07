var gr = new GlideRecord("metric_instance");

//gr.addEncodedQuery('end!=NULL^business_duration=NULL');
gr.addEncodedQuery('sys_id=8c4e278483210210c2eef855eeaad350');
gr.autoSysFields(false); // so that the records don't have system updates
gr.query();

while(gr.next()) {

    var gdt1 = GlideDateTime(gr.start.getGlideObject());
    var gdt2 = GlideDateTime(gr.end.getGlideObject());

    //var startDateTime = new GlideDateTime("2024-06-21 00:00:00");  //enter employee start date here
    // Instantiate a new GlideDateTime object which has the current date and time
    //var endDateTime = new GlideDateTime(); 
    var dur = new DurationCalculator();
    // Set 8-5 weekday schedule. This is the schedule used below with 8 business hours
    dur.setSchedule('08fcd0830a0a0b2600079f56b1adb9ae'); //enter your desired schedule sys_id
    //dur.calcScheduleDuration(startDateTime, endDateTime);
    dur.calcScheduleDuration(gdt1, gdt2);

    //var duration1 = gs.dateDiff(gdt1.getDisplayValue(), gdt2.getDisplayValue(), false); // this will return the difference in seconds

    var secs = dur.getSeconds(); //Business time in secs
    var totalSecs = dur.getTotalSeconds();  //Total time in secs
    
    //var gd = new GlideDuration(secs*60*8); // time in milliseconds (3600*8)
    var gd = new GlideDuration(secs); // time in milliseconds (3600*8)
    var duration = gd.getDurationValue() + ''; // Output: 55 22:44:28
    //var finalDuration = duration.split(' ').join(':'); //. Output: 55:22:44:28
    var finalDuration = Math.round(secs/(3600*8));

    gr.business_duration = finalDuration+' '+duration;
	gr.setWorkflow(false);
	gr.update();
    
    gs.info('secs: ' +secs);
    gs.info('duration: ' +duration);
    //gs.info('ORIG duration1: ' +duration1);
    gs.info('finalDuration: ' +finalDuration+' '+duration);
    gs.info("***SCHEDULE DURATION: Business Days=" + Math.round(secs/(3600*8)) + " TOTAL Days=" + Math.round(totalSecs/(3600*24)) );

}
