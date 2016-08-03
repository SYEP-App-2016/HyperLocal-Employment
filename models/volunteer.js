var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var volunteerSchema = new Schema({
    org: String,
    role: String,
    cause: String,
    desc: String,
    how_long: String,
    prof_id: {type: mongoose.Schema.Types.ObjectId, ref:'profile'}
});

var Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;
