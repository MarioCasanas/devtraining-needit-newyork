//Todas las CALLS Activas y que tengan un REQ Asociado
var grCALL = new GlideRecord('new_call');
grCALL.addQuery('transferred_to.active=true^transferred_toISNOTEMPTY^call_type=sc_request^transferred_toSTARTSWITHREQ');
grCALL.query();

var totalCall = grCALL.getRowCount();
var actualizados = 0;

while (grCALL.next()) {

    var grRITM = new GlideRecord('sc_req_item');
    grRITM.addQuery('request', '=', grCALL.transferred_to);
    grRITM.query();
    grRITM.next();

    var grREQ = new GlideRecord('sc_request');
    grREQ.addQuery('sys_id', '=', grRITM.request.sys_id);
    grREQ.query();
    grREQ.next();
    
    if (grRITM.contact_type != grREQ.contact_type) {
        actualizados++;
        gs.print('Nro CALL -> '+grCALL.number+' - '+grREQ.number+' *** Ctype *** -> '+grCALL.contact_type+' *** '+'Nro '+grRITM.number+' *** Ctype *** -> '+grRITM.contact_type+' ****** UPDATE ****** '+grRITM.contact_type+' *** Cambia a *** -> '+grREQ.contact_type);
        //Actualizo el Contact type
        //grRITM.contact_type = grREQ.contact_type;
        //grRITM.update();
    }

}

var resta = totalCall - actualizados;

gs.print('************************************************************************');
gs.print('Se sincronizaron '+actualizados+' campos contact_type de los RITM con sus respectivos REQ.');
gs.print('De las '+totalCall+' CALLS, habían '+resta.toString()+' con el Contact type correcto.');
gs.print('************************************************************************');