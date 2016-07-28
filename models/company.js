var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var companySchema = new Schema({
    company_name: String,
    company_address: String,
    url: String,
    acc_id: mongoose.Schema.Types.ObjectId,
    logo: String,
    history: String
});

var Company = mongoose.model('Company', companySchema);
module.exports = Company;
