import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { jwtDecode } from "jwt-decode";
import gif from "../../assets/giphy.gif"

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(StoreContext);

  const decode = token ? jwtDecode(token) : null;


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      {loading ? <h2>Orders</h2> : <h2>{decode?.username}'s Orders</h2>}
      {loading && (
       <div className="gif-bike-parent">
       <img className="gif-bike" src={gif} alt={'loading...'} />
       <h4>Loading...</h4>
     </div>
      )}
      {!loading && (
        <div className="container">
          {data?.length < 1 ? (
            <p>No Orders Placed Yet !!</p>
          ) : (
            data?.reverse().map((order, index) => {
              return (
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>₹{order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span
                      style={{
                        fontSize: "19px",
                        color:
                          order.status === "Delivered"
                            ? "green"
                            : order.status === "Out For Delivery"
                            ? "orange"
                            : "red",
                      }}
                    >
                      &#x25cf;
                    </span>{" "}
                    <b>{order.status}</b>
                  </p>
                  <button onClick={() => fetchOrders()}>Track Order</button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
