var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var volunteerSchema = new Schema({
    organization: String,
    role: String,
    cause: String,
    description: String,
    how_long: String,
    profile_id: {type: mongoose.Schema.Types.ObjectId, ref:'profile'}
});

var Volunteer = mongoose.model('Volunteer', volunteerSchema);
module.exports = Volunteer;
