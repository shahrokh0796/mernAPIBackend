const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsP = require("fs").promises;
const path = require("path");



const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsP.mkdir(path.join(__dirname, "..", "logs"));
        }

        await fsP.appendFile(path.join(__dirname, "..", "logs", logName), logItem);
    } catch(err) {
        console.log(err);
    }
}

const logger = (err, req, res, next) => {
    logEvents(`${req.method} ${req.headers.origin} ${req.url}`, "reqLog.txt");
    next();
}

module.exports = { logEvents, logger };