var motivo = 'Visa_Codigo de transacción incorrecto';
var plazoTransaccion = new GlideDateTime();

plazoTransaccion.setValue(gs.getDate());

var grMotivosDeDisputa = new GlideRecord('sys_choice');
    grMotivosDeDisputa.addEncodedQuery('element=u_controversia_importante_1_csm^dependent_value='+motivo+'^language='+gs.getUser().getLanguage());
    grMotivosDeDisputa.query();
    grMotivosDeDisputa.next();

    //var cant = grMotivosDeDisputa.value.indexOf(' ');
    var adicionarDias = grMotivosDeDisputa.hint;
    //var adicionarDias = grMotivosDeDisputa.value.substring(0,cant);
    
    gs.info('Records-> '+grMotivosDeDisputa.getRowCount());
    gs.info('Sumar -> '+adicionarDias+'-');

    plazoTransaccion.addDays(adicionarDias);
    var fechaFormateada = plazoTransaccion.getByFormat('dd/MM/yyyy')+' 10:34:00';
    gs.info('Plazo de presentación de la transacción -> '+fechaFormateada+'-');