//Borrar la KB creadas por Error

var grKB = new GlideRecord('kb_knowledge_base');
grKB.addEncodedQuery('active=true^description=Knowledge Base for Brasil');
grKB.query();
//grKB.next();
//grKB.deleteMultiple(); // Ken and Santosh update

while (grKB.next()) {
    gs.info(grKB.title);
}

//grKB.deleteMultiple(); // Ken and Santosh update