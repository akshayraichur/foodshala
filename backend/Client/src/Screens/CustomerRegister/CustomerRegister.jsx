import React, { useState } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Message } from "../../UI/Message";
import { customerSignup } from "../../Helper/Auth";
import { useHistory } from "react-router";

export const CustomerRegister = () => {
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isVeg, setIsVeg] = useState(false);
  const history = useHistory();
  const validationSchema = () => {
    return Yup.object({
      name: Yup.string()
        .min(3, "You cant have a name with only 2 chars")
        .trim()
        .required("Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Please enter your email"),
      password: Yup.string().required("Dont skip password"),
    });
  };

  const onSubmit = (values) => {
    const val = { ...values, isVeg };
    customerSignup(val).then((data) => {
      if (data.err) {
        setSuccess(false);
        setError(data.err);
      } else {
        history.push("/customer/login");
      }
    }).catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleRadioButton = (e) => {
    setIsVeg(e.target.value);
  };

  const formContents = () => {
    return <div
      style={{ height: "80vh" }}
      className="d-flex align-items-center"
    >
      <Container component="main" maxWidth="xs">
        <Grid container>
          <Grid item xs={12}>
            <h2 className="h2 text-center">
              Welcome <br /> Good to see you here! <br />
            </h2>
            <h4 className="h4 pb-4 text-center">
              Please register with your details. <br />
            </h4>
          </Grid>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  required
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </Grid>

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
                <label htmlFor="isVeg">
                  Please select the below option if you prefer Veg
                  <input
                    type="radio"
                    name="isVeg"
                    value="true"
                    onChange={handleRadioButton}
                  />
                </label>
                Please select the below option if you prefer NonVeg
                <input
                  type="radio"
                  name="isVeg"
                  value="false"
                  onChange={handleRadioButton}
                />
              </Grid>

              <Grid item xs={12} className="d-flex justify-content-center">
                <Button variant="contained" color="primary" type="submit">
                  Sign up!
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
    </>
  );
};
