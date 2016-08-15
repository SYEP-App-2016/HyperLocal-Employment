var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    // REVIEW WHY I HACE THIS HERE??
    ObjectId = mongoose.Types.ObjectId;

var companySchema = new Schema({
    acc_id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    address_2: String,
    city: String,
    state: String,
    zip: String,
    logo: String,
    history: String,
    url: String
});


var Company = mongoose.model('Company', companySchema);

module.exports = Company;
