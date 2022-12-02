const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const router = require('./routes');
const { connectDB } = require('./config/mongoConnection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

connectDB().then(() => {
    app.listen(port, (err) => {
        if(!err) {
            console.log('connect to port', port);
        }
    });
})
.catch((err) => {
    console.log(err);
});

