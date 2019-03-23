const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


function hashPassword(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      next(err);
    }
    this.password = hash;
    next();
  });
  return 1;
}
UserSchema.pre('save', hashPassword);

function checkPassword(passwordToCheck) {
  return bcrypt.compareSync(passwordToCheck, this.password);
}

UserSchema.methods.checkPassword = checkPassword;

const User = mongoose.model('User', UserSchema);
module.exports = User;
