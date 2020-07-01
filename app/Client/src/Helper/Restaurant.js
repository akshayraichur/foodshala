import axios from "axios";

export const getAllRestaurants = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/restaurant/get-all`)
    .then(
      (result) => result,
    ).catch((err) => err);
};

export const getARestaurant = (resid) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/restaurant/get/${resid}`,
  ).then(
    (result) => result,
  ).catch((err) => err);
};

export const findItemsFromARestaurant = (resid) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/restaurant/get-menu/${resid}`,
  )
    .then(
      (data) => data,
    ).catch((err) => err);
};

export const addItem = (resid, values, access_token) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/restaurant/add-item/${resid}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  ).then((data) => data.data).catch((err) => err);
};

export const getOrders = (access_token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/restaurant/view-orders`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  ).then((data) => data.data).catch((err) => err);
};
