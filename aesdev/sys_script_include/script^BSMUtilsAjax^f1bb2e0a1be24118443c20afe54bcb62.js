var BSM_UtilsAjax = Class.create();
BSM_UtilsAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getCategoria_eP2P: function() {

        var countrySelected = this.getParameter('sysparm_countrySelected');

        //gs.info('BSM_UtilsAjax - (getCategoria_eP2P) - countrySelected -> '+countrySelected);       

        var grCateg = new GlideRecord('sys_choice');
        grCateg.addEncodedQuery('name=x_aesbs_bsm_case^element=ep2p_category_bsm^hintLIKE' + countrySelected + '^language=' + gs.getSession().getLanguage());
        grCateg.addQuery();
        grCateg.query();

        var categoria = '';
        while (grCateg.next()) {
            categoria = categoria + grCateg.value + '|' + grCateg.label + '%';
        }

        //gs.info('BSM_UtilsAjax - (getCategoria_eP2P) - Categoría -> '+categoria+ ' countrySelected -> '+countrySelected);
        return categoria;
    },
    getEmail: function() {
        var user = this.getParameter('sysparm_user');

        grUser = new GlideRecord('sys_user');
		grUser.addQuery();
        grUser.query();
		grUser.next();

        return new grUser.email;
    },

    getSubCategoria_L1_eP2P: function() {
/*
        var countrySelected = this.getParameter('sysparm_countrySelected');
        var dependentCateg = this.getParameter('sysparm_category');

        gs.info('BSM_UtilsAjax - (getSubCategoria_L1_eP2P) - countrySelected -> ' + countrySelected + ' - dependentCateg -> ' + dependentCateg);

        var grSubL1 = new GlideRecord('sys_choice');
        grSubL1.addEncodedQuery('name=x_aesbs_bsm_case^element=ep2p_subcategory_bsm^hintLIKE' + countrySelected + '^dependent_value=' + dependentCateg + '^language=' + gs.getSession().getLanguage());
        grSubL1.addQuery();
        grSubL1.query();

        var subcategoriaL1 = '';
        while (grSubL1.next()) {
            subcategoriaL1 = subcategoriaL1 + grSubL1.value + '|' + grSubL1.label + '%';
        }

        gs.info('BSM_UtilsAjax - (getSubCategoria_L1_eP2P) - Subcategoría -> ' + subcategoriaL1 + ' countrySelected -> ' + countrySelected);
        return subcategoriaL1;
	*/
    },

    getSubCategoria_L2_eP2P: function() {
/*
        var countrySelected = this.getParameter('sysparm_countrySelected');
        var dependentSubCategL1 = this.getParameter('sysparm_subCategL1');

        gs.info('BSM_UtilsAjax - (getSubCategoria_L2_eP2P) - SubCateg L1 -> ' + dependentSubCategL1);

        var grSubL1 = new GlideRecord('sys_choice');
        //grSubL1.addEncodedQuery('name=x_aesbs_bsm_case^element=ep2p_subcategoryl2_bsm^dependent_value=' + dependentSubCategL1 + '^hintLIKE' + countrySelected + '^language=' + gs.getSession().getLanguage());

        grSubL1.addEncodedQuery('name=x_aesbs_bsm_case^element=ep2p_subcategoryl2_bsm^hintLIKE' + countrySelected + '^dependent_value=' + dependentSubCategL1 + '^language=' + gs.getSession().getLanguage());

        grSubL1.addQuery();
        grSubL1.query();

        var subcategoriaL1 = '';
        while (grSubL1.next()) {
            subcategoriaL1 = subcategoriaL1 + grSubL1.value + '|' + grSubL1.label + '%';
        }

        return subcategoriaL1;
*/
    },

  //  getSubCategoria_L3_eP2P: function() {},

    type: 'BSM_UtilsAjax'
});