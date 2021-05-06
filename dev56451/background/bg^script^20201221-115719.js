var u_rubro='331522-3';

//Properties Integracion SAP:
    var HARDWARE_OPEX = 'dxc.integracion_sap.cost_type.hardware_opex';
    var HARDWARE_CAPEX = 'dxc.integracion_sap.cost_type.hardware_capex';

    var SOFTWARE_OPEX = 'dxc.integracion_sap.cost_type.software_opex';
    var SOFTWARE_CAPEX = 'dxc.integracion_sap.cost_type.software_capex';

    var EXTERNAL_LABOR_OPEX = 'dxc.integracion_sap.cost_type.external_labor_opex';
    var EXTERNAL_LABOR_CAPEX = 'dxc.integracion_sap.cost_type.external_labor_capex';


    //Obtengo la Propiedad
    var hardware_opex = gs.getProperty(this.HARDWARE_OPEX);
    var hardware_capex = gs.getProperty(this.HARDWARE_CAPEX);
    var software_opex = gs.getProperty(this.SOFTWARE_OPEX);
    var software_capex = gs.getProperty(this.SOFTWARE_CAPEX);
    var external_labor_opex = gs.getProperty(this.EXTERNAL_LABOR_OPEX);
    var external_labor_capex = gs.getProperty(this.EXTERNAL_LABOR_CAPEX);
    
    gs.print(hardware_opex);
    gs.print(hardware_capex);
    gs.print(software_opex);
    gs.print(software_capex);
    gs.print(external_labor_opex);
    gs.print(external_labor_capex);

    if (hardware_opex.indexOf(u_rubro) != -1) {
        gs.print( 'Hardware Opex');
    } else if (hardware_capex.indexOf(u_rubro) != -1) {
        gs.print( 'Hardware Capex');
    } else if (software_opex.indexOf(u_rubro) != -1) {
        gs.print( 'Software Opex');
    } else if (software_capex.indexOf(u_rubro) != -1) {
        gs.print( 'Software Capex');
    } else if (external_labor_opex.indexOf(u_rubro) != -1) {
        gs.print( 'External labor Opex');
    } else if (external_labor_capex.indexOf(u_rubro) != -1) {
        gs.print( 'External labor Capex');
    } else {
        if (u_rubro.substring(0, 1) == '2' || u_rubro.substring(0, 1) == '3') {
            gs.print( 'Other Capex');
        } else if (u_rubro.substring(0, 1) == '8') {
            gs.print( 'Other Opex');
        }
    }