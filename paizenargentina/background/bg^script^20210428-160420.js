var strMensaje = '<?xml version="1.0" encoding="UTF-8"?><results probe_time="12790"><result command="powershell scripts\PowerShell\ValidateUser.ps1 andres.palacio"><stdout>True</stdout><stderr/></result><parameters><parameter name="agent" value="mid.server.Mid Server Dev"/><parameter name="response_to" value=""/><parameter name="from_sys_id" value=""/><parameter name="source" value=""/><parameter name="priority" value="2"/><parameter name="agent_correlator" value=""/><parameter name="skip_sensor" value="false"/><parameter name="processed" value=""/><parameter name="error_string" value=""/><parameter name="sys_id" value="40c703a11b3768103bc1ececbc4bcb85"/><parameter name="sequence" value="17919fea7ed0000001"/><parameter name="from_host" value=""/><parameter name="sys_created_on" value="2021-04-28 19:39:50"/><parameter name="sys_domain" value="global"/><parameter name="name" value="powershell scripts\PowerShell\ValidateUser.ps1 andres.palacio"/><parameter name="topic" value="Command"/><parameter name="state" value="ready"/><parameter name="queue" value="output"/><parameter name="ecc_queue" value="40c703a11b3768103bc1ececbc4bcb85"/></parameters></results>';
var inicio = strMensaje.indexOf('<stdout>');
var fin = inicio + 9;

var letra = strMensaje.substring(fin-1, fin);
var valor = '';

if (letra == 'T') {
    valor = 'True';
} else {
    valor = 'False';
}

gs.print('Valor obtenido: '+valor);
