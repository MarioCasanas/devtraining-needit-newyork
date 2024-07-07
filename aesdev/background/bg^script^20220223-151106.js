var subL1 = 'eP2P_claims_and_returns';
var choice = 'FREE-CL';
var country = 'AR';

var grSubcategoryL2 = new GlideRecord('sys_choice');
grSubcategoryL2.addEncodedQuery('nameSTARTSWITHx_aesbs_bsm_case^elementSTARTSWITHep2p_subcategoryl2_bsm^language=en^inactive=false^dependent_valueSTARTSWITH'+subL1+'^hintLIKE'+country+'^hintLIKE'+choice+'^language='+gs.getSession().getLanguage());
grSubcategoryL2.query();


while (grSubcategoryL2.next()) {
    gs.info(grSubcategoryL2.label+' - '+grSubcategoryL2.value);
}