answer = (function transformEntry(source) {

    //Properties Integracion SAP:
    HARDWARE_OPEX = 'dxc.integracion_sap.cost_type.hardware_opex';
    HARDWARE_CAPEX = 'dxc.integracion_sap.cost_type.hardware_capex';

    SOFTWARE_OPEX = 'dxc.integracion_sap.cost_type.software_opex';
    SOFTWARE_CAPEX = 'dxc.integracion_sap.cost_type.software_capex';

    EXTERNAL_LABOR_OPEX = 'dxc.integracion_sap.cost_type.external_labor_opex';
    EXTERNAL_LABOR_CAPEX = 'dxc.integracion_sap.cost_type.external_labor_capex';

    //Obtengo la Propiedad
    var hardware_opex = gs.getProperty(this.HARDWARE_OPEX);
    var hardware_capex = gs.getProperty(this.HARDWARE_CAPEX);
    var software_opex = gs.getProperty(this.SOFTWARE_OPEX);
    var software_capex = gs.getProperty(this.SOFTWARE_CAPEX);
    var external_labor_opex = gs.getProperty(this.EXTERNAL_LABOR_OPEX);
    var external_labor_capex = gs.getProperty(this.EXTERNAL_LABOR_CAPEX);
    
    log.info('u_rubro: -> '+source.u_rubro);

    if (hardware_opex.indexOf(source.u_rubro) != -1) {
        return 'Hardware Opex';
    } else if (hardware_capex.indexOf(source.u_rubro) != -1) {
        return 'Hardware Capex';
    } else if (software_opex.indexOf(source.u_rubro) != -1) {
        return 'Software Opex';
    } else if (software_capex.indexOf(source.u_rubro) != -1) {
        return 'Software Capex';
    } else if (external_labor_opex.indexOf(source.u_rubro) != -1) {
        return 'External labor Opex';
    } else if (external_labor_capex.indexOf(source.u_rubro) != -1) {
        return 'External labor Capex';
    } else {
        if (source.u_rubro.substring(0, 1) == '2' || source.u_rubro.substring(0, 1) == '3') {
            return 'Other Capex';            
        } else if (source.u_rubro.substring(0, 1) == '8') {
            return 'Other Opex';            
        }
    }

})(source);