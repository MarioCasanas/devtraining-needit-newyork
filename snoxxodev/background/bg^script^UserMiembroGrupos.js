// sn-scriptsync - Received from background script tab via SN Utils. (delete file after usage.)

        var user = '00b788f787d09950a817bbb6dabb35b0'; // gets current users sys_id
        var grupoSplit = gs.getProperty('grupos.mesa.ayuda.notas.trabajo');
        var gruposMeyaAyuda = grupoSplit.split(',');
		var esMesaAyuda = false;//Si pertenece a uno de los Grupos de "Mesa de Ayuda", es true

        var gr = new GlideRecord("sys_user_grmember");
        gr.addQuery("user", user);
        gr.query();
       
        var i = 0;
        var tope = gruposMeyaAyuda.length;

        while (gr.next()) {
                
            gs.info('Grupo: ' + gr.group.getDisplayValue());
			while (i < tope) {

                gs.info('Grupo ('+i+') ' + gr.group + ' == ' + gruposMeyaAyuda[i]);
                if (gruposMeyaAyuda[i] == gr.group) {
                    gs.info('Encontró el grupo en : ' + i + ' loopeos - ' + gruposMeyaAyuda[i]);
                    esMesaAyuda = true;
                }
                i++;
            }
            i = 0;
        }