const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'both'],
    default: 'buyer'
  },
  profileImage: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

// Hash password before saving - using callback style
userSchema.pre('save', function(next) {
  const user = this;

  // Only hash if password is new or modified
  if (!user.isModified('password')) {
    return next();
  }

  // Generate salt and hash password
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);