import axios from 'axios';

export const initializeRazorpay = (order, url) => {
  const options = {
    key: "rzp_test_1iWY82wcU8tca7",
    amount: order.amount,
    currency: order.currency,
    name: "Your Company Name",
    description: "Test Transaction",
    order_id: order.id,
    handler: function (response) {
      axios.post(`${url}/api/payment/verify`, response)
        .then(() => {
          window.location.href = `https://tomato-gray-five.vercel.app/myorders`;
        })
        .catch(() => {
          window.location.href = `https://tomato-gray-five.vercel.app`;
        });
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9999999999"
    },
    theme: {
      color: "#3399cc"
    }
  };

  const razor = new window.Razorpay(options);
  return razor.open();
};
