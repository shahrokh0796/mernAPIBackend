const {readFile, writeFile, appendFile, rename, unlink} = require("fs").promises;

const path  = require('path');

const fileOps = async () => {
    try {
        const data = await readFile(path.join(__dirname, "files", "starter.txt"), 'utf8');
        console.log(data);
        await unlink(path.join(__dirname, 'files', 'starter.txt'));


        await writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), "\n\nthank you from append");
        await rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'newPromiseWrite.txt'));
        const newData = await readFile(path.join(__dirname, "files", "newPromiseWrite.txt"), "utf8");
        console.log(newData);
    } catch (err) {
        console.log(err);
    }
};

fileOps();

readFile(path.join(__dirname, 'files', 'starter.txt'), 
"utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
});


// writeFile(path.join(__dirname, 'files', 'reply.txt'), 
// 'Hi, am tabasum, nice to meet you', (err) => {
//     if (err) throw err;
//     console.log("write complete");

//     appendFile(path.join(__dirname, 'files', 'reply.txt'), 
// '. Adding some more text to test appending', (err) => {
//     if (err) throw err;
//     console.log("Append complete");

//     rename(path.join(__dirname, "files", "reply.txt"), 
//     path.join(__dirname, "files", "newReply.txt"), (err) => {
//         if (err) throw err;
//         console.log('Rename complete');
//     });
//   })
// });





process.on('uncaughtException', err => {
    console.error(`There was an unncaught error : ${err}`);
})

