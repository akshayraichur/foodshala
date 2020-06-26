import Axios from "axios";

export const restaurantSignup = (values) => {
  return Axios.post(
    `http://localhost:4000/api/restaurant/auth/register`,
    values,
  ).then(
    (data) => data,
  ).catch((err) => err);
};

export const customerSignup = (values) => {
  return Axios.post(
    `http://localhost:4000/api/customer/auth/register`,
    values,
  )
    .then((data) => data.data).catch((err) => err);
};

export const customerLogin = (values) => {
  return Axios.post(
    `http://localhost:4000/api/customer/auth/login`,
    values,
  )
    .then((data) => data.data).catch((err) => err);
};

export const restaurantLogin = (values) => {
  return Axios.post(
    `http://localhost:4000/api/restaurant/auth/login`,
    values,
  )
    .then((data) => data.data).catch((err) => err);
};
