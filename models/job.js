var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    job_title: String,
    job_description: String,
    job_contact: String,
    req_skills: [String],
    date_posted: Date,
    full_time: Boolean,
    url: String,
    internship: Boolean,
    pay_rate: String,
    company_id: mongoose.Schema.Types.ObjectId
});

var Job = mongoose.model('Job', jobSchema);
module.exports = Job;
