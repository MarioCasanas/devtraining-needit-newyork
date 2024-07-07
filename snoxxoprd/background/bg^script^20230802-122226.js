// sn-scriptsync - Received from background script tab via SN Utils. (delete file after usage.)

var queryINC = 'sys_updated_bySTARTSWITHPedro.Romero^sys_updated_onON2023-08-01@javascript:gs.dateGenerate(2023-08-01,start)@javascript:gs.dateGenerate(2023-08-01,end)^u_employee_type=tienda';
//var queryINC = 'numberININC1743390,^state!=8';

var ch = new GlideRecord('sys_user');
ch.addEncodedQuery(queryINC);
ch.query();

gs.info('Incidentes con el ATI incorrecto: '+ch.getRowCount());
/*
while (ch.next()) {    
    gs.info('Cancel INC: '+ch.number);
    ch.setWorkflow(false);//Ignoro las Business Rule para que Cancele los INCIDENTES sin Categorías    
    ch.state = '8'; //Cancel
    ch.u_root_cause = 'usuario: error administrativo';
    ch.close_notes = 'Cancelado Masivamente con el Ticket: RITM0209729';
    ch.update();

}
*/