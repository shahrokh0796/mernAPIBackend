const whitelist = ["http://localhost:3500"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS Said"));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = { corsOptions };