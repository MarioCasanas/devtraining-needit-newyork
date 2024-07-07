var PurchaseOrderUtils = Class.create();
PurchaseOrderUtils.prototype = {
    initialize: function() {},

    getOcConfirmada: function() {

		gs.info('MARIO: ENTRO en getOcConfirmada');
        //destino='Boston';
        var destino = this.getParameter("sysparm_destino");
        gs.info('MARIO: Destino - ' + destino);

        var gr = new GlideRecord("sn_shop_purchase_order");
        gr.addEncodedQuery("status=Confirmada^u_destino_de_oc=" + destino);
        gr.query();
        gr.next();

        while (gr.next()) {
            gs.info("MARIO : " + gr.number + " - OC: " + gr.u_destino_de_oc);
        }

        //gs.info("OC: " + gr.getRowCount());


        //		return gr;

    },
    type: 'PurchaseOrderUtils'
};