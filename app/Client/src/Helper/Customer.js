import Axios from "axios";

export const orderFood = (access_token, resid, id, itemId) => {
  const values = { restaurant: resid, customer: id, itemId };
  return Axios.post(
    `${process.env.REACT_APP_API_URL}/customer/order`,
    values,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((data) => data).catch((err) => err);
};

export const findCustomer = (access_token, id) => {
  return Axios.get(
    `${process.env.REACT_APP_API_URL}/customer/find/${id}`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  ).then((data) => data.data).catch((err) => err);
};
