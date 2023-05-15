import mongoose from 'mongoose';
import {IAssociation} from '../types/IAssociation';
import bcrypt from 'bcrypt';
import validator from 'validator';
import {RequestError} from '../errors/RequestError';

const schema = new mongoose.Schema<IAssociation>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      /**
     * Performs a transformation of the
     * resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object
     * representation which has been converted.
     */
      toJSON: {
        transform: (_doc, ret) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        },
      },
    }
);

/**
 * Checks user password against database.
 *
 * @param {string} name - Association id to check against database.
 * @param {string} key - Plaintext key to check against database.
 * @return {boolean} True if user exists, false if not.
 */
export async function isCorrectPassword(name: string, key: string) {
  const association = await Association.findOne({name});
  if (!association) {
    throw new Error('Association not found.');
  }
  const match = await bcrypt.compare(key, association.key);
  if (!association || !match) {
    throw new Error('Invalid key.');
  }
  return association;
}

/**
 * Generates a random key.
 *
 * @return {string} A random key
 */
export function getRandomKey() {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}


schema.pre('save', async function() {
  /* eslint-disable no-invalid-this */
  this.id = this._id.toHexString();
  if (!validator.isEmail(this.email)) {
    const error = new Error('Invalid email.');
    const err = new RequestError(error.message, 400);
    throw err;
  }
  this.key = await bcrypt.hash(this.key, 10);
});

export const Association = mongoose.model<IAssociation>('Association', schema);

