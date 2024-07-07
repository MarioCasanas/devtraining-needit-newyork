var countrySelected = 'F-AR';
var grSubL2 = new GlideRecord('sys_choice');
    grSubL2.addEncodedQuery('name=x_aesbs_bsm_case^element=ep2p_subcategory_bsm^hintLIKE' + countrySelected + 'language=' + gs.getSession().getLanguage());
    grSubL2.addQuery();
    grSubL2.query();

    while (grSubL2.next()) {
      gs.info('Sub L2 -> '+grSubL2.label);
    }

/*
var cant = grSubL2.hint.indexOf(',');
if (cant != -1) {//Si encontró la coma, toma el valor de la Cantidad de Días

  var hint = parseInt(grSubL2.hint.substring(0,cant));
  //gs.info('grSubL2 (cant) -> '+cant);  
  //if (hint != NaN) {
  if (isNaN(hint)) {
    gs.Error('El Hint NO es NUMERICO-> '+grSubL2.hint.substring(0,cant));
  }
}
*/