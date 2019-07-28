const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    pwd: {type: String, required: true},
    date: {type: Date, default: Date.now}
})

UserSchema.methods.encryptPwd = async function(pwd){
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(pwd, salt);
    return hash;
}

UserSchema.methods.matchPwd = function(pwd){
    return bcrypt.compare(pwd, this.pwd); 
}

module.exports = mongoose.model('User', UserSchema)