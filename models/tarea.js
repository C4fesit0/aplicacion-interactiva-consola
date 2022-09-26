const {v4: uudiv4} = require('uuid');

class Tarea {
    id='';
    desc='';
    completadoEn= null;
    constructor( desc ){
        this.desc = desc;
        this.id = uudiv4(); 
    }
}


module.exports = Tarea;