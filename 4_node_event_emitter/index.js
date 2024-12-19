const logEvents = require("./logEvents");

const EventEmitter  = require("events");

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

// add listener for the log event

// add listener for the log event
myEmitter.on('log', (msg) => {
    return logEvents(msg);
});

myEmitter.emit('log', "Log event emitted");