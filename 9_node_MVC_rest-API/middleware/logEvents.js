const { format } = require("date-fns");
const { v4: uuid} = require("uuid");

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

    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    console.log(`${req.method}\t${req.url}`);
    next();
} 

module.exports = {logger, logEvents}