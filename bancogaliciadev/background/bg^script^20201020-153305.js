var i=0;
var ejercicio='';
var partidaActual='';
var operacionPresupuestaria='';

function getArrayMeses() {
    var i=0;
    var topeArray = 12;
    var arrayMeses = [topeArray];
    
    while (i <= topeArray) {//Inicializo el Array
        arrayMeses[i] = 0;
        //gs.info('Contenido Mes ' + i + ' --------> '+arrayMeses[i]);
        i++; 
    }

    return arrayMeses;
}

//Funcion que devuelve el Monto positivo o negativo en base a la Operacion Presupuestaria obtenida
var operacion = function(operacionPresupuestaria, valor){

    try {
        //Suman al Monto anterior
        if ( 
            (operacionPresupuestaria == 'Entrada') ||
            (operacionPresupuestaria == 'Suplemento') ||
            (operacionPresupuestaria == 'Traslado Receptor') ||
            (operacionPresupuestaria == 'Traslado Emisor Anulada') ||
            (operacionPresupuestaria == 'Traslado Receptor Anulada') ||
            (operacionPresupuestaria == 'Suplemento Anulada') ||
            (operacionPresupuestaria == 'Devolucion') ||
            (operacionPresupuestaria == 'Entrada Anulada') ||
            (operacionPresupuestaria == 'Devolucion Anulada') ) {
            return valor;
        
        //Restan al Monto anterior
        } else if (
            (operacionPresupuestaria == 'Traslado Emisor') ||
            (operacionPresupuestaria == 'Traslado Emisor Anulacion') ||
            (operacionPresupuestaria == 'Traslado Receptor Anulacion') ||
            (operacionPresupuestaria == 'Suplemento Anulacion') ||
            (operacionPresupuestaria == 'Entrada Anulacion') ||
            (operacionPresupuestaria == 'Devolucion Anulacion') ) {
            return valor * -1;        
        
        //Excluir estos casos:
        } else  if (
            (operacionPresupuestaria == 'Traslado Emisor A anular') ||
            (operacionPresupuestaria == 'Traslado Receptor A anular') ) {
                return 0; //Retorna cero para Sumarizar sin alterar los valores
        } else {
            var message = 'La Operacion Presupuestaria No tiene un valor permitido. Por favor contactese con el Administrador.';
            gs.error("Integracion SAP (operacion) - Error: " + message);
        }        
        
    } catch (error) {
        message = error.message;
        gs.error("Integracion SAP (operacion) - Error: " + message);
    }
};

var formatearMonto = function(str){
    //Formateamos los Montos para poder calcular los subtotales en SNOW
    //Primero que quitamos los separadores de miles (punto), y luego al separador decimal (coma), 
    //lo reemplazamos por un punto.
    var monto = str.replace(/[.]/g, '');//Saco los puntos
    monto = monto.replace(/[,]/g, '.');//reemplazo la coma por un punto (decimal)
    //gs.info('Str: ' + str + 'test: ' + test);
    return monto;
};

var cantidadPartidasBreakdown = function (varPartidaActual) {
    try {
        //Breakdown
        var grTempBreakdown = new GlideRecord('cost_plan_breakdown');
        grTempBreakdown.addQuery('cost_plan.name','=',varPartidaActual);
        grTempBreakdown.query();

        var tieneCostPlan = grTempBreakdown.getRowCount();
        return tieneCostPlan;

    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (cantidadPartidasBreakdown) - Error: " + message);
    }
};

