var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var educationSchema = new Schema({
    name_of_institution: String,
    degree: String,
    year_graduated: Number,
    field_of_study: String,
    type_of_institution: String,
    profile_id: {type: mongoose.Schema.Types.ObjectId, ref: 'profile'}
});

var Education = mongoose.model('Education', educationSchema);
module.exports = Education;
