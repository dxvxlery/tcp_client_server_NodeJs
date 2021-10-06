const Net = require('net');
var readline = require('readline');
const prompt = require('prompt-sync')();

class Client {
    constructor(id) {
        this.id = id;
        this.socket = new Net.Socket();
        this.socket.on('data', (chunk) => {
            console.log(`Client#${this.id}: ${chunk}\n`);
        });
        this.socket.on('end', function() {
            console.log('Requested an end to the TCP connection');
        });
    }
    connect(host, port) {
        this.socket.connect(
            { port: port, host: host }, 
            () => {
                console.log(`Client#${this.id} connected`);
                const name = prompt('Введите кол-во слов: ');
                console.log(`Вы ввели ${name}`);
                this.socket.write(`${name }`);
                this.socket.end() 
            }
        );

        
    }
}

const port = 8080;
const host = 'localhost';

for (let i = 0; i < 2; i++) {
    new Client(i).connect(host, port);
}