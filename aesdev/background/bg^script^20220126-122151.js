//Script para actualizar el campo "use_dependent_fiel" en True, al campo "dependent_on_field", le asigno "category"

var grDictionaryEntry = new GlideRecord('sys_dictionary');
/*grDictionaryEntry.addQuery('name=x_94182_hr_case');
grDictionaryEntry.addQuery('internal_type=5217a7c1bf3320001875647fcf0739b7');
grDictionaryEntry.addQuery('element=hr_service_arg');
grDictionaryEntry.addQuery('active=true');
*/
grDictionaryEntry.addQuery('sys_id=d71668961b9f78109352db51f54bcb10');
grDictionaryEntry.query();

if (grDictionaryEntry.next()) {
    gs.info(grDictionaryEntry.getRowCount());
    
    if (grDictionaryEntry.use_dependent_field == true) {
        gs.info('Use dependent field -> '+grDictionaryEntry.use_dependent_field + ' - Dependent on field -> '+grDictionaryEntry.dependent_on_field);

        grDictionaryEntry.use_dependent_field = false;
        //grDictionaryEntry.dependent_on_field = 'u_category';
        grDictionaryEntry.update();

    } else if (grDictionaryEntry.use_dependent_field == false) {
        gs.info('Use dependent field -> '+grDictionaryEntry.use_dependent_field + ' - Dependent on field -> '+grDictionaryEntry.dependent_on_field);
        
        grDictionaryEntry.use_dependent_field = true;
        grDictionaryEntry.dependent_on_field = 'u_category';
        grDictionaryEntry.update();
    }    
}

