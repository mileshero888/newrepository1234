// refs
const mongoose = require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    id: String
});

userSchema.plugin(plm);
userSchema.plugin(findOrCreate);

//Export User Modal Schema
module.exports = mongoose.model('User', userSchema);