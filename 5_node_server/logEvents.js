const { existsSync } = require("fs");
const { appendFile, mkdir } = require("fs").promises;
const { v4:uuid } = require('uuid');
const { format } = require("date-fns");
const path = require("path");


const logEvents = async ( message, logName ) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try{
        if(!existsSync(path.join(__dirname, "logs"))) {
            await mkdir(path.join(__dirname, "logs"));
        }
        await appendFile(path.join(__dirname, "logs", logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;