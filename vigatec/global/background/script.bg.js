var grCase = new GlideRecord('sn_customerservice_case');
grCase.addQuery('u_category', '!=', 'NULL');
grCase.query();

gs.info(grCase.getRowCount());

/*
while(grCase.next()){
	grCase.setValue('category', grCase.getValue('u_category'));
	gs.info('Campo Category: '+grCase.category+' - Campo u_category: '+grCase.u_category);
	
	//grCase.update();
}*/