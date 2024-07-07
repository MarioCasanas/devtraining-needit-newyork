var ldap = 'ldap:CN=artca3,OU=Proveedo,OU=Raizen,OU=User Accounts,OU=User Directory,DC=swsbl,DC=local';

var inicio = ldap.indexOf("OU=")+3;
var fin = inicio+8; //8 caracteres son del nombre, y los 3 siguientes para compensar los "OU="
//var fin = ldap.indexOf(',OU=');

/*
    Terceros        --> Terceros
    Proveedores     --> Proveedo
    Pasantes        --> Pasantes
    Raizen          --> Raizen,O
    Raizen Brasil   --> Raizen B

*/

var employee_type = ldap.substring(inicio, fin);

gs.print('inicio: '+inicio);
gs.print('fin: '+fin);

gs.print('Employee Type: '+employee_type);

if (employee_type == 'Terceros') {
    //Asigno Terceros
} else if (employee_type == 'Proveedo') {
} else if (employee_type == 'Pasantes') {
} else if (employee_type == 'Raizen,O') {
} else if (employee_type == 'Raizen B') {

}