import React, { useContext, useState } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Message } from "../../UI/Message";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router";
import { customerLogin } from "../../Helper/Auth";

export const CustomerLogin = () => {
  const { setUser, setIsAuthenticated, isAuthenticated } = useContext(
    AuthContext,
  );

  const history = useHistory();
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Please enter your email"),
      password: Yup.string().required("Dont skip password"),
    });
  };

  const onSubmit = (values) => {
    customerLogin(values).then((data) => {
      if (data.err) {
        setError(data.err);
        setSuccess(false);
        return;
      } else {
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("customer", JSON.stringify(data.user));
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

  const formContents = () => {
    return <div
      style={{ height: "80vh" }}
      className="d-flex align-items-center"
    >
      <Container component="main" maxWidth="xs">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 text-center">
              Welcome back, <br /> Please Login.
            </h2>
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
                  Log me in!
                </Button>
              </Grid>

              <Grid item xs={12}>
                {formik.errors.name && formik.touched.name
                  ? (
                    <Message message={formik.errors.name} severity="error" />
                  )
                  : null}

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
    </div>;
  };
  return (
    <>
      {formContents()}
      {error ? (<Message message={error} severity="error" />) : null}
      {isAuthenticated ? (history.push("/")) : null}
    </>
  );
};