var obtengoPeriodosFiscales = function (varEjercicio, varProyecto, varPartidaActual)  {

    try {
        var i=0;        
        var year = varEjercicio; //AÑo que Viene en el campo Ejercicio
        var varArrayFiscalPeriod = [11];
        
        //Armo las Fechas de Inicio y Fin de los Periodos Fiscales ***
        var fechaInicio = year+"0101T000000"; //Siempre toma el día 1 de Enero
        var fechaFin = year+"1231T235959";
        
        var rec = new GlideRecord ('fiscal_period');
        rec.addQuery('start_date_time','>=', fechaInicio);
        rec.addQuery('end_date_time', '<=', fechaFin);
        rec.addQuery('fiscal_type', '=', 'month');
        rec.addQuery('open',true);
        rec.orderBy('name'); //rec.orderBy('sys_id');
        rec.query();
    
        if (rec.getRowCount() > 0) {
            while (rec.next()) {            
                gs.info('SYS_ID (DENTRO DE obtengoPeriodosFiscales) -> '+rec.sys_id.toString() + ' - Name: '+rec.name.toString());
                varArrayFiscalPeriod[i] = rec.sys_id.toString();
                i++;
            }
            
            return varArrayFiscalPeriod;

        } else {
            varErrorObtengoPeriodosFiscales = 'Integracion SAP (obtengoPeriodosFiscales) - No hay Períodos Fiscales abiertos para el año: '+ year + ' - Proyecto: ['+varProyecto+'] - Partida: '+varPartidaActual;
            gs.error(varErrorObtengoPeriodosFiscales);
        }

    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (obtengoPeriodosFiscales) - Error: " + message);
    }
};

var actualizoUnitCost_Cost_Plan = function (varPartidaActual, varUnitCost) {

    try {

        var grCostPlan = new GlideRecord('cost_plan');
        grCostPlan.addQuery('name','=',varPartidaActual);
        grCostPlan.query();
        grCostPlan.next();
        
        //Actualizo unit_cost en cost_plan
        grCostPlan.setValue('unit_cost', varUnitCost);
        //grCostPlan.update();

    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (actualizoUnitCost_Cost_Plan) - Error: " + message);        
    }

};

var actualizo_Cost_Plan_Breakdown = function (varPartidaActual, varEjercicio, varArrayMeses) {

    try {
        //Cost Plan
        var grCostPlan = new GlideRecord('cost_plan');
        grCostPlan.addQuery('name','=',varPartidaActual.toString());
        grCostPlan.query();
        grCostPlan.next();

        //Breakdown 
        var grBreakdown = new GlideRecord('cost_plan_breakdown');
        grBreakdown.addQuery('cost_plan.name','=',varPartidaActual.toString());
        grBreakdown.query();

        var arrayPeriodosFiscales = [11];//Guardo los Periodos Fiscales Obtenidos para el Ejercicio
        var cantBreakdown = grBreakdown.getRowCount();//Cantidad de Breakwdown a Actualizar

        gs.info('*****************************************************************************************');
        gs.info('Breakdowns (FINAL) - Partida '+varPartidaActual+' - Cantidad REGISTROS -> ' +cantBreakdown);
        gs.info('*****************************************************************************************');
        
        if (cantBreakdown > 0) { //Actualizo los Periodos Fiscales de la Partida Actual

            grBreakdown.next();
            gs.info('Partida --> '+grBreakdown.cost_plan.name);
            gs.info('Projecto --> '+grBreakdown.task.number);
            gs.info('varPartidaActual (cost_plan) - '+varPartidaActual);
            
            arrayPeriodosFiscales = obtengoPeriodosFiscales(varEjercicio, grBreakdown.task.number, grBreakdown.cost_plan.name);

            var bFindFiscalPeriod = 0;
            //Actualizo cada Período Fiscal
            do {
                for (var j = 0; j < arrayPeriodosFiscales.length; j++) {
                    //gs.info('grBreakdown.fiscal_period.toString() -> '+grBreakdown.fiscal_period.toString()+' ----- SON IGUALES?? ----- '+arrayPeriodosFiscales[j].toString());
                    if (grBreakdown.fiscal_period.toString() == arrayPeriodosFiscales[j].toString()) {
                        bFindFiscalPeriod = 1;
                        //gs.info('J '+ j + ' - '+grBreakdown.fiscal_period +' -- '+ arrayPeriodosFiscales[j].toString()+ ' -- '+grBreakdown.fiscal_period.name);
                        gs.info('J '+ j + ' - '+grBreakdown.fiscal_period.name+' ('+grBreakdown.fiscal_period+') - local --> $'+grBreakdown.cost_local_currency+ ' - Asignarle $'+ varArrayMeses[j].toFixed(2));
                        grBreakdown.setValue('cost_local_currency', varArrayMeses[j].toFixed(2));
                        grBreakdown.setWorkflow(false); //No ejecuta BR
                        //grBreakdown.update();
                        break;
                    }
                }
                if (bFindFiscalPeriod == 0) {
                    gs.error('Integracion SAP (actualizo_Cost_Plan_Breakdown) - No se encontró el Periodo '+grBreakdown.fiscal_period.name +'. Proyecto: ['+grBreakdown.task.number+'] - Partida: '+grBreakdown.cost_plan.name);
                } else {
                    bFindFiscalPeriod == 0;//Si encontró, reseteo la variable
                }
            }while (grBreakdown.next());
            
            gs.info('TOTAL (unit_cost) --> $'+ varArrayMeses[12].toFixed(2));
            //Actualizo Unit Cost de la cost_plan
            actualizoUnitCost_Cost_Plan(varPartidaActual.toString(), varArrayMeses[12].toFixed(2));
            
        } else if (cantBreakdown == 0) {
            gs.error('Integracion SAP (actualizo_Cost_Plan_Breakdown) - No hay Partidas en la Tabla cost_plan_breakdown. Proyecto: ['+grBreakdown.task.number+'] - Partida: '+grBreakdown.cost_plan.name);
        }

    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (actualizo_Cost_Plan_Breakdown) - Error: " + message);
    }

};

