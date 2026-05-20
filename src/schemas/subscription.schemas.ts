import { Schema, model, Types } from 'mongoose';

export interface ISubscription {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  startDate: Date;
  expiryDate: Date;
  status: 'active' | 'expired' | 'cancelled';
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },

    startDate: {
      type: Date,
      default: Date.now
    },

    expiryDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ['active', 'expired', 'cancelled'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

subscriptionSchema.index({ userId: 1 });
subscriptionSchema.index({ productId: 1 });

export const Subscription = model<ISubscription>(
  'Subscription',
  subscriptionSchema
);