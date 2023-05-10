import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import validator from 'validator'

/**
 * User model.
 */
const schema = new mongoose.Schema({
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long.'],
    maxlength: [200, 'Password must be at most 200 characters long.'],
    required: true
  },
  email: {
    type: String,
    minlength: [5, 'Email must be at least 5 characters long.'],
    maxlength: [35, 'Email must be at most 35 characters long.'],
    unique: true,
    required: true
  },
  permissionLevel: {
    type: Number,
    enum: [1, 2, 4, 8],
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

/**
 * Checks user password against database.
 *
 * @param {string} email - Username to check against database.
 * @param {string} password - Plaintext password to check against database.
 * @returns {boolean} True if user exists, false if not.
 */
schema.statics.isCorrectPassword = async function (email, password) {
  const user = await User.findOne({ email })
  const match = await bcrypt.compare(password, user.password)
  if (!user || !match) {
    throw new Error('Invalid login.')
  }
  return user
}

schema.pre('save', async function () {
  if (!validator.isEmail(this.email)) {
    const error = new Error('Invalid email.')
    error.status = 400
    throw error
  }
  this.password = await bcrypt.hash(this.password, 10)
})

export const User = mongoose.model('User', schema)
