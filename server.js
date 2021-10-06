const Net = require('net');
const port = 8080;

const clientHandler = function(socket) {
    console.log('A new connection has been established.');
    

    
    socket.on('data', function(chunk) {  
          console.log(`Полученные данные от клиента: ${chunk.toString()}`);
        for(let i=0;i<Number(chunk);i++)
    {
        var cats = ["Барсик", "Мурзик", "Рыжик", "Васька"];
        var randomIndex = Math.floor(Math.random() * 4);

    
        socket.write(cats[randomIndex]); 
    }
    });


    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
};

const server = new Net.Server();
server.on('connection', clientHandler);
server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});