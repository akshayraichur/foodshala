import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

export const Login = () => {
  return (
    <div>
      <div style={{ height: "80vh" }} className="d-flex align-items-center">
        <Container component="main" maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <h2 className="text-center h2">
                Heya! Welcome back, Please tell us who you are..
              </h2>
            </Grid>
            <Grid item xs={6}>
              <Link to="/restaurant/login">
                <div
                  className="jumbotron blue-grey darken-1 text-white text-center"
                  style={{ borderRadius: "20px" }}
                >
                  <h3>
                    <StorefrontIcon className="my-3" />
                    Login for Restaurant!{" "}
                  </h3>
                </div>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link to="/customer/login">
                <div
                  className="jumbotron deep-purple lighten-1 text-white text-center"
                  style={{ borderRadius: "20px" }}
                >
                  <h3>
                    <EmojiPeopleIcon className="my-3" />
                    Login for Customer!{" "}
                  </h3>
                </div>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
