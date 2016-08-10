// IN DEV
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var profileSchema = new Schema({
    acc_id: {type: mongoose.Schema.Types.ObjectId, ref: 'account'},
    created_at: Date,
    updated_at: Date,
    f_name: String,
    m_init: String,
    l_name: String,
    contact: {
        type: String,
        content: String
    },
    obj: String,
    job_interests: [String],
    education: [],
    experience: [],
    skills: [],
    volunteer: []
});

var Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;