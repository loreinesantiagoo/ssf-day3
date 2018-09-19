// TO Do workshop
//load libs
const express = require('express');
const path = require('path');

const asciify = require('asciify-image');


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
    const imageFile = randImage(images)
    resp.status(200);
    resp.format({
        'text/html': () => {
            resp.send(`<img src="${imageFile}">`);
        },
        'images/png': () => {
            resp.sendfile(path.join(__dirname, 'images', imageFile));
        },
        'application/json': () => {
            resp.send({ imageFile });
        },
        'text/html': () => {
            const options = {
                color: true,
                fit: 'box',
                width: 20,
                height: 20,
                color: true
            }
            asciify(path.join(__dirname, 'images', imageFile), options,
                (err, asciified) => {
                    if (err) {
                        resp.status(404).send(JSON.stringify(err));
                        return;
                    };
                    resp.send(asciified);
                    console.log(asciified);
                })
        },
        'default': () => {
            resp.status(406).send('Not Acceptable');
        }
    });
})


for (let res of resources) {
    console.log(`adding ${res} to static`)
    app.use(express.static(path.join(__dirname, res)));
}
//catch all 
app.use((req, resp) => {
    resp.status(404);
    resp.send(path.join(__dirname, 'images', '404.gif'));
})


//start the Express App
const PORT = parseInt(process.argv[2]) ||
    parseInt(process.env.APP_PORT) || 3000

app.listen(PORT, () => {
    console.info(`app started on port ${PORT} at ${new Date()}`);
});
