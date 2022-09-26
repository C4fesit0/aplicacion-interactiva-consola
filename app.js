require ('colors');

const { inquirerMenu, leerInput,pausa,listadoTareasBorrar,confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');
const Tarea = require('./models/tarea');
const { guardarDB,leerDB } = require('./db/guardarArchivo');

console.clear();



const main = async() =>{

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //Imprimir el menu
        opt = await inquirerMenu();
        switch (opt){
            case '1':
            //Crear opcion
            const desc =  await leerInput('Descripcion: '); 
            tareas.crearTarea(desc);
            break;
            case '2':
            tareas.listadoCompleto();
            break;
            case '3':
            tareas.listarPendientesCompletadas(true)
            break;
            case '4':
            tareas.listarPendientesCompletadas(false);
            break;
            case '5':
               const ids=  await mostrarListadoChecklist(tareas.listadoArr);
               tareas.toggleCompletadas(ids);
            break;
            case '6':
            const id = await listadoTareasBorrar(tareas.listadoArr);
            if(id!=='0'){
                const ok = await confirmar('Esta seguro?');
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('Tarea borrada')
                }
            }
            break;
        }
        
        guardarDB(tareas.listadoArr);
        await pausa();
    }while(opt !=='0')

}


main();