var inserto_Cost_Plan_Breakdown = function (varPartidaActual, varArrayMeses) {

    try {
        //Breakdown 
        gs.info('*****************************************************************************************');
        gs.info('Breakdowns (FINAL) - Partida '+varPartidaActual);
        gs.info('*****************************************************************************************');
        var i=0;
        var arrayPeriodosFiscales = [11];//Guardo los Periodos Fiscales Obtenidos para el Ejercicio
        var grCostPlan = new GlideRecord('cost_plan');
        grCostPlan.addQuery('name','=',varPartidaActual);
        grCostPlan.query();
        grCostPlan.next();
        
        var grBreakdown = new GlideRecord('cost_plan_breakdown');
        grBreakdown.initialize();
        
        var grBreakdownTemp = new GlideRecord('u_dxc_temp_breakdown');
        grBreakdownTemp.addQuery('u_estado=NULL'); //Obtengo las Partidas Pendientes de Procesar
        grBreakdownTemp.addQuery('u_partida_presupuestaria','=',varPartidaActual);
        grBreakdownTemp.query();
        grBreakdownTemp.next();

        gs.info('NUEVA ------> varPartidaActual (cost_plan) - '+varPartidaActual);    
        gs.info('EJERCICIO (AÑO) para Obtener los Periodos Fiscales -> '+grBreakdownTemp.u_ejercicio);

        //Obtengo los Periodos Fiscales del Ejercicio actual
        arrayPeriodosFiscales = obtengoPeriodosFiscales(grBreakdownTemp.u_ejercicio.toString(), grCostPlan.task.number, varPartidaActual);

        gs.info('CANT (INSERT) arrayPeriodosFiscales[1] ---------> '+arrayPeriodosFiscales[1]);

        //Inserto los Periodos Fiscales de la Partida Actual
        gs.info('Periodos Fiscales OBTENIDOS');
        gs.info('----------------------------');
        gs.info('----------------------------');
        gs.info('SYS_ID cost_plan      -> '+grCostPlan.sys_id);
        gs.info('PROYECTO              -> '+grCostPlan.task);
        gs.info('Cost Plan             -> '+grCostPlan.name);
        gs.info('----------------------------');

        for (var j = 0; j < arrayPeriodosFiscales.length; j++) {
            gs.info('J '+ j + ' - '+'Periodo Fiscal    -> '+arrayPeriodosFiscales[j] + ' --------> cost_local_currency   -> '+varArrayMeses[j].toFixed(2));
            
            //gs.info('J '+ j + ' - '+grBreakdown.fiscal_period.name+' ('+grBreakdown.fiscal_period+') - local --> $'+grBreakdown.cost_local_currency+ ' - Asignarle $'+ varArrayMeses[j].toFixed(2));

            //Asigno los valores en los campos
            grBreakdown.setValue('cost_plan', grCostPlan.sys_id);
            grBreakdown.setValue('task', grCostPlan.task);
            grBreakdown.setValue('fiscal_period', arrayPeriodosFiscales[j].toString());
            grBreakdown.setValue('cost_local_currency', varArrayMeses[j].toFixed(2));
            grBreakdown.setWorkflow(false); //No ejecuta BR
            //grBreakdown.insert();
        }

        gs.info('TOTAL                     --> $'+ varArrayMeses[12].toFixed(2));    
        
        //Actualizo unit_cost en cost_plan
        grCostPlan.setValue('unit_cost', varArrayMeses[12].toFixed(2));
        grCostPlan.update();

    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (inserto_Cost_Plan_Breakdown) - Error: " + message);
    }

};

