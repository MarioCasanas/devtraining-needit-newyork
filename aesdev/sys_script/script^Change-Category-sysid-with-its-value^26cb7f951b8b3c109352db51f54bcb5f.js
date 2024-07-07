(function executeRule(current, previous /*null when async*/ ) {

    //Asigno el value de Area en el combo    
    var grArea = new GlideRecord('sys_choice');
    grArea.addQuery('name=x_94182_hr_case');
    grArea.addQuery('element=hr_service_area');
    grArea.addQuery('label=' + current.variables.hr_service_area.getDisplayValue());
    grArea.query();
    grArea.next();

    current.hr_service_area = grArea.value;

    //Asigno el value de Category en el combo
    var grCateg = new GlideRecord('sys_choice');
    grCateg.addQuery('sys_id', '=', current.hr_category);
    grCateg.query();
    grCateg.next();

    current.hr_category = grCateg.value;

    //Asigno el value de HR Service en el combo
    var grService = new GlideRecord('sys_choice');
    grService.addQuery('name=x_94182_hr_case');
    grService.addQuery('element=hr_service');
    //grService.addQuery('label=' + current.variables.hr_service.getDisplayValue());
	grService.addQuery('value=' + current.variables.hr_service.getDisplayValue());
    grService.query();
    grService.next();

    current.hr_service = grService.value;
    //Estoy en el ITEM del Record Producer
    current.short_description = grCateg.label + ' - ' + current.variables.hr_service.getDisplayValue();

    //HR Service -> Benefits Enrollment - Add/Change Dependents
    current.hr_br_select_below_options = current.variables.hr_br_select_below_options;
    current.hr_br_name_of_the_dependent = current.variables.hr_br_name_of_the_dependent;
    current.hr_br_cpf_of_dependent = current.variables.hr_br_cpf_of_dependent;
    current.hr_br_relationship = current.variables.hr_br_relationship;
    //HR Br Ir Applicable
	current.hr_br_ir_applicable = current.variables.hr_br_ir_applicable;

	current.source = 'self_service';

    if ((current.hr_service == 'benefits_medical_&_dental_care') && (current.hr_br_select_below_options == 'add')) {
        //HR Service -> Benefits - Medical & Dental Care (Add)
        current.hr_br_select_your_insurance = current.variables.select_insurance_to_add;

    } else if ((current.hr_service == 'benefits_medical_&_dental_care') && (current.hr_br_select_below_options != 'add')) {
        //HR Service -> Benefits - Medical & Dental Care (Change/Inquiry/Remove)
        current.hr_br_select_your_insurance = current.variables.select_your_current_insurance;
    }

    if ((current.hr_service == 'benefits_private_pension') && (current.hr_br_select_below_options == 'add')) {
        //HR Service -> Benefits - Private Pension (Add)
        current.select_your_current_insurance2 = current.variables.select_insurance_to_add_2;

    } else if ((current.hr_service == 'benefits_private_pension') && (current.hr_br_select_below_options != 'add')) {
        //HR Service -> Benefits - Private Pension (Change/Inquiry/Remove)
        current.select_your_current_insurance2 = current.variables.select_your_current_insurance_2; 
    }
   
    if ((current.hr_service == 'benefits_life_insurance') && (current.hr_br_select_below_options == 'add')) {
        //HR Service -> Benefits - Life Insurance (Add)
        current.select_your_current_insurance_3 = current.variables.select_insurance_to_add_3;   

    } else if ((current.hr_service == 'benefits_life_insurance') && (current.hr_br_select_below_options != 'add')) {
        //HR Service -> Benefits - Life Insurance (Change/Inquiry/Remove)
        current.select_your_current_insurance_3 = current.variables.select_your_current_insurance_3;
    }

    if ((current.hr_service == 'benefits_food_and_transportation') && (current.hr_br_select_below_options == 'add')) {
        //HR Service -> Benefits - Food and Transportation (Add)
        current.select_your_current_insurance_4 = current.variables.select_insurance_to_add_4;

    } else if ((current.hr_service == 'benefits_food_and_transportation') && (current.hr_br_select_below_options != 'add')) {
        //HR Service -> Benefits - Food and Transportation (Change/Inquiry/Remove)
        current.select_your_current_insurance_4 = current.variables.select_your_current_insurance_4;        
    }
	
    current.description = current.variables.description;

    //gs.addInfoMessage('current.description -> '+current.description);

    //Asigno el "Assignment Group" -> "SSCBR -T1-HR-Services"
    current.assignment_group = '6445ddb11b43fc109352db51f54bcb68';

    //gs.addInfoMessage('current.hr_service_area -> ' + current.hr_service_area);
    //gs.addInfoMessage('current.hr_category -> ' + current.hr_category + ' - grCateg.value -> ' + grCateg.value);
    //gs.addInfoMessage('current.hr_service -> ' + current.hr_service);

})(current, previous);