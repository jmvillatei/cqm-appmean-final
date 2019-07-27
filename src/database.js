const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://jmvillatei:1234@crud-mongo-v77na.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(function (db) { // <- db as first argument
        console.log('Base conectada')
    })
    .catch(function (err) {
        console.log('Error, BD no conectada')
    });