    //NUEVO PROCESO - 
    //ORIGINAL del "Transform Script"

    var i = 0;
    var ejercicio = '';
    var partidaActual = '';
    var operacionPresupuestaria = '';

    function getArrayMeses() {
        var i = 0;
        var topeArray = 12;
        var arrayMeses = [topeArray];

        while (i <= topeArray) { //Inicializo el Array
            arrayMeses[i] = 0;
            //gs.print('Contenido Mes ' + i + ' --------> '+arrayMeses[i]);
            i++;
        }

        return arrayMeses;
    }

    //Funcion que devuelve el Monto positivo o negativo en base a la Operacion Presupuestaria obtenida
    var operacion = function(operacionPresupuestaria, valor) {

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
                (operacionPresupuestaria == 'Devolucion Anulada')) {
                return valor;

                //Restan al Monto anterior
            } else if (
                (operacionPresupuestaria == 'Traslado Emisor') ||
                (operacionPresupuestaria == 'Traslado Emisor Anulacion') ||
                (operacionPresupuestaria == 'Traslado Receptor Anulacion') ||
                (operacionPresupuestaria == 'Suplemento Anulacion') ||
                (operacionPresupuestaria == 'Entrada Anulacion') ||
                (operacionPresupuestaria == 'Devolucion Anulacion')) {
                return valor * -1;

                //Excluir estos casos:
            } else if (
                (operacionPresupuestaria == 'Traslado Emisor A anular') ||
                (operacionPresupuestaria == 'Traslado Receptor A anular')) {
                return 0; //Retorna cero para Sumarizar sin alterar los valores
            } else {
                var message = 'La Operacion Presupuestaria No tiene un valor permitido. Valor ingresado: ' + operacionPresupuestaria;
                gs.error("Integracion SAP (operacion) - Error: " + message);
            }

        } catch (error) {
            message = error.message;
            gs.error("Integracion SAP (operacion) - Error: " + message);
        }
    };

    var formatearMonto = function(str) {
        //Formateamos los Montos para poder calcular los subtotales en SNOW
        //Primero que quitamos los separadores de miles (punto), y luego al separador decimal (coma), 
        //lo reemplazamos por un punto.
        var monto = str.replace(/[.]/g, ''); //Saco los puntos
        monto = monto.replace(/[,]/g, '.'); //reemplazo la coma por un punto (decimal)
        //gs.print('Str: ' + str + 'test: ' + test);
        return monto;
    };

    var cantidadPartidasBreakdown = function(varPartidaActual) {
        try {
            //Breakdown
            var grTempBreakdown = new GlideRecord('cost_plan_breakdown');
            grTempBreakdown.addQuery('cost_plan.name', '=', varPartidaActual);
            grTempBreakdown.query();

            return grTempBreakdown.getRowCount();

        } catch (error) {
            var message = error.message;
            gs.error("Integracion SAP (cantidadPartidasBreakdown) - Error: " + message);
        }
    };

    var obtengoPeriodosFiscales = function(varEjercicio, varProyecto, varPartidaActual) {

        try {
            var i = 0;
            var year = varEjercicio; //AÑo que Viene en el campo Ejercicio
            var varArrayFiscalPeriod = [11];

            //Armo las Fechas de Inicio y Fin de los Periodos Fiscales ***
            var fechaInicio = year + "0101T000000"; //Siempre toma el día 1 de Enero
            var fechaFin = year + "1231T235959";

            var rec = new GlideRecord('fiscal_period');
            rec.addQuery('start_date_time', '>=', fechaInicio);
            rec.addQuery('end_date_time', '<=', fechaFin);
            rec.addQuery('fiscal_type', '=', 'month');
            rec.addQuery('open', true);
            rec.orderBy('name'); //rec.orderBy('sys_id');
            rec.query();

            if (rec.getRowCount() > 0) {
                while (rec.next()) {
                    //gs.print('SYS_ID (DENTRO DE obtengoPeriodosFiscales) -> '+rec.sys_id.toString() + ' - Name: '+rec.name.toString());
                    varArrayFiscalPeriod[i] = rec.sys_id.toString();
                    i++;
                }

                return varArrayFiscalPeriod;

            } else {
                varErrorObtengoPeriodosFiscales = 'Integracion SAP (obtengoPeriodosFiscales) - No hay Períodos Fiscales abiertos para el año: ' + year + ' - Proyecto: [' + varProyecto + '] - Partida: ' + varPartidaActual;
                gs.error(varErrorObtengoPeriodosFiscales);
            }

        } catch (error) {
            var message = error.message;
            gs.error("Integracion SAP (obtengoPeriodosFiscales) - Error: " + message);
        }
    };

    var actualizoUnitCost_Cost_Plan = function(varPartidaActual, varUnitCost) {

        try {

            var grCostPlan = new GlideRecord('cost_plan');
            grCostPlan.addQuery('name', '=', varPartidaActual);
            grCostPlan.query();
            grCostPlan.next();

            //Actualizo unit_cost en cost_plan
            grCostPlan.setValue('unit_cost', varUnitCost);
            grCostPlan.update();

        } catch (error) {
            var message = error.message;
            gs.error("Integracion SAP (actualizoUnitCost_Cost_Plan) - Error: " + message);
        }

    };

    var actualizo_Cost_Plan_Breakdown = function(varPartidaActual, varEjercicio, varArrayMeses) {

        try {

            var grBreakdown = new GlideRecord('cost_plan_breakdown');
            grBreakdown.addQuery('cost_plan.name', '=', varPartidaActual.toString());
            grBreakdown.orderBy('fiscal_period.name');
            grBreakdown.query();

            var arrayPeriodosFiscales = [11]; //Guardo los Periodos Fiscales Obtenidos para el Ejercicio
            var cantBreakdown = grBreakdown.getRowCount(); //Cantidad de Breakwdown a Actualizar

            gs.print('*****************************************************************************************');
            gs.print('Breakdowns (FINAL) - Partida ' + varPartidaActual + ' - Cantidad REGISTROS -> ' + cantBreakdown);
            gs.print('*****************************************************************************************');

            if (cantBreakdown > 0) { //Actualizo los Periodos Fiscales de la Partida Actual

                arrayPeriodosFiscales = obtengoPeriodosFiscales(varEjercicio, grBreakdown.task.number, grBreakdown.cost_plan.name);

                var bFindFiscalPeriod = 0;
                //Actualizo cada Período Fiscal
                while (grBreakdown.next()) {

                    for (var j = 0; j < arrayPeriodosFiscales.length; j++) {
                        if (grBreakdown.fiscal_period.toString() == arrayPeriodosFiscales[j].toString()) {

                            bFindFiscalPeriod = 1;
                            grBreakdown.setValue('cost_local_currency', varArrayMeses[j].toFixed(2));
                            grBreakdown.setWorkflow(false); //No ejecuta BR
                            grBreakdown.update();

                            gs.print('FELI -> ' + grBreakdown.sys_id + ' - ' + grBreakdown.fiscal_period.name + ' (' + grBreakdown.fiscal_period + ') - local --> $' + grBreakdown.cost_local_currency + ' - Asignarle $' + varArrayMeses[j].toFixed(2));
                            break;
                        }
                    }

                    if (bFindFiscalPeriod == 0) {
                        gs.error('Integracion SAP (actualizo_Cost_Plan_Breakdown) - No se encontró el Periodo ' + grBreakdown.fiscal_period.name + '. Proyecto: [' + grBreakdown.task.number + '] - Partida: ' + grBreakdown.cost_plan.name);
                    } else {
                        bFindFiscalPeriod == 0; //Si encontró, reseteo la variable
                    }
                }

                gs.print('TOTAL (unit_cost) --> $' + varArrayMeses[12].toFixed(2));
                //Actualizo Unit Cost de la cost_plan
                actualizoUnitCost_Cost_Plan(varPartidaActual.toString(), varArrayMeses[12].toFixed(2));

            } else if (cantBreakdown == 0) {
                gs.error('Integracion SAP (actualizo_Cost_Plan_Breakdown) - No hay Partidas en la Tabla cost_plan_breakdown. Proyecto: [' + grBreakdown.task.number + '] - Partida: ' + grBreakdown.cost_plan.name);
            }

        } catch (error) {
            var message = error.message;
            gs.error("Integracion SAP (actualizo_Cost_Plan_Breakdown) - Error: " + message);
        }

    };

    var inserto_Cost_Plan_Breakdown = function(varPartidaActual, varArrayMeses) {

        try {

            var arrayPeriodosFiscales = [11]; //Guardo los Periodos Fiscales Obtenidos para el Ejercicio
            var grCostPlan = new GlideRecord('cost_plan');
            grCostPlan.addQuery('name', '=', varPartidaActual);
            grCostPlan.query();
            grCostPlan.next();

            var grBreakdownTemp = new GlideRecord('u_dxc_temp_breakdown');
            grBreakdownTemp.addQuery('u_estado=NULL^ORu_estado=""'); //Obtengo las Partidas Pendientes de Procesar
            grBreakdownTemp.addQuery('u_partida_presupuestaria', '=', varPartidaActual);
            grBreakdownTemp.query();
            grBreakdownTemp.next();

            //Obtengo los Periodos Fiscales del Ejercicio actual
            arrayPeriodosFiscales = obtengoPeriodosFiscales(grBreakdownTemp.u_ejercicio.toString(), grCostPlan.task.number, varPartidaActual);

            for (var j = 0; j < arrayPeriodosFiscales.length; j++) {

				var grBreakdown = new GlideRecord('cost_plan_breakdown');
				grBreakdown.initialize();

                gs.print('J ' + j + ' - ' + 'Periodo Fiscal    -> ' + arrayPeriodosFiscales[j] + ' --------> cost_local_currency   -> ' + varArrayMeses[j].toFixed(2));

                //gs.print('J '+ j + ' - '+grBreakdown.fiscal_period.name+' ('+grBreakdown.fiscal_period+') - local --> $'+grBreakdown.cost_local_currency+ ' - Asignarle $'+ varArrayMeses[j].toFixed(2));
                //Asigno los valores en los campos
                grBreakdown.setValue('cost_plan', grCostPlan.sys_id);
                grBreakdown.setValue('task', grCostPlan.task);
                grBreakdown.setValue('fiscal_period', arrayPeriodosFiscales[j].toString());
                grBreakdown.setValue('cost_local_currency', varArrayMeses[j].toFixed(2));
                grBreakdown.setWorkflow(false); //No ejecuta BR
                grBreakdown.insert();
            }

            gs.print('TOTAL--> $' + varArrayMeses[12].toFixed(2) + 'task ' + grCostPlan.task);

            //Actualizo unit_cost en cost_plan
            grCostPlan.setValue('unit_cost', varArrayMeses[12].toFixed(2));
            grCostPlan.update();

        } catch (error) {
            var message = error.message;
            gs.error("Integracion SAP (inserto_Cost_Plan_Breakdown) - Error: " + message);
        }

    };

    var actualizo_dxc_temp_breakdown_procesada = function(partidaActual) {

        try {

            //Marco como PROCESADA la Partida Actual, con la Fecha y hora
            var grBreakdownTemp = new GlideRecord('u_dxc_temp_breakdown');
            grBreakdownTemp.addQuery('u_estado=NULL^ORu_estado=""'); //Obtengo las Partidas Pendientes de Procesar
            grBreakdownTemp.addQuery('u_partida_presupuestaria', '=', partidaActual);
            grBreakdownTemp.query();

            while (grBreakdownTemp.next()) {
                var varFechaActual = new GlideDateTime();
                //Actualizo el Registro de la Partida Actual como PROCESADA
                grBreakdownTemp.setValue('u_estado', 'PROCESADA');
                grBreakdownTemp.setValue('u_fecha_procesamiento', varFechaActual);
                grBreakdownTemp.update();
            }

        } catch (error) {
            var message = error.message;
            gs.error("Integracion SAP (actualizo_dxc_temp_breakdown_procesada) - Error: " + message);
        }

    };

    var graboBreakdownCalculado = function(partidaActual, varEjercicio, arrayMeses) {

        try {
            //Si tenemos registros para la Partida Actual, los actualizamos, sino, Insertamos los Registros en la Tabla cost_plan_breakdown

            //Obtengo la Cantidad de Brekdowns que existen para la Partida
            var cantidadPartidas = cantidadPartidasBreakdown(partidaActual.toString());
            gs.print('--------------------- CANTIDAD DE PARTIDAS ---------------------  -> ' + cantidadPartidas);

            if (cantidadPartidas == 0) {
                gs.print('****************************************************************************************');
                gs.print('------------- INSERT Partida ' + partidaActual + ' en los Periodos Fiscales ------------');
                gs.print('****************************************************************************************');
                //Inserto la Partida Presupuestaria en la Tabla Final cost_plan_breakdown
                inserto_Cost_Plan_Breakdown(partidaActual.toString(), arrayMeses);

            } else if (cantidadPartidas > 1) {
                gs.print('****************************************************************************************');
                gs.print('------------- ACTUALIZO Partida ' + partidaActual + ' en los Periodos Fiscales ------------');
                gs.print('****************************************************************************************');
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

    /************************************************************************************* */
    /* Proceso para Actualizar la Tabla cost_plan_breakdown
    /************************************************************************************* */

    //Ciclo ORIGINAL con el Do-While()


    try {
        //Filtro las Partidas que Tengan Proyectos y sean del día de Hoy.
        var grpartidasPendientes = new GlideAggregate('u_dxc_temp_breakdown'); //GlideAggregate query
		//var grpartidasPendientes = new GlideRecord('u_dxc_temp_breakdown'); //GlideAggregate query
        grpartidasPendientes.groupBy('u_partida_presupuestaria'); //Group aggregate by the 'os' field
        grpartidasPendientes.addAggregate('count'); //Count aggregate (only necessary for a count of items of each OS)
        grpartidasPendientes.addQuery('u_estado=NULL^ORu_estado=""');
        grpartidasPendientes.query();

        //Se va a iterar por cada Partida Presupuestaria
        while (grpartidasPendientes.next()) {

            //Se obtienen todos los Breakdowns de la Partida que estoy parado.
            var grBreakdown = new GlideRecord('u_dxc_temp_breakdown');
            grBreakdown.addQuery('u_estado=NULL^u_partida_presupuestaria=' + grpartidasPendientes.u_partida_presupuestaria);
            grBreakdown.query();

            //Genero el Vector para guardar los Subtotales por cada Partida Presupuestaria
            var arrayMeses = getArrayMeses();

            while (grBreakdown.next()) {

                operacionPresupuestaria = grBreakdown.u_operacion_presupuestacion;
                //Sumarizo los Meses

                arrayMeses[0] = parseFloat(arrayMeses[0] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_enero))));
                arrayMeses[1] = parseFloat(arrayMeses[1] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_febrero))));
                arrayMeses[2] = parseFloat(arrayMeses[2] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_marzo))));
                arrayMeses[3] = parseFloat(arrayMeses[3] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_abril))));
                arrayMeses[4] = parseFloat(arrayMeses[4] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_mayo))));
                arrayMeses[5] = parseFloat(arrayMeses[5] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_junio))));
                arrayMeses[6] = parseFloat(arrayMeses[6] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_julio))));
                arrayMeses[7] = parseFloat(arrayMeses[7] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_agosto))));
                arrayMeses[8] = parseFloat(arrayMeses[8] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_septiembre))));
                arrayMeses[9] = parseFloat(arrayMeses[9] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_octubre))));
                arrayMeses[10] = parseFloat(arrayMeses[10] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_noviembre))));
                arrayMeses[11] = parseFloat(arrayMeses[11] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_diciembre))));
                arrayMeses[12] = parseFloat(arrayMeses[12] + operacion(operacionPresupuestaria, parseFloat(formatearMonto(grBreakdown.u_total))));

            }

            var j = 0;
            gs.print('---------------------------------- ' + grpartidasPendientes.u_partida_presupuestaria + ' ---------------------------------- ');
            while (j <= 12) {
                gs.print('Mes ' + j + ' > ' + arrayMeses[j].toFixed(2)); //Formateo a dos Decimales -> toFixed(2)
                j++;
            }

            try {
                //Grabo los Breakdowns de Partida Presupuestaria
                graboBreakdownCalculado(grpartidasPendientes.u_partida_presupuestaria.toString(), grBreakdown.u_ejercicio, arrayMeses);
            } catch (error) {
                message = error.message;
                gs.error("Integracion SAP (Proceso Principal-graboBreakdownCalculado) - Error: " + message);
            }

            //Nuleo el Array
            arrayMeses = null;

        }

    } catch (error) {
        message = error.message;
        gs.error("Integracion SAP (Proceso Principal) - Error: " + message);
    }