const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // library (songs listened , will store urls):
  // search history :
  // favorite songs: 
});

module.exports = mongoose.model('User', userSchema);