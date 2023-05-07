"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        maxlength: 100,
    },
    association: {
        type: String,
        required: true,
    },
    pending: {
        type: Boolean,
        required: true,
    },
}, {
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
});
schema.pre('save', async function () {
    /* eslint-disable no-invalid-this */
    this.id = this._id.toHexString();
});
const booking = mongoose_1.default.model('Booking', schema);
exports.default = booking;
//# sourceMappingURL=Booking.js.map