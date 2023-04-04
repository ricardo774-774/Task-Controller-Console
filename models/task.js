const { v4: uuid } = require('uuid');

class Task {
    id = '';
    desc = '';
    completeIn = null;

    constructor( desc ) {
        this.id = uuid();
        this.desc = desc;
        this.completeIn = null;
     }

}

module.exports = Task;