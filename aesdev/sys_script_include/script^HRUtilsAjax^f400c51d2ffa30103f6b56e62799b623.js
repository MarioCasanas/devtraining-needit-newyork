var HR_UtilsAjax = Class.create();
HR_UtilsAjax.prototype = Object.extendsObject(global.AbstractAjaxProcessor, {

    getAssignmentGroup: function() {
        var user = this.getParameter('sysparm_user');

        grUser = new GlideRecord('sys_user');
        grUser.get(user);

        return new HR_Utils().getAssignmentGroup(grUser);
    },
    getSourceHrCaseArg: function() {
        var hrCase = new GlideRecord('x_94182_hr_case');
        hrCase.addQuery('number', '=', this.getParameter('sysparm_HrCase'));
        hrCase.query();
        hrCase.next();

        return hrCase.source;
    },
    getAreaByCategory: function() {

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category');
        grDependentValue.addQuery('value', '=', this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        /*		20211102 MC: No es necesaria la consulta. Con el dependent_value cargamos el Area.
        var grArea = new GlideRecord('sys_choice');
        grArea.addQuery('name=x_94182_hr_case');
        grArea.addQuery('element=hr_service_area');
        grArea.addQuery('value=' + grDependentValue.dependent_value);
        grArea.query();
        grArea.next();
		
        return grArea.value;
		*/
        return grDependentValue.dependent_value;

    },

    getAreaByCategoryCase: function() {

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category');
        grDependentValue.addQuery('value', '=', this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grArea = new GlideRecord('sys_choice');
        grArea.addQuery('name=x_94182_hr_case');
        grArea.addQuery('element=hr_service_area');
        grArea.addQuery('value=' + grDependentValue.dependent_value);
        grArea.addQuery('language=' + gs.getSession().getLanguage());
        grArea.query();
        grArea.next();

        return grArea.value + '|' + grArea.label + '%';

    },
    getAreaByCategoryCaseArg: function() {

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category_arg');
        grDependentValue.addQuery('value', '=', this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grArea = new GlideRecord('sys_choice');
        grArea.addQuery('name=x_94182_hr_case');
        grArea.addQuery('element=hr_service_area_arg');
        grArea.addQuery('value=' + grDependentValue.dependent_value);
        grArea.addQuery('language=' + gs.getSession().getLanguage());
        grArea.query();
        grArea.next();

        return grArea.value + '|' + grArea.label + '%';

    },
    getAreaByCategoryQuestionArg: function() {

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category_arg');
        grDependentValue.addQuery('value', '=', this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grArea = new GlideRecord('sys_choice');
        grArea.addQuery('name=x_94182_hr_case');
        grArea.addQuery('element=hr_service_area_arg');
        grArea.addQuery('value=' + grDependentValue.dependent_value);
        grArea.addQuery('language=' + gs.getSession().getLanguage());
        grArea.query();
        grArea.next();

        return grArea.label + ' | ' + grArea.value;

    },
    getServiciosByCategoryCase: function() {

        gs.debug('HR_UtilsAjax -getServiciosByCategoryCase ' + this.getParameter('sysparm_category'));

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category');
        grDependentValue.addQuery('value=' + this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grServicios = new GlideRecord('sys_choice');
        grServicios.addQuery('name=x_94182_hr_case');
        grServicios.addQuery('element=hr_service');
        grServicios.addQuery('dependent_value=' + grDependentValue.value);
        grServicios.addQuery('language=' + gs.getSession().getLanguage());
        grServicios.orderBy('label');
        grServicios.query();

        var servicios = '';
        while (grServicios.next()) {
            servicios = servicios + grServicios.value + '|' + grServicios.label + '%';
        }

        return servicios;

    },
    getServiciosByCategoryCaseArg: function() {

        gs.debug('HR_UtilsAjax -getServiciosByCategoryCase ' + this.getParameter('sysparm_category'));

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category_arg');
        grDependentValue.addQuery('value=' + this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grServicios = new GlideRecord('sys_choice');
        grServicios.addQuery('name=x_94182_hr_case');
        grServicios.addQuery('element=hr_service_arg');
        grServicios.addQuery('dependent_value=' + grDependentValue.value);
        grServicios.addQuery('language=' + gs.getSession().getLanguage());
        grServicios.orderBy('label');
        grServicios.query();

        var servicios = '';
        while (grServicios.next()) {
            servicios = servicios + grServicios.value + '|' + grServicios.label + '%';
        }

        return servicios;

    },
    getServiciosByCategoryCaseArgCountry: function() {

        //gs.debug('HR_UtilsAjax -getServiciosByCategoryCase ' + this.getParameter('sysparm_category'));

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category_arg');
        grDependentValue.addQuery('value=' + this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grServicios = new GlideRecord('sys_choice');
        grServicios.addQuery('name=x_94182_hr_case');
        grServicios.addQuery('element=hr_service_arg');
        grServicios.addQuery('dependent_value=' + grDependentValue.value);
        grServicios.addQuery('language=' + gs.getSession().getLanguage());
        //^hintLIKE'+current.variables.country_code_arg+'^hintLIKE'+current.variables.asa_verification
        grServicios.addQuery('hintLIKE' + this.getParameter('sysparm_country') + '^hintLIKE' + this.getParameter('sysparm_company'));
        grServicios.orderBy('label');
        grServicios.query();

        var servicios = '';
        while (grServicios.next()) {
            servicios = servicios + grServicios.value + '|' + grServicios.label + '%';
        }

        return servicios;

    },
    getServiciosByCategoryCaseArgCountryBE: function() {

        //gs.debug('HR_UtilsAjax -getServiciosByCategoryCase ' + this.getParameter('sysparm_category'));

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category_arg');
        grDependentValue.addQuery('value=' + this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        var grServicios = new GlideRecord('sys_choice');
        //grServicios.addQuery('name=x_94182_hr_case');
        //grServicios.addQuery('element=hr_service_arg');
        //grServicios.addQuery('dependent_value=' + grDependentValue.value);
        //grServicios.addQuery('language=' + gs.getSession().getLanguage());
        //^hintLIKE'+current.variables.country_code_arg+'^hintLIKE'+current.variables.asa_verification
        //name=x_94182_hr_case^hintLIKEPA-NOT^hintLIKEAES Servicios America SRL^elementSTARTSWITHhr_service_arg^NQname=x_94182_hr_case^hintLIKEBackend
        //name=x_94182_hr_case^hintLIKEPA-NOT^hintLIKEAES Servicios America SRL^elementSTARTSWITHhr_service_arg^NQname=x_94182_hr_case^hintLIKEBackend^element=hr_service_arg
        grServicios.addQuery('name=x_94182_hr_case^element=hr_service_arg^language=' + gs.getSession().getLanguage() + '^hintLIKEBackend^ORhintLIKE' + this.getParameter('sysparm_country') + '^ORhintLIKE' + this.getParameter('sysparm_company') + '^dependent_value=' + grDependentValue.value);
        //grServicios.addQuery('hintLIKE' + this.getParameter('sysparm_country') + '^hintLIKE' + this.getParameter('sysparm_company'));
        grServicios.orderBy('label');
        grServicios.query();

        var servicios = '';
        while (grServicios.next()) {
            servicios = servicios + grServicios.value + '|' + grServicios.label + '%';
        }

        return servicios;

    },
    getSelect_QuestionByServicioCaseArgCountry: function() {

        //gs.debug('HR_UtilsAjax -getServiciosByCategoryCase ' + this.getParameter('sysparm_category'));

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_service_arg');
        grDependentValue.addQuery('value=' + this.getParameter('sysparm_service'));
        grDependentValue.query();
        grDependentValue.next();

        var grServicios = new GlideRecord('sys_choice');
        grServicios.addQuery('name=x_94182_hr_case');
        grServicios.addQuery('element=select_question_arg');
        grServicios.addQuery('dependent_value=' + grDependentValue.value);
        grServicios.addQuery('language=' + gs.getSession().getLanguage());
        grServicios.addQuery('hintLIKE' + this.getParameter('sysparm_country') + '^hintLIKE' + this.getParameter('sysparm_company'));
        grServicios.orderBy('label');
        grServicios.query();

        var servicios = '';
        while (grServicios.next()) {
            servicios = servicios + grServicios.value + '|' + grServicios.label + '%';
        }

        return servicios;

    },
    getSelect_QuestionByServicioCaseArgCountryBE: function() {

        //gs.debug('HR_UtilsAjax -getServiciosByCategoryCase ' + this.getParameter('sysparm_category'));

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_service_arg');
        grDependentValue.addQuery('value=' + this.getParameter('sysparm_service'));
        grDependentValue.query();
        grDependentValue.next();

        var grServicios = new GlideRecord('sys_choice');
        //grServicios.addQuery('name=x_94182_hr_case');
        //grServicios.addQuery('element=select_question_arg');
        //grServicios.addQuery('dependent_value=' + grDependentValue.value);
        //grServicios.addQuery('language=' + gs.getSession().getLanguage());
        //grServicios.addQuery('hintLIKE' + this.getParameter('sysparm_country') + '^hintLIKE' + this.getParameter('sysparm_company'));
		//Change
		grServicios.addQuery('name=x_94182_hr_case^element=select_question_arg^language=' + gs.getSession().getLanguage() + '^hintLIKEBackend^ORhintLIKE' + this.getParameter('sysparm_country') + '^ORhintLIKE' + this.getParameter('sysparm_company') + '^dependent_value=' + grDependentValue.value);
        grServicios.orderBy('label');
        grServicios.query();

        var servicios = '';
        while (grServicios.next()) {
            servicios = servicios + grServicios.value + '|' + grServicios.label + '%';
        }

        return servicios;

    },

    getAreaByCategoryArg: function() {

        var grDependentValue = new GlideRecord('sys_choice');
        grDependentValue.addQuery('name=x_94182_hr_case');
        grDependentValue.addQuery('element=hr_category_argentina');
        grDependentValue.addQuery('value', '=', this.getParameter('sysparm_category'));
        grDependentValue.query();
        grDependentValue.next();

        gs.debug('HR_UtilsAjax-getAreaByCategoryArg -> ' + this.getParameter('sysparm_categoryArg'));

        var grArea = new GlideRecord('sys_choice');
        grArea.addQuery('name=x_94182_hr_case');
        grArea.addQuery('element=hr_service_area_arg');
        grArea.addQuery('value=' + grDependentValue.dependent_value);
        grArea.query();
        grArea.next();

        return grArea.value;

    },
	
    getCountryCode_CompanyWithUser: function() {

        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', this.getParameter('sysparm_sys_id'));
        grUser.query();
        grUser.next();

        return grUser.company.name + '|' + grUser.country + '%';
    },

    getOpenTask: function() {
        var target = new GlideRecord("x_94182_hr_case_task");
        var queryString = "stateNOT IN3,8";
        target.addQuery("hr_case", this.getParameter('sysparm_sys_id'));
        target.addEncodedQuery(queryString);
        target.query();
        if (target.hasNext()) {
            return "open";
        }
    },

    getManagerbyUser: function() {

        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', this.getParameter('sysparm_sys_id'));
        grUser.query();
        grUser.next();

        return grUser.manager.name;

    },
    memberofManagement: function() {
        var flag = gs.getUser().isMemberOf('SSCAR-T1-HR-Management & Processes');
        return flag;
    },

	getCompanyWithUser: function() {

        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', this.getParameter('sysparm_sys_id'));
        grUser.query();
        grUser.next();

        return grUser.company.name;
    },
	
	getDepartmentWithUser: function() {

        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', this.getParameter('sysparm_sys_id'));
        grUser.query();
        grUser.next();

        return grUser.department.name;
    },	
	
    getEmployeeNumberWithUser: function() {

        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', this.getParameter('sysparm_sys_id'));
        grUser.query();
        grUser.next();

        return grUser.employee_number;

    },	
	
	getEmployeeNumber: function() {

        var grUser = new GlideRecord('sys_user');
        grUser.addQuery('sys_id', '=', this.getParameter('sysparm_sys_id'));
        grUser.query();
        grUser.next();

        return grUser.employee_number;
    },	

    getValidoFecha: function() {

        try {

            var hoy = new GlideDate();
            var sysDay = hoy.getByFormat('dd/MM/YYYY');

            //var fechaSeleccionada = new GlideDateTime('23/02/2022');
            var fechaSeleccionada = new GlideDateTime(this.getParameter('sysparm_DesiredDate'));
            var fsel = fechaSeleccionada.getDate();
            var DesireDate = fsel.getByFormat('dd/MM/YYYY');
    
            if (DesireDate < sysDay) {
                gs.info('HR_UtilsAjax - (getValidoFecha): La fecha debe ser posterior al día actual. DesireDate -> '+DesireDate+ ' < Hoy -> '+sysDay);
                return '';
            } else {
                gs.info('HR_UtilsAjax - (getValidoFecha): ASIGNAR FECHA -> '+DesireDate);
                return DesireDate;
            }            
        } catch (error) {
            gs.error('HR_UtilsAjax - (getValidoFecha): ERROR -> '+error);
        }

    },	
    
    getCategoryValue: function() {

        try {

            var grCategory = new GlideRecord('sys_choice');
            grCategory.addQuery('sys_id='+this.getParameter('sysparm_label'));            
			//grCategory.addEncodedQuery('name=x_94182_hr_case^elementSTARTSWITHhr_category_br^label='+this.getParameter('sysparm_label'));
            grCategory.query();

            gs.info('HR_UtilsAjax - (getCategoryValue) - (sysparm_label): '+this.getParameter('sysparm_label'));
            
            if (grCategory.next()) {
                gs.info('HR_UtilsAjax - (getCategoryValue): '+grCategory.value);
                return grCategory.value;
            }
            
        } catch (error) {
            gs.error('HR_UtilsAjax - (getCategoryValue): ERROR -> '+error);			
        }

    },	
	
    type: 'HR_UtilsAjax'
});