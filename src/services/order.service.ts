import { Orders } from "../models/orders.model";

export const createOrderService = async (orderData: any) => {
  try {
    const order = new Orders(orderData);
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Error placing order: " + error);
  }
};

export const getOrderService = async (orderId: string) => {
  try {
    return await Orders.findById(orderId).populate("items.productId");
  } catch (error) {
    throw new Error("Error fetching order: " + error);
  }
};

export const updateOrderService = async (orderId: string, status: string) => {
  try {
    return await Orders.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
  } catch (error) {
    throw new Error("Error updating order: " + error);
  }
};

export const cancelOrderService = async (orderId: string) => {
  try {
    return await Orders.findByIdAndDelete(orderId);
  } catch (error) {
    throw new Error("Error cancelling order: " + error);
  }
};

export const getAllOrdersService = async () => {
  try {
    return await Orders.find().populate("items.productId");
  } catch (error) {
    throw new Error("Error fetching orders: " + error);
  }
};
