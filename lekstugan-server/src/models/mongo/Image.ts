import mongoose from 'mongoose';
interface IBase64Image {
  base64: string;
  width: number;
  height: number;
  id?: string;
}

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
  // eslint-disable-next-line no-invalid-this
  this.id = this._id.toHexString();
});

const Base64Image = mongoose.model<IBase64Image>('Image', schema);

export default Base64Image;
