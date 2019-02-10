let mongoose = require('mongoose');

//create a model class
let contactSchema = mongoose.Schema({
    name: String,
    desc: String
},{
     collection: "favourite"
});


module.exports = mongoose.model('abirami', contactSchema);