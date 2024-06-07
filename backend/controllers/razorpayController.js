import dotenv from "dotenv";
import Razorpay from "razorpay";
import crypto from "crypto";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import paymentModel from "../models/razorpayModel.js";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY_ID,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const options = {
      amount: newOrder.amount * 100,
      currency: "INR",
      receipt: `${newOrder._id}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({ success: true, orderId: newOrder._id, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const secret_body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(secret_body.toString())
      .digest("hex");

    const isAuth = expected_signature === razorpay_signature;
    if (isAuth) {
      await paymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
    }

    res.redirect(`https://tomato-gray-five.vercel.app`);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Listing Order for Admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// User Orders for Frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export {
  placeOrder,
  paymentVerification,
  listOrders,
  userOrders,
  updateStatus,
};
