var grUserLDAP = new GlideRecord('sys_user');
    grUserLDAP.addEncodedQuery('sourceLIKEldap');    
    grUserLDAP.query();
    
    var approver='';
    while (grUserLDAP.next()) {
        approver += grUserLDAP.name + ' | ' + grUserLDAP.email+'%';
    }

    gs.info('TODOS-> '+grUserLDAP.getRowCount());