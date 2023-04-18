import mongoose from 'mongoose';
import { IBase64Image } from '../interfaces/IBase64Image';

const schema = new mongoose.Schema<IBase64Image>(
  {
    base64: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    pending: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

schema.pre('save', async function () {
  /* eslint-disable no-invalid-this */
  this.id = this._id.toHexString();
});

const Base64Image = mongoose.model<IBase64Image>('Image', schema);

export default Base64Image;
