const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors Said"));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;