var actualizo_dxc_temp_breakdown_procesada = function (partidaActual){

    try {

        //Marco como PROCESADA la Partida Actual, con la Fecha y hora
        var cantPartidas = 0;
        var grTemp = new GlideRecord('u_dxc_temp_breakdown');
        grTemp.addQuery('u_estado=NULL'); //Obtengo las Partidas Pendientes de Procesar
        grTemp.addQuery('u_partida_presupuestaria','=',partidaActual);
        grTemp.query();       
        
        cantPartidas = grTemp.getRowCount();
        gs.info('Pendientes de Marcar como Procesadas - Partida '+partidaActual+' -> '+cantPartidas);    

        if (cantPartidas > 0) {
            
            while (grTemp.next()) {
                var varFechaActual = new GlideDateTime();        
                //Actualizo el Registro de la Partida Actual como PROCESADA
                grTemp.setValue('u_estado', 'PROCESADA');
                grTemp.setValue('u_fecha_procesamiento', varFechaActual);
                //grTemp.update();
            }
        }

    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (actualizo_dxc_temp_breakdown_procesada) - Error: " + message);
    }

};

var graboBreakdownCalculado = function (partidaActual, varEjercicio, arrayMeses) {

    try {
        //Si tenemos registros para la Partida Actual, los actualizamos, sino, Insertamos los Registros en la Tabla cost_plan_breakdown
        var cantidadPartidas = cantidadPartidasBreakdown(partidaActual.toString());
        gs.info('--------------------- CANTIDAD DE PARTIDAS ---------------------  -> '+cantidadPartidas);
        
        if (cantidadPartidas == 0) {
            gs.info('****************************************************************************************');
            gs.info('------------- INSERT Partida '+partidaActual+' en los Periodos Fiscales ------------');
            gs.info('****************************************************************************************');
            //Inserto la Partida Presupuestaria en la Tabla Final cost_plan_breakdown
            inserto_Cost_Plan_Breakdown(partidaActual.toString(), arrayMeses);
        
        }else if (cantidadPartidas > 1) {
            gs.info('****************************************************************************************');
            gs.info('------------- ACTUALIZO Partida '+partidaActual+' en los Periodos Fiscales ------------');
            gs.info('****************************************************************************************');            
            try {
                //Actualizo la Partida Presupuestaria en la Tabla Final cost_plan_breakdown
                actualizo_Cost_Plan_Breakdown(partidaActual.toString(), varEjercicio, arrayMeses);
            } catch (error) {
                message = error.message;
                gs.error("Integracion SAP (Proceso Principal-actualizo_Cost_Plan_Breakdown) - Error: " + message);
            }
        }
        
        actualizo_dxc_temp_breakdown_procesada(partidaActual.toString());
        
    } catch (error) {
        var message = error.message;
        gs.error("Integracion SAP (graboBreakdownCalculado) - Error: " + message);
    }


};


/********************************************************************* */
/* Proceso para Actualizar la Tabla cost_plan_breakdown
/********************************************************************* */

