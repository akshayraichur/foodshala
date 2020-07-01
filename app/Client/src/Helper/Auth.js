import Axios from "axios";

export const restaurantSignup = (values) => {
  return Axios.post(
    `${process.env.REACT_APP_API_URL}/restaurant/auth/register`,
    values,
  ).then(
    (data) => data,
  ).catch((err) => err);
};

export const customerSignup = (values) => {
  return Axios.post(
    `${process.env.REACT_APP_API_URL}/customer/auth/register`,
    values,
  )
    .then((data) => data.data).catch((err) => err);
};

export const customerLogin = (values) => {
  return Axios.post(
    `${process.env.REACT_APP_API_URL}/customer/auth/login`,
    values,
  )
    .then((data) => data.data).catch((err) => err);
};

export const restaurantLogin = (values) => {
  return Axios.post(
    `${process.env.REACT_APP_API_URL}/restaurant/auth/login`,
    values,
  )
    .then((data) => data.data).catch((err) => err);
};
