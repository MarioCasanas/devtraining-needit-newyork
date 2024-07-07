g_form.setReadOnly('element',false);

//Borrar la KB creadas por Error
/*
var grKB = new GlideRecord('sys_choice');
grKB.addEncodedQuery('elementSTARTSWITHep2p_subcategoryl3_bsm');
grKB.query();
grKB.next();
grKB.deleteMultiple(); // Ken and Santosh update
*/



var grKB = new GlideRecord('sys_dictionary');
grKB.addEncodedQuery('sys_idSTARTSWITHd48fdfec1b9fc910443c20afe54bcb58');
grKB.query();
grKB.next();

gs.info(grKB.getRowCount() + ' - '+grKB.element);

grKB.element = 'ep2p_subcategoryl3_bsm';
grKB.setWorkflow(false);
grKB.update();

gs.info(grKB.getRowCount() + ' - '+grKB.element);