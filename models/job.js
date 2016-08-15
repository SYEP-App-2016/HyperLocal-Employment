var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var jobSchema = new Schema({
    jb_position: {required: true, type: String},
    jb_desc:  String,
    jb_desc_teaser: String,
    jb_contact: String,
    req_skills: [String],
    date_posted: String,
    deadline: Date,
    jb_type: String, //Full-time, part-time or internship
    pay_rt: Number,
    sal: String,
    url: String,
    catergory: {required: true, type: String},
    applicants: [mongoose.Schema.Types.ObjectId],
    logo: String,
    company: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    view_count: {type: Number, default: 0}
});


var Job = mongoose.model('Job', jobSchema);

module.exports = Job;
