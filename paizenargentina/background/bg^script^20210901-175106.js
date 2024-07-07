function Z_removeAccent(Par) {

    var map = {
        'a': 'á|à|ã|â|ä|À|Á|Ã|Â|Ä',
        'e': 'é|è|ê|ë|É|È|Ê|Ë',
        'i': 'í|ì|î|ï|Í|Ì|Î|Ï',
        'o': 'ó|ò|ô|ö|õ|Ó|Ò|Ô|Õ|Ö',
        'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c': 'ç|Ç',
        'n': 'ñ|Ñ'
        };
    
    str = Par;
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    }
    
    return str;
}

var Splitname = 'Márió';
var Splitlname = 'CasaÑaÂs';

gs.print('ANTES');
gs.print('Nombre: '+Splitname+'.' +Splitlname);

Splitname = Z_removeAccent(Splitname).toLowerCase();
Splitlname = Z_removeAccent(Splitlname).toLowerCase();

gs.print('LUEGO');	
gs.print('Nombre: '+Splitname+'.' +Splitlname);