var grTemp = new GlideRecord('u_dxc_temp_breakdown');
grTemp.orderBy('u_partida_presupuestaria');
grTemp.addQuery('u_estado=NULL'); //Obtengo las Partidas Pendientes de Procesar
grTemp.query();
grTemp.next();

control_RegistrosTempBreakdown = 1;
cant_RegistrosTempBreakdown = grTemp.getRowCount();

try {

    if (cant_RegistrosTempBreakdown > 0)  {

        do{            
            //Genero el Vector para guardar los Subtotales por cada Partida Presupuestaria
            var arrayMeses = getArrayMeses();
            do {

                partidaActual = grTemp.u_partida_presupuestaria.toString();
        
                gs.info('*******************************************************************************');
                gs.info('Partida: '+partidaActual);
                gs.info('MES: '+grTemp.u_enero);
                gs.info('TOTAL: '+grTemp.u_total);
                gs.info('ejercicio (AÑO): '+grTemp.u_ejercicio);
                gs.info('Operacion Presupuestaria: '+grTemp.u_operacion_presupuestacion);
                gs.info('*******************************************************************************');
        
                if (partidaActual.toString() == grTemp.u_partida_presupuestaria.toString()){
                    
                    operacionPresupuestaria = grTemp.u_operacion_presupuestacion;                    
                    //Sumarizo los Meses
                    arrayMeses[0]   = arrayMeses[0]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_enero)));
                    arrayMeses[1]   = arrayMeses[1]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_febrero)));
                    arrayMeses[2]   = arrayMeses[2]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_marzo)));
                    arrayMeses[3]   = arrayMeses[3]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_abril)));
                    arrayMeses[4]   = arrayMeses[4]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_mayo)));
                    arrayMeses[5]   = arrayMeses[5]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_junio)));
                    arrayMeses[6]   = arrayMeses[6]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_julio)));
                    arrayMeses[7]   = arrayMeses[7]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_agosto)));
                    arrayMeses[8]   = arrayMeses[8]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_septiembre)));
                    arrayMeses[9]   = arrayMeses[9]  + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_octubre)));
                    arrayMeses[10]  = arrayMeses[10] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_noviembre)));
                    arrayMeses[11]  = arrayMeses[11] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_diciembre)));
                    arrayMeses[12]  = arrayMeses[12] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grTemp.u_total)));
                    
                    i=0;
                    //Formateo a dos Decimales -> toFixed(2)
                    gs.info('---------------------------------- MESES ---------------------------------- ');
                    while (i<=12) {
                        gs.info('Mes ' + i + ' > '+arrayMeses[i].toFixed(2));
                        i++;
                    }
                }

                control_RegistrosTempBreakdown++;

            }while ((grTemp.next()) && (partidaActual.toString() == grTemp.u_partida_presupuestaria.toString()));

            //if ((grTemp.u_partida_presupuestaria.nil()) || (partidaActual.toString() != grTemp.u_partida_presupuestaria.toString())){
            if (partidaActual.toString() != grTemp.u_partida_presupuestaria.toString()){
                gs.info('------------------------------------------> ENTRO al IF');
                //Grabo la Partida Presupuestaria Actual del Corte de Control
                graboBreakdownCalculado(partidaActual.toString(), grTemp.u_ejercicio, arrayMeses);
            }

        } while (control_RegistrosTempBreakdown <= cant_RegistrosTempBreakdown);

        gs.info('------------------------------------------> FUERA DEL WHILE');

        try {
            //Grabo la última Partida Presupuestaria del Corte de Control
            graboBreakdownCalculado(partidaActual.toString(), grTemp.u_ejercicio, arrayMeses);    
        } catch (error) {
            message = error.message;
            gs.error("Integracion SAP (Proceso Principal-graboBreakdownCalculado) - Error: " + message);
        }

    } else {
        var message = 'No hay Partidas Presupuestarias Pendientes de Procesar.';
        gs.info("Integracion SAP (Proceso Principal) - " + message);
    }
    
} catch (error) {
    message = error.message;
    gs.error("Integracion SAP (Proceso Principal) - Error: " + message);
    
}
