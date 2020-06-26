import React, { useContext } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { addItem } from "../../Helper/Restaurant";
import { AuthContext } from "../../Context/AuthContext";
import { useHistory } from "react-router";
import { Message } from "../../UI/Message";

export const AddItems = () => {
  const { access_token, user } = useContext(AuthContext);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isVeg, setIsVeg] = useState();
  const history = useHistory();

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string().required("Dont skip item name"),
      price: Yup.number().required("Price is required"),
      description: Yup.string().required("Description is needed"),
    });
  };

  const handleRadioButton = (e) => {
    setIsVeg(e.target.value);
  };

  const onSubmit = (values) => {
    const { id } = user;
    const val = { ...values, isVeg };
    addItem(id, val, access_token).then((data) => {
      if (data.err) {
        setError(data.err);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError(null);
        history.push(`/`);
      }
    }).catch((err) => console.log(err));
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const formContents = () => {
    return <div>
      <Container component="main" maxWidth="sm">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 my-5 pt-5 text-center">
              Add your menu items here
            </h2>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              {formik.errors.name && formik.touched.name
                ? (
                  <Message message={formik.errors.name} severity="error" />
                )
                : null}

              {formik.errors.price && formik.touched.price
                ? (
                  <Message message={formik.errors.price} severity="error" />
                )
                : null}

              {formik.errors.description && formik.touched.description
                ? (
                  <Message
                    message={formik.errors.description}
                    severity="error"
                  />
                )
                : null}
            </Grid>
            <form onSubmit={formik.handleSubmit}>
              <Grid container item spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    name="name"
                    label="Item Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    multiline
                    rows={5}
                    name="description"
                    label="Item Description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    name="price"
                    label="Item Price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="radio"
                    name="isVeg"
                    value="true"
                    label="Veg"
                    onChange={handleRadioButton}
                  />
                  Veg <br />
                  <input
                    type="radio"
                    name="isVeg"
                    value="false"
                    label="NonVeg"
                    onChange={handleRadioButton}
                  /> NonVeg
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Add Item
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>;
  };
  return (
    <>
      {formContents()}
      {error ? (<Message severity="error" message={error} />) : null}
    </>
  );
};
