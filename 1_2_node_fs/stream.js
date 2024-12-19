const { createReadStream, createWriteStream } = require('fs');

const rs = createReadStream('./files/lorem.txt', {encoding: 'utf8'});

const ws = createWriteStream('./files/new-lorem');

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws);

