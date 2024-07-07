var countryCode = 'US'; // this.getParameter('sysparm_countryCode');
var userCriteria = 'UC1'; //this.getParameter('sysparm_userCriteria');

var grCateg = new GlideRecord('sys_choice');
//NO Toma en cuenta el HINT
grCateg.addEncodedQuery('name=x_aesbs_bsm_case^element=ep2p_category_bsm^language=' + gs.getSession().getLanguage());
grCateg.addQuery();
grCateg.query();

var categoria = '';
var i=0;
while (grCateg.next()) {    
    //Falta que se popule el campo "ep2p_user_criteria" al cargar New Case
    i++;
    if (grCateg.value != 'ep2p_travel_&_expenses') {
        //categoria = categoria + grCateg.value + '|' + grCateg.label + '%';
        gs.info(i+' - '+grCateg.value + '|' + grCateg.label + '%');
    } else {
        if ((countryCode == 'CL')||(countryCode=='CO')||(countryCode=='US')||(userCriteria=='UC6')) {
            gs.info('ENTRO en el ELSE');
            gs.info(i+' - '+grCateg.value + '|' + grCateg.label + '%');
        }
    }
}