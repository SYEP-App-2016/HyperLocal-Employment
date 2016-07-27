var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var jobSchema = new Schema({
    jb_position: {required: true, type: String},
    jb_desc:  String,
    jb_desc_teaser: String,
    jb_contact: String,
    req_skills: [String],
    date_posted: Date,
    deadline: Date,
    full_time: Boolean,
    sal: Number, //If full time display salary ex. $36,000/yr
    intern: Boolean,
    pay_rt: Number, //If internship, display pay rate ex. $9/hr
    url: String,
    company_id: mongoose.Schema.Types.ObjectId,
    view_count: {type: Number, default: 0}
});

var Job = mongoose.model('Job', jobSchema);
module.exports = Job;
