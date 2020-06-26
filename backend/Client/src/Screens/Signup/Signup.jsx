import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

export const Signup = () => {
  return (
    <div style={{ height: "80vh" }} className="d-flex align-items-center">
      <Container component="main" maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 text-center">Who are you?</h2>
          </Grid>
          <Grid item xs={6}>
            <Link to="/restaurant/signup">
              <div
                className="jumbotron pink darken-1 text-white text-center"
                style={{ borderRadius: "20px" }}
              >
                <h3>
                  <StorefrontIcon className="my-3" />
                  Signup for Restaurant!{" "}
                </h3>
              </div>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <Link to="/customer/signup">
              <div
                className="jumbotron default-color-dark text-white text-center"
                style={{ borderRadius: "20px" }}
              >
                <h3>
                  <EmojiPeopleIcon className="my-3" /> Signup for Customer!{" "}
                </h3>
              </div>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
