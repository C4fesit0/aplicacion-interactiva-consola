const Tarea = require("./tarea");


/* 
    _listado:
        {'uuid-12345324-24324212-2': {id:12, desc:sdad, completadoEN:92321} },
        {'uuid-12345324-24324212-2': {id:12, desc:sdad, completadoEN:92321} },
        {'uuid-12345324-24324212-2': {id:12, desc:sdad, completadoEN:92321} }
*/

class Tareas{
    _listado = {};

    constructor(){
        this._listado={};
    }

    borrarTarea(id =''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach((tarea) =>{
            this._listado[tarea.id]=tarea
        })
        return true;
    }


    crearTarea (desc =''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id]=tarea;
    }

    listadoCompleto(){
        console.log();
        this.listadoArr.forEach((tarea,i)=>{

            const index = `${i + 1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)? 'Completada'.green: 'Pendiente'.red;
            console.log(`${index} ${desc}::${completadoEn}`);
        })
    
    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador =0;
        this.listadoArr.forEach((tarea,i)=>{
            if(!(tarea.completadoEn==null)==completadas){
            contador+=1;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)? completadoEn.green: 'Pendiente'.red;
            console.log(`${(contador+'.').green} ${desc}::${estado}`);
            }
        })
    }

    get listadoArr(){
        const listado =[];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    toggleCompletadas(ids = []){

        ids.forEach( id =>{
        
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        
        })

        this.listadoArr.forEach(tarea =>{
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn =null;
            }
        })
    }
}



module.exports = Tareas

