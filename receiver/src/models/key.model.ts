import mongoose from 'mongoose';

const keySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      // please note I prefer aggregation over mongoose '.populate' method so this is here purely to provide additional meaning
      ref: 'users',
      required: [true, 'Please specify a user ID'],
    },
    key: {
      type: String,
      required: [true, "Please specify the key's value"],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'revoked'],
        message: "'{VALUE}' is not a valid value for this field",
      },
      default: 'active',
    },
    noOfUse: {
      type: Number,
      default: 0,
      min: [0, 'Number of use can not be negative'],
    },
  },
  {timestamps: true}
);

const KEYMODEL = mongoose.model('key', keySchema);

export default KEYMODEL;
