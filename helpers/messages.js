require('colors');

const printMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('========================='.blue);
        console.log('       Task menu     '.blue);
        console.log('   (By Ricardo Velez)     ');
        console.log('=========================\n'.blue);

        console.log(`${'1.'.blue} Create a task`);
        console.log(`${'2.'.blue} Get all tasks`);
        console.log(`${'3.'.blue} Get completed tasks`);
        console.log(`${'4.'.blue} Get incomplete tasks`);
        console.log(`${'5.'.blue} Complete a task`);
        console.log(`${'6.'.blue} Delete a task`);
        console.log(`${'0. Exit'.blue}  \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Select an option: ', (option) => {
            readline.close();
            resolve(option);
        })

    });

}

const pause = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPress ${'ENTER'.green} for continue\n`, (option) => {
            readline.close();
            resolve();
        })
    });

}

module.exports = {
    printMenu,
    pause
}