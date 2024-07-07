var CantDiasMes = 31; //Máximo último día del mes
var CantDiasSemana = 7;

var lastday = function(y,m){
  return  new Date(y, m, 0).getDate();
}

//Get Current Time
var CurrentDT = new GlideDateTime();
CurrentDT.addSeconds(CurrentDT.getTZOffset()/1000); // VER SI APLICA

var time = CurrentDT.getTime().getByFormat('HH:mm:ss');//Hora actual del Sistema

//gs.info('DXC-MA-Get Next Date - CurrentDT '+CurrentDT);
//gs.info('DXC-MA-Get Next Date -  time '+time);

var arrDur = [];

var tipoCorrida = 'monthly'; //inputs.run_type;
var duration = ' 00:00:00'; //inputs.timeToRun ? inputs.timeToRun : ' 00:00:00';

arrDur = duration.toString().split(' ');//Guardo la Hora Calendarizada (arrDur[1])
gs.info('DXC-MA-Get Next Date - HORA (duration) arrDur[1] '+arrDur[1]);

var gdt = new GlideDateTime();
gdt.addSeconds(gdt.getTZOffset()/1000);//Compenso las Horas (3 en este caso) por diferencia de TimeZone

var gdt_date = gdt.getDate();
var gdt_final = gdt_date+' '+arrDur[1]; //Concateno la Fecha y Hora (Agendada)
gs.info('DXC-MA-Get Next Date - (gdt_final) '+gdt_final);

var gdtCalculado = new GlideDateTime(gdt_final);

  if (tipoCorrida == 'daily') {
    
    gs.info('DXC-MA-Get Next Date - 1 (gdt < gdtCalculado) -> Sumo UN día a gdt '+gdt+' gdtCalculado - '+gdtCalculado);
    
    if(gdt > gdtCalculado){//Si la Hora es mayor a la Actual de hoy, le sumo 1 dia.
      gdtCalculado.addDaysUTC(1);
      gs.info('DXC-MA-Get Next Date - 2 (gdt < gdtCalculado) -> gdtCalculado con UN DIA MAS - '+gdtCalculado);
    }

  } else if (tipoCorrida == 'weekly') {
    
    //Obtengo el día de la semana, para comparar con el que fue Scheduleado y el Horario    
    var diaScheduleado = inputs.run_dayofweek; //Día de la semana Scheduleado
    var diaSemanaActual = gdt.getDayOfWeek();
    var difenciaDias = diaSemanaActual-diaScheduleado;
    
    gs.info('DXC-MA-Get Next Date - 1 (Weekly) diaScheduleado '+diaScheduleado+' diaSemanaActual '+diaSemanaActual+' difenciaDias '+difenciaDias);
    gs.info('DXC-MA-Get Next Date - 2 (gdt > gdtCalculado) '+gdt + ' gdtCalculado - '+gdtCalculado);      
      
    if (difenciaDias==0){
      if(gdt > gdtCalculado){//Si la Hora Actual, es mayor a la hora Calendarizada, le sumo 7 dias.        
        gdtCalculado.addDaysUTC(CantDiasSemana);
        gs.info('DXC-MA-Get Next Date - 3 (gdtCalculado) SUMO 7 días - '+gdtCalculado);
      }
    } else {
        difenciaDias = CantDiasSemana-difenciaDias;
        gdtCalculado.addDaysUTC(difenciaDias);
        gs.info('DXC-MA-Get Next Date - 4 (gdtCalculado) SUMO '+difenciaDias+' días - '+gdtCalculado);
    }


  } else if (tipoCorrida == 'monthly') {
        //Obtengo el día de la semana, para comparar con el que fue Scheduleado y el Horario    
        var diaDelMesScheduleado = 33; //inputs.run_dayofmonth; //Día del mes Scheduleado    
        
        var diaMesActual = gdt_date.getDate();
        diaMesActual = parseInt(diaMesActual.getDayOfMonthLocalTime()+1); //Obtengo el número del día del Mes (25/01, sería el 25)

        var mesCalculado = parseInt(gdt_date.getMonthUTC()); //Obtengo el número del Mes actual

        gs.info('DXC-MA-Get Next Date - 0 (monthly) - mesCalculado '+mesCalculado);
        
        if (diaDelMesScheduleado < diaMesActual) {

            //mesCalculado.addMonthsUTC(1);//Mes siguiente
            if (mesCalculado<12) {
                mesCalculado++;
            } else if (mesCalculado == 12) {
                mesCalculado = 1;
            }
            
            gs.info('DXC-MA-Get Next Date - 1 (monthly) - mesCalculado '+mesCalculado);
        
        } else if (diaDelMesScheduleado == diaMesActual) {

            if (time > arrDur[1]) {//Si la Hora actual es mayor que la Hora Calendarizada, uso el mes SIGUIENTE para armar la Fecha
                gs.info('DXC-MA-Get Next Date - 1.1 (time > arrDur[1]) - time '+time +' - arrDur[1] '+arrDur[1]);
                //mesCalculado.addMonthsUTC(1);//Mes siguiente
                if (mesCalculado<12) {
                    mesCalculado++;
                } else if (mesCalculado == 12) {
                    mesCalculado = 1;
                }
            }
            gs.info('DXC-MA-Get Next Date - 2 (monthly) - mesCalculado '+mesCalculado);
        
        //} else if (diaDelMesScheduleado > diaMesActual) {
          //  gs.info('DXC-MA-Get Next Date - 3 (monthly) - mesCalculado '+mesCalculado);
        }
        
        var ultimoDiaDelMes = lastday(gdt_date.getYearLocalTime(),mesCalculado);        
        if (diaDelMesScheduleado > ultimoDiaDelMes){
          diaDelMesScheduleado = ultimoDiaDelMes;
        }
        var fechaMensual = new GlideDateTime(mesCalculado+'/'+diaDelMesScheduleado+'/'+gdt_date.getYearLocalTime());
        gdtCalculado = fechaMensual;
        
        gs.info('DXC-MA-Get Next Date - 4 (monthly -> fechaMensual) -> '+fechaMensual+' - gdtCalculado -> '+gdtCalculado);
        gs.info('DXC-MA-Get Next Date - 5 (monthly -> diaDelMesScheduleado/mesCalculado/gdt_date.getYearLocalTime()) -> '+diaDelMesScheduleado+'/'+mesCalculado+'/'+gdt_date.getYearLocalTime());
        
    }

  /*
  outputs.currenttime=CurrentDT;
  outputs.nextime=gdtCalculado.getDate()+' '+arrDur[1];//Fecha de la Próxima corrida
  outputs.duration=arrDur[1];
  */
  gs.info('CurrentDT '+CurrentDT);
  gs.info('nextime '+ gdtCalculado.getDate()+' '+arrDur[1]);//Fecha de la Próxima corrida
  gs.info('duration '+arrDur[1]);