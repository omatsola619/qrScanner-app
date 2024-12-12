const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  avatar: {type: String, required: false},
})

module.exports = mongoose.model('User', UserSchema);
