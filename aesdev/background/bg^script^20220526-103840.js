var codSap = '10000001';

var grVendors = new GlideRecord('u_vendors');
    grVendors.addQuery("u_integer_sap_code", "=", codSap);
    grVendors.query();

    var CNPJ_CPF='';
    
    while (grVendors.next()) {
        CNPJ_CPF = grVendors.u_integer_cnpj_cpf;
    }

    gs.info('TODOS-> '+CNPJ_CPF);