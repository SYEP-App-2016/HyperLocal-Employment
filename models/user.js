var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    moment = require('moment');

var userSchema = new Schema({
    first: String,
    m_init: String,
    last: String,
    obj: String,
    cell: String,
    home: String,
    email: String,
    skills: [String],
    job_interests: [String],
    created_at: Date,
    updated_at: Date,
    acc_id: {type: mongoose.Schema.Types.ObjectId, ref: 'account'}
});

userSchema.pre('save', function(next){
    var currentDate = moment();

    this.updated_at = currentDate;

    if(!this.created_at)
    {
        this.created_at = currentDate;
    }
    next();
})

module.exports = mongoose.model('User', userSchema);
