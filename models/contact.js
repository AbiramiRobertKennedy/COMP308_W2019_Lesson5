let mongoose = require('mongoose');

//create a model class
let contactSchema = mongoose.Schema({
    name: String,
    desc: String
},{
     collection: "favouritethings"
});


module.exports = mongoose.model('abi', contactSchema);