var varPartida = '99999NoExisteCost_Plan';

var grPartida = new GlideRecord('cost_plan');
grPartida.addQuery('name','=',varPartida);
grPartida.query();

if (grPartida.getRowCount()==0) {
  gs.print('Integración SAP (Importación Breakdown) - No existe la Partida ('+varPartida+') en la tabla cost_plan');
  //log.warn('Integración SAP (Importación Breakdown) - No existe la Partida ('+varPartida+') en la tabla cost_plan');
}