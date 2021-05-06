try {

    var grBreakdown = new GlideRecord('cost_plan_breakdown');
    grBreakdown.addQuery('cost_plan.name','=','22222');
    grBreakdown.query();


    gs.info(grBreakdown.getRowCount());

    grBreakdown.setWorkflow(false); //Don't fire Business rule,notifications
    grBreakdown.deleteMultiple();

} catch (error) {
    var message = error.message;
    gs.error("Integracion SAP - Error: " + message);
};  