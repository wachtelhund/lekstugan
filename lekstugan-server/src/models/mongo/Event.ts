import mongoose from 'mongoose';
import {IEventData} from '../types/IEventData';

const schema = new mongoose.Schema<IEventData>(
    {
      description: {
        type: String,
        required: true,
        maxlength: 500,
      },
      title: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
        unique: true,
      },
      image: {
        type: String,
      },
      link: {
        type: String,
      },
    },
    {
      timestamps: true,
      /**
     * Performs a transformation of the resulting
     * object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which
     * has been converted.
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

schema.pre('save', async function() {
  /* eslint-disable no-invalid-this */
  this.id = this._id.toHexString();
});

const Event = mongoose.model<IEventData>('Event', schema);

export default Event;
