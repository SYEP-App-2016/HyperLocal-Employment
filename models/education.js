var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var educationSchema = new Schema({
    instit_name: String,
    deg: String,
    yr_grad: Number,
    f_study: String,
    instit_type: String,
    prof_id: {type: mongoose.Schema.Types.ObjectId, ref: 'profile'}
});

var Education = mongoose.model('Education', educationSchema);
module.exports = Education;
