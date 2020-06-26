import React, { useState } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Message } from "../../UI/Message";
import classes from "./Restaurant.module.css";
import { restaurantLogin } from "../../Helper/Auth";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router";

export const RestaurantLogin = () => {
  // eslint-disable-next-line
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const { isAuthenticated, setUser, setIsAuthenticated } = useContext(
    AuthContext,
  );

  const history = useHistory();

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter your email"),
      password: Yup.string().required("Dont skip password"),
    });
  };

  const onSubmit = (values) => {
    restaurantLogin(values).then((data) => {
      if (data.err) {
        setError(data.err);
        setSuccess(false);
      } else {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("restaurant", JSON.stringify(data.user));
        setSuccess(true);
        history.push("/");
      }
    }).catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
  return (
    <div
      // style={{ height: "80vh" }}
      className={` ${classes.main} d-flex align-items-center`}
    >
      <Container component="main" maxWidth="xs">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 text-center">
              Welcome back, <br />
            </h2>
            <h4
              className="h4 text-center pb-1"
            >
              Please Login with your Restaurant Account
            </h4>
          </Grid>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  required
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="Password"
                  required
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Grid>

              <Grid item xs={12}>
                <div>{formik.errors.name}</div>
              </Grid>

              <Grid item xs={12} className="d-flex justify-content-center">
                <Button variant="contained" color="primary" type="submit">
                  login!
                </Button>
              </Grid>

              <Grid item xs={12}>
                {formik.errors.email && formik.touched.email
                  ? (
                    <Message message={formik.errors.email} severity="error" />
                  )
                  : null}

                {formik.errors.password && formik.touched.password
                  ? (
                    <Message
                      message={formik.errors.password}
                      severity="error"
                    />
                  )
                  : null}
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </div>
  );
};
