var diaScheduleado = 5 //3-Miercoles - inputs.run_dayofweek; //Día de la semana Scheduleado
var horaRecibida = " 13:27:01"; //inputs.run_time;
var gdt = new GlideDateTime();
var diaActual = gdt.getDayOfWeekUTC();//Es mi día Ancla
var difenciaDias = diaScheduleado-diaActual;
var gdtCalculado = new GlideDateTime(new GlideDate()+horaRecibida);

gs.info('Día de la semana '+diaActual+' Diferencia de días: '+difenciaDias +' - diaScheduleado '+ diaScheduleado +' - diaActual '+ diaActual);
if (difenciaDias==0){
    gs.print(gdt+' -> (Fecha y Hora Actual)');
    gs.print('gdtCalculado.getTZOffset()/1000 -> '+gdtCalculado.getTZOffset()/1000);

    gdtCalculado.addSeconds(gdtCalculado.getTZOffset()/1000);
    
    gs.print('getTZOffset '+gdtCalculado);

    if(gdt > gdtCalculado){//Si la Hora es menor a la Actual de hoy, le sumo 7 dias.
        gdtCalculado.addDaysUTC(7);
        gs.print('ENTRO');
    }
}

gs.print('gdtCalculado '+gdtCalculado);