const { format } = require('date-fns');
const { v4: uuid } = require("uuid");

const {existsSync} = require("fs");
const { appendFile, mkdir } = require("fs").promises
const path = require("path");

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);

    try {
        if (!existsSync(path.join(__dirname, "logs"))) {
            await mkdir(path.join(__dirname, "logs"));
        }
        await appendFile(path.join(__dirname, "logs", "eventLog.txt"), logItem);
    } catch (err) {
        console.log(err)
    }
}

module.exports = logEvents;
