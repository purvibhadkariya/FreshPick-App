import { Document, Schema, model, Model } from "mongoose";

export interface IOrders extends Document {
  productId: String;
  quantity: Number;
  address: String;
  userId: String;
  date: Date;
}

const OrdersSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required:true, index: true },
    quantity: { type: Number, required: true },
    adress: { type: Schema.Types.ObjectId, ref: "Address", index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Orders: Model<IOrders> = model<IOrders>("Orders", OrdersSchema);
