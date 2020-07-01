import React from "react";
import { Container, Grid } from "@material-ui/core";
import { Card } from "../../UI/Card";
import { useState } from "react";
import { useEffect } from "react";
import { getAllRestaurants } from "../../Helper/Restaurant";

export const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllRestaurants().then((data) => {
      setRestaurants(data.data.restaurants);
      setIsLoading(false);
    }).catch((err) => console.log(err));
  }, []);

  const renderContent = () => {
    return restaurants.map((re, index) => {
      return <Grid item xs={12} md={4} key={re._id}>
        <Card
          name={re.restaurantName}
          email={re.email}
          link={re._id}
          description={re.description}
        />
      </Grid>;
    });
  };

  const unLoadedScreen = () => {
    return (
      <>
        <Grid container item xs={12} md={12}>
          <Grid item xs={12}>
            <div className="d-flex justify-content-center">
              <h3 className="h3">Fetching data from server, hang in there!</h3>
            </div>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <div>
      {/* TODO: List all the restaurants first with card (maybe) and then when they clisk on that restaurant then you display all the menu items */}
      <Container component="main" maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <h2 className="h2 text-center mt-5 pt-5">Restaurants Availiable</h2>
          </Grid>
          {isLoading ? unLoadedScreen() : renderContent()}
        </Grid>
      </Container>
    </div>
  );
};
