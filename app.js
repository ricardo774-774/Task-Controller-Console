//const { printMenu, pause } = require('./helpers/messages');
const { 
    inquireMenu, 
    inquirePause,
    readInput,
    listTaskDelet,
    confirm,
    completeTask
 } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');
const { 
    saveDB,
    readDB,
} = require('./helpers/files');

const main = async() => {

    let option = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if(tasksDB) { // Load Tasks
        tasks.loadTasksFromArray( tasksDB )
    }

    do {
        //      Menu de manual      //
        // option = await printMenu();
        // console.log({option});
        // if (option !== '0') await pause();
        
        //      Menu con inquire      //

        //Limpiar consola
        console.clear();

        option = await inquireMenu();

        switch (option) {
            case '1':
                //Crear tarea
                const description = await readInput('Description: ');
                tasks.createTask( description );
            break;

            case '2':
                //Mostrar tareas
                tasks.getList();
            break;
            case '3':
                //Mostrar tareas completadas
                tasks.getCompletedTasks();
            break;
            case '4':
                //Mostrar tareas incompletas
                tasks.getIncompletedTasks();
            break;
            case '5':
                //Completar tareas
                const ids = await completeTask(tasks.listArr);
                tasks.toggleCompleted(ids)
            break;
            case '6':
                //Eliminar tarea y confirmacion
                const id =  await listTaskDelet(tasks.listArr);
                if ( id !== '0') {
                    const ok = await confirm('Are you sure to delete?');
                    if(confirmation) {
                        tasks.deleteTask(id);
                        console.log('Task deleted successfully')
                    }
                }
            break;
        }

        // Crea un nuevo archivo con la data de tasks.listArr
        saveDB( tasks.listArr );

        await inquirePause();

    } while (option !== '0');

}

main();