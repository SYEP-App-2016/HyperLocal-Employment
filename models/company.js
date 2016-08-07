var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    // REVIEW WHY I HACE THIS HERE??
    ObjectId = mongoose.Types.ObjectId;

var companySchema = new Schema({
    acc_id: mongoose.Schema.Types.ObjectId,
    company_name: String,
    company_address: String,
    company_address_2: String,
    company_city: String,
    company_state: String,
    company_zip_code: String,
    logo: String,
    history: String,
    url: String
});


var Company = mongoose.model('Company', companySchema);

module.exports = Company;
