var supervisor = inputs.supervisor;
var varConsulta = 'nameLIKE'+supervisor;

var grPartida = new GlideRecord('sys_user');
grPartida.addQuery(varConsulta);
grPartida.query();
grPartida.next();

if (grPartida.getRowCount() == 1) {
    outputs.manageridout=grPartida.u_id;
} else {
    outputs.manageridout='User_id No encontrado';
}
