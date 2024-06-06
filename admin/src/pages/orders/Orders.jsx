import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Orders.css";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("An error occurred while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (res.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="order add">
      <div className="order-top-section">
        <h3>Order Page</h3>
        <button onClick={()=>window.location.reload()}>Refresh</button>
      </div>
      <div className="order-list">
        {orders?.reverse().map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {order?.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.name} x {item.quantity}&nbsp;
                    {itemIndex < item.length - 1 && ", "}
                  </span>
                ))}
              </p>
              <p className="order-item-name">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address?.street}</p>
                <p>
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country}, {order.address?.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address?.phone}</p>
            </div>
            <p>Items: {order.items?.length}</p>
            <p>₹{order.amount}</p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
