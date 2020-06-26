import axios from "axios";

export const getAllRestaurants = () => {
  return axios.get(`http://localhost:4000/api/restaurant/get-all`)
    .then(
      (result) => result,
    ).catch((err) => err);
};

export const getARestaurant = (resid) => {
  return axios.get(
    `http://localhost:4000/api/restaurant/get/${resid}`,
  ).then(
    (result) => result,
  ).catch((err) => err);
};

export const findItemsFromARestaurant = (resid) => {
  return axios.get(
    `http://localhost:4000/api/restaurant/get-menu/${resid}`,
  )
    .then(
      (data) => data,
    ).catch((err) => err);
};

export const addItem = (resid, values, access_token) => {
  return axios.post(
    `http://localhost:4000/api/restaurant/add-item/${resid}`,
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
    `http://localhost:4000/api/restaurant/view-orders`,
    { headers: { Authorization: `Bearer ${access_token}` } },
  ).then((data) => data.data).catch((err) => err);
};
