// TO Do workshop
//load libs
const express = require('express');
const path = require('path');

const resources = ['images', 'public'];

const images = [
    "celery.png", "chili_pepper.png", "corn.png",
    "lettuce.png", "mushroom.png", "onion.png",
    "radish.png"
];

const randImage = (array) => {
    const rand = Math.random();
    const index = Math.floor(rand * array.length)
    return (array[index]);
}
//create an instance of Express
const app = express();


//define routes
//refactor
app.get('/image', (req, resp) => {
    resp.status(200);
    resp.format({
        'text/html': () => {
            resp.send(`<img src="${randImage(images)}">`);
        },
        'images/png': () => {
            resp.sendfile(path.join(__dirname, 'images', imageFile));
        },
        'application/json': () => {
            resp.send({})
        },
        'default': () => {
            resp.status(406);
            resp.send('Not Acceptable');
        }
    });
})
// //GET /image -->text/html
// app.get('/image',
//     (req, resp) => {
//         const image = randImage(images)
//         resp.status(200);
//         resp.type('text/html');
//         resp.send(`<img src="${randImage(images)}">` + "this is GET /image");
//     }
// );

// //GEt /random-image -->image/png
// app.get('/random-image', (req, resp) =>{
//     const imageFile = randImage(images);
//     resp.status(200);
//     resp.type('image/png');
//     resp.sendfile(path.join(__dirname, 'images', imageFile))
// });

for (let res of resources) {
    console.log(`adding ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}


//start the Express App
const PORT = parseInt(process.argv[2]) ||
    parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, () => {
    console.info(`app started on port ${PORT} at ${new Date()}`);
});
