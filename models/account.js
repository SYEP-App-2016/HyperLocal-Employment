var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var accountSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    roleID: {type: Number, default: 0, required: true}
    //0-Public 1-Companies 2-Admin
});

accountSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

accountSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Account', accountSchema);;
