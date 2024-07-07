    var today = new GlideDateTime().getDisplayValue();
    var dias = 70;

gs.info('HR_UtilsAjax_Global - grDateService.hint -> ' + dias+ ' today -> ' + today);

    //var fechaEstimada = new GlideDateTime(today);
    
    var fechaEstimada = new GlideDateTime();
    //fechaEstimada.addDaysUTC(dias); //grDateService.hint
    //fechaEstimada.addDaysLocalTime(dias); //grDateService.hint
    fechaEstimada.addDays(dias); //grDateService.hint

gs.info('HR_UtilsAjax_Global - Le adiciono los días a fechaEstimada -> ' + fechaEstimada.getDate());

//var gdt = new GlideDate();
var formatFecha = fechaEstimada.getByFormat('dd/MM/YYYY').toString();
gs.info('HR_UtilsAjax_Global - Formateo la Fecha DD/MM/YYYY -> '+formatFecha);

    var today2 = new GlideDateTime();
    var time = today2.getLocalTime().getByFormat('HH:mm:ss');
    //fechaEstimada = fechaEstimada.getDate() + ' ' + time;
    fechaEstimada = formatFecha+' '+time;
    
gs.info('HR_UtilsAjax_Global - Retorna FECHAFINAL -> ' + fechaEstimada);