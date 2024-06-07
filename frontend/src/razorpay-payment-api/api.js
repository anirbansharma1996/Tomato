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
          window.location.href = `https://tomato-gray-five.vercel.app`;
        })
        .catch(() => {
          window.location.href = `https://tomato-gray-five.vercel.app`;
        });
    },
    prefill: {
      name: "Tomato. | IN",
      email: "support@complain.com",
      contact: "1800 123 888"
    },
    theme: {
      color: "#FF4C24"
    }
  };

  const razor = new window.Razorpay(options);
  return razor.open();
};
