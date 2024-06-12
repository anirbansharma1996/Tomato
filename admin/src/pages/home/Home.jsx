import React from "react";
import "./Home.css";
import useFetch from "../../custom/useFetch";

export default function Home({ url }) {
  const orderData = useFetch(`${url}/api/order/list`);
  const foodData = useFetch(`${url}/api/food/list`);
  const userData = useFetch(`${url}/api/user/users`);
  // functions
  const totalItems = foodData?.data.data;
  const totalOrders = orderData?.data.data;
  const totalPayments =
    orderData.data?.data?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const profit = totalPayments - (totalPayments * 75) / 100;
  const allUsers = userData?.data.data;

  return (
    <>
      {orderData.loading && foodData.loading && (
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "grey",
          }}
        >
          Loading...
        </h1>
      )}
      {!orderData.loading && !foodData.loading && (
        <div className="admin-home">
          <div className="admin-home-top">
            <div className="admin-home-fooditem">
              <h3>Total Food items</h3>
              <p>{totalItems?.length}</p>
            </div>
            <div className="admin-home-totalorders">
              <h3>Total Orders</h3>
              <p>{totalOrders?.length}</p>
            </div>
            <div className="admin-home-totalbill">
              <h3>Total Payments</h3>
              <p>₹ {totalPayments}</p>
            </div>
          </div>
          <div className="admin-home-totalbill-profit">
            <p>
              <b>FINAL PROFIT</b> : ₹ {profit}
            </p>
          </div>
          <div className="admin-home-allusers">
            <h3>Total Registered Users</h3>
            {allUsers?.map((el, i) => (
              <div>
                <p>
                  {" "}
                  [ {i + 1} ] <b> user name</b> : {el.name}
                </p>
                <p>
                  {" "}
                  <b>user email</b> : {el.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
