import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Card } from "../../UI/Card";
import { useState } from "react";
import { useEffect } from "react";
import { getAllRestaurants } from "../../Helper/Restaurant";

export const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      setRestaurants(data.data.restaurants);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* TODO: List all the restaurants first with card (maybe) and then when they clisk on that restaurant then you display all the menu items */}
      <Container component="main" maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 text-center mt-5 pt-5">Restaurants Availiable</h2>
          </Grid>
          {restaurants.map((re, index) => {
            return <Grid item xs={4} key={re._id}>
              <Card name={re.restaurantName} email={re.email} link={re._id} />
            </Grid>;
          })}
        </Grid>
      </Container>
    </div>
  );
};
