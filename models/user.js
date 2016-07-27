var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    f_name: String,
    m_init: String,
    l_name: String,
    created_at: Date,
    updated_at: Date,
    acc_id: {type: mongoose.Schema.Types.ObjectId, ref: 'account'}
})

userSchema.pre('save', function(next){
    var currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at)
    {
        this.created_at = currentDate;
    }
    next();
})

module.exports = mongoose.model('User', userSchema);
