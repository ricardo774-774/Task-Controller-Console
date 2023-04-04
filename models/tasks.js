require('colors');
const Task = require("./task");

class Tasks {
    _list = {};

    get listArr() {
        // extrae cada una de las llaves de _list
        const list = [];
        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push(task);
        });
        return list;

    }

    constructor(){
        this._list = {};
    }

    loadTasksFromArray( tasks = [] ) {
        tasks.forEach( task => {
            this._list[task.id] = task;
        })
    }

    createTask( desc = '' ) {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    getList() {
        console.log();
        this.listArr.forEach( (task, index) => {
            let i = `${index + 1}`;
            (task.completeIn)
              ? console.log(i.green, '.- ', task.desc, ' :: ', 'Competed'.green)
              : console.log(i.red, '.- ', task.desc, ' :: ', 'Incompleted'.red);
        });
    }

    getCompletedTasks() {
        console.log();
        let i=0;
        this.listArr.forEach( task => {
            if(task.completeIn) {
                i += 1;
                console.log(i.toString().green, '.- ', task.desc, ' :: ', task.completeIn.green);
            }
        });
    }

    getIncompletedTasks() {
        console.log();
        let i=0;
        this.listArr.forEach( task => {
            if(task.completeIn) {
                i += 1;
                console.log(i.toString().red, '.- ', task.desc, ' :: ', 'Incompleted'.red);
            }
        });
    }

    deleteTask( id ) {
        console.log();
        if (this._list[id] ){
            delete this._list[id];
        }
    }

    toggleCompleted( ids = [] ) {
        ids.forEach( id => {
            const task = this._list[id];
            if( !task.completeIn ) {
                task.completeIn = new Date().toISOString()
            }
        });

        this.listArr.forEach( task => {
            if ( !ids.includes(task.id) ) {
                this._list[task.id].completeIn = null;
            }
        });

    }
    
}


module.exports = Tasks;