var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var experienceSchema = new Schema({
    jb_position: String,
    jb_description: String,
    company_name: String,
    start_date: Date,
    end_date: Date,
    profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'profile'}
});

var Experience = mongoose.model('Experience', experienceSchema);
module.exports = Experience;
