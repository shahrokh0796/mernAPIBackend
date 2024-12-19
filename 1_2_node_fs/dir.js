const { existsSync , rmdir, mkdir } = require('fs');

if (!existsSync('./new')) {
mkdir('./new', (err) => {
    if (err) throw err;
    console.log("Directory created");
});
}

if(existsSync('./new')) {
    rmdir("./new", (err) => {
        console.log("directory deleted");
    });
};

