const inquirer = require('inquirer');

require('colors');

const questionsOpt = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Create a task`
            },
            {
                value: '2',
                name: `${'2.'.blue} Get tasks`
            },
            {
                value: '3',
                name: `${'3.'.blue} Get complete tasks`
            },
            {
                value: '4',
                name: `${'4.'.blue} Get incomplete tasks`
            },
            {
                value: '5',
                name: `${'5.'.blue} Complete a task`
            },
            {
                value: '6',
                name: `${'6.'.blue} Delete a task`
            },
            {
                value: '0',
                name: `${'0.'.blue} Exit`
            }
        ]
    }
];

const questionPau = [
    {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} for continue`,
    }
]

const inquireMenu = async() => {


    console.log('========================='.blue);
    console.log('       Task menu     '.blue);
    console.log('   (By Ricardo Velez)     ');
    console.log('=========================\n'.blue);

    const { option } = await inquirer.prompt(questionsOpt); 
    return option;

}

const inquirePause = async() => {

    console.log('');
    return await inquirer.prompt(questionPau); 
    
}

const readInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                return ( value.length === 0 )
                  ? 'Enter a value'
                  : true
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listTaskDelet = async( tasks = []) => {
    const choices = tasks.map( (task, i) => {
        const index = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${index} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices, 
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const completeTask = async( tasks = [] ) => {
    const choices = tasks.map( (task, i) => {
        const index = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: (task.completeIn) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices, 
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquireMenu,
    inquirePause,
    readInput,
    listTaskDelet,
    confirm,
    completeTask
}