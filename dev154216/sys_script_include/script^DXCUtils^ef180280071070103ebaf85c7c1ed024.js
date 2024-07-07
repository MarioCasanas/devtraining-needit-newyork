//override authentication profile 
//authentication type ='basic'/ 'oauth2'
//r.setAuthenticationProfile(authentication type, profile name);
//set a MID server name if one wants to run the message on MID
//r.setMIDServer('MY_MID_SERVER');
//if the message is configured to communicate through ECC queue, either
//by setting a MID server or calling executeAsync, one needs to set skip_sensor
//to true. Otherwise, one may get an intermittent error that the response body is null
//r.setEccParameter('skip_sensor', true);

var DXC_Utils = Class.create();
DXC_Utils.prototype = {
    initialize: function() {},

    getDatosTablaPrincipal: function(paramTableName, ParamFieldName) {

        //Get para obtener un Incidente con todos los datos del Caller_id
        try {

            //TABLA PRINCIPAL
            var rIncident = new sn_ws.RESTMessageV2('get_DinamicoPorTabla', 'GET Datos Tabla Principal');
            rIncident.setStringParameterNoEscape('sys_id', 'fc710fabdb002010143f0181ca9619e7');
			rIncident.setStringParameterNoEscape('tablename', paramTableName);

            var responseTablaPrincipal = rIncident.execute();
            var responseBodyTablaPrincipal = responseTablaPrincipal.getBody();
            var httpStatusTablaPrincipal = responseTablaPrincipal.getStatusCode();

            var parserTP = JSON.parse(responseBodyTablaPrincipal);
            var len = parserTP.result.length;
            var arrayTP = [];			

            for (var i = 0; i < len; i++) {				
                arrayTP.push(parserTP.result[i].caller_id.link.toString());
                gs.info('responseBodyTablaPrincipal - Campo: caller_id.link: (EndPoint) ' + arrayTP[i].toString());

                //CAMPO REFERENCE
                var rUser = new sn_ws.RESTMessageV2('get_DinamicoPorTabla', 'GET User');
                rUser.setEndpoint(arrayTP[i].toString());
                var responseUser = rUser.execute();
                var responseBodyUser = responseUser.getBody();
                var httpStatusUser = responseUser.getStatusCode();
				
				var parserUSER = JSON.parse(responseBodyUser);
				var arrayUSER = [];
				
				gs.info('parserUSER.result[0].toString() ----------------> '+parserUSER[0].toString());
				
				arrayUSER.push(parserUSER.result[0].toString());
                gs.info('responseBodyTablaPrincipal - Campo - responseBodyUser -> caller_id: (CAMPOS) -> ' + arrayUSER[0].toString());
                gs.info('responseBodyTablaPrincipal - Campo - responseBodyUser (JSON) -> ' + responseBodyUser);

            }

            return responseBodyTablaPrincipal;
            
        } catch (ex) {
            var message = ex.message;
            var ddd = 'Creada Para ver message en el Debugger!!!';
        }
    },
    type: 'DXC_Utils'
};