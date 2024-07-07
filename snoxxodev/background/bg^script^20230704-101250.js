var sysIdIncident = '71f52a6787232950a817bbb6dabb35c5';
var sysIdChange = '555d9df5973be9d05a3af6a3f153afad';

var ch = new GlideRecord('change_request');
ch.addQuery('sys_id', sysIdChange);
ch.query();
ch.next();

ch.u_sys_id_incident = sysIdIncident;
ch.update();
/*
var inc = new GlideRecord('incident');
inc.addQuery('sys_id', sysIdIncident);
inc.query();
inc.next();

gs.info('Change: '+ch.number+' - Incidente a Vincular: '+inc.number);
inc.rfc = sysIdChange;
inc.update();*/
