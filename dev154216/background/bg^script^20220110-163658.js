var gr = new GlideRecord('dmn_demand');
gr.addQuery('number=DMND0021537');
gr.query();
gr.next();

if (gr.stage='demand') {
    gs.info('Stage de la Demanda -> '+gr.number+' - '+gr.stage);
} else {
    gs.info('No es una Demanda');
